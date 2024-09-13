import { useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";

export function Users() {
  const [users, setUsers] = useState([
    {
      firstName: "Yash",
      lastName: "Raj",
      _id: 1,
    },
  ]);

  return (
    <>
      <div className="font-semibold mt-8 ml-5 text-xl">Users</div>
      <div className="my-2 mx-5 w-4/5">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between mx-5 ">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <ButtonComponent label={"Send Money"} />
      </div>
    </div>
  );
}
