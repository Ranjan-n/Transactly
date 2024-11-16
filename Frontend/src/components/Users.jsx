import { useEffect, useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`, {
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
    <div className="flex flex-col sm:flex-row justify-between mx-5 my-8 bg-gray-100 rounded-xl p-2 sm:bg-transparent">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {capitalize(user.firstname)} {capitalize(user.lastname)}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
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

const capitalize = (str) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
};
