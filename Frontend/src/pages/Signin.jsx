import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";

export function Signin() {
  return (
    <div className="bg-slate-50 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center border border-solid border-blue-300 shadow-xl p-2 h-max px-4">
          <Heading label={"SignIn"}></Heading>
          <SubHeading
            label={"Enter your credentials to access your account"}
          ></SubHeading>
          <InputBox
            id={"signinEmail"}
            label={"Email"}
            type={"email"}
            placeholder={"Enter your Email"}
          ></InputBox>
          <InputBox
            id={"signinPassword"}
            label={"Password"}
            type={"password"}
            placeholder={"Enter your password"}
          ></InputBox>
          <ButtonComponent label={"SignIn"}></ButtonComponent>
          <ButtonWarning
            label={"Don't have an account"}
            buttonText={"Sign Up"}
            to={"/signup"}
          ></ButtonWarning>
        </div>
      </div>
    </div>
  );
}
