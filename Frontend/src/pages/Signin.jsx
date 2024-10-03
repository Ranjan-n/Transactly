import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { SubmitButton } from "../components/SubmitButton";
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
    <div className="h-screen w-screen bg-slate-200">
      <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="flex min-h-auto flex-col justify-center px-6 py-12 rounded-lg bg-slate-50 lg:px-8 shadow-lg ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Heading label={"SignIn"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <InputBox
                id={"signinEmail"}
                label={"Email"}
                type={"email"}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <InputBox
                id={"signinPassword"}
                label={"Password"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {failed && <Message label={error}></Message>}
              <SubmitButton label={"SignIn"} onclick={handleSignin} />
              <ButtonWarning
                label={"Don't have an account? "}
                buttonText={"Sign Up"}
                to={"/signup"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
