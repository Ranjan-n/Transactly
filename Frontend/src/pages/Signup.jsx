import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";

export function Signup() {
  const [showWarning, setShowWarning] = useState(false);
  return (
    <div className="bg-slate-50 h-screen flex justify-center">
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
          ></InputBox>
          <InputBox
            id={"lastname"}
            label={"Last Name"}
            type={"text"}
            placeholder={"Enter Last Name"}
          ></InputBox>
          <InputBox
            id={"email"}
            label={"Email"}
            type={"email"}
            placeholder={"Enter Email Address"}
          ></InputBox>
          <InputBox
            id={"password"}
            label={"Create Password"}
            type={"password"}
            placeholder={"Enter your password"}
          ></InputBox>
          <InputBox
            id={"confirmpassword"}
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Enter password again"}
          ></InputBox>
          {showWarning && (
            <Message
              label={"* Create a strong password with minimum six characters"}
            ></Message>
          )}

          <ButtonComponent label={"SignUp"}></ButtonComponent>

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
