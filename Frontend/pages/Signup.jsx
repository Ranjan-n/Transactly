import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";

export function Signup() {
  return (
    <div>
      <div>
        <Heading label={"Sign Up"}></Heading>
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
        <Message
          label={"* Create a strong password with minimum six characters"}
        ></Message>
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

        <ButtonComponent label={"SignUp"}></ButtonComponent>

        <ButtonWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        ></ButtonWarning>
      </div>
    </div>
  );
}
