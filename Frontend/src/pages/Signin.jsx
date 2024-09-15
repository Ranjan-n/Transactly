import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";
import { Message } from "../components/Message";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setFailed(true);
      setError(
        "* " +
          (error.response?.data?.message ||
            "An error occurred while signing in")
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignin();
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white sm:w-96 text-center border border-solid border-blue-300 shadow-xl p-2 sm:h-max px-4">
          <Heading label={"SignIn"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            id={"signinEmail"}
            label={"Email"}
            type={"email"}
            placeholder={"Enter your Email"}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputBox
            id={"signinPassword"}
            label={"Password"}
            type={"password"}
            placeholder={"Enter your password"}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {failed && <Message label={error}></Message>}
          <ButtonComponent label={"SignIn"} onclick={handleSignin} />
          <ButtonWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
