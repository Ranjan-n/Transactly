import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";

export function Signin() {
  return (
    <div>
      <div>
        <Heading label={"Sign In"}></Heading>
        <SubHeading
          label={"Enetr your credentials to access your account"}
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
  );
}
