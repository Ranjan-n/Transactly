import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";

export function Signin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-gray-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-96 text-center border border-solid border-blue-300 shadow-xl p-2 h-max px-4">
          <Heading label={"SignIn"}></Heading>
          <SubHeading
            label={"Enter your credentials to access your account"}
          ></SubHeading>
          <InputBox
            id={"signinEmail"}
            label={"Email"}
            type={"email"}
            placeholder={"Enter your Email"}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            id={"signinPassword"}
            label={"Password"}
            type={"password"}
            placeholder={"Enter your password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
          <ButtonComponent
            label={"SignIn"}
            onclick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
            }}
          ></ButtonComponent>
          <ButtonWarning
            label={"Don't have an account? "}
            buttonText={"Sign Up"}
            to={"/signup"}
          ></ButtonWarning>
        </div>
      </div>
    </div>
  );
}
