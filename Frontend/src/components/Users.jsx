import { useEffect, useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-semibold mt-8 ml-5 text-xl">Users</div>
      <div className="my-2 mx-5 w-4/5">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200 focus:border-blue-500 focus:outline-none"
          onChange={(e) => {
            setFilter(e.target.value.toLowerCase());
          }}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={users.indexOf(user)} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mx-5 ">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstname[0].toUpperCase() + user.firstname.substring(1)}{" "}
            {user.lastname[0].toUpperCase() + user.lastname.substring(1)}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <ButtonComponent
          label={"Send Money"}
          onclick={() => {
            navigate("/transaction?id=" + user._id + "&name=" + user.firstname);
          }}
        />
      </div>
    </div>
  );
}
