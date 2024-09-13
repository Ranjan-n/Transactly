import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";

export function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMismatchWarning, setShowMismatchWarning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  return (
    <div className="bg-gray-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-96 text-center border border-solid border-blue-300 shadow-xl p-2 h-max px-4">
          <Heading label={"SignUp"}></Heading>
          <SubHeading
            label={"Enter your information to Create Account"}
          ></SubHeading>
          <InputBox
            id={"firstname"}
            label={"First Name"}
            type={"text"}
            placeholder={"Enter First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            id={"lastname"}
            label={"Last Name"}
            type={"text"}
            placeholder={"Enter Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            id={"email"}
            label={"Email"}
            type={"email"}
            placeholder={"Enter Email Address"}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            id={"password"}
            label={"Create Password"}
            type={"password"}
            placeholder={"Enter your password"}
            onChange={(e) => {
              setPassword(e.target.value);
              setShowMismatchWarning(false);
              setShowWarning(false);
            }}
          ></InputBox>
          <InputBox
            id={"confirmpassword"}
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Enter password again"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setShowMismatchWarning(false);
              setShowWarning(false);
            }}
          ></InputBox>
          {showWarning && (
            <Message
              label={"* Create a strong password with minimum six characters"}
            ></Message>
          )}
          {showMismatchWarning && (
            <Message
              label={"* Passwords do not match. Please try again"}
            ></Message>
          )}

          <ButtonComponent
            label={"SignUp"}
            onclick={async () => {
              if (password != confirmPassword) {
                setShowMismatchWarning(true);
              } else if (password.length < 6) {
                setShowWarning(true);
              } else {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    firstname,
                    lastname,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
              }
            }}
          ></ButtonComponent>

          <ButtonWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          ></ButtonWarning>
        </div>
      </div>
    </div>
  );
}
