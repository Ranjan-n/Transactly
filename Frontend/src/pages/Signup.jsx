import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { SubmitButton } from "../components/SubmitButton";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMismatchWarning, setShowMismatchWarning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        setShowMismatchWarning(true);
        return;
      }

      if (password.length < 6) {
        setShowWarning(true);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          firstname,
          lastname,
          password,
        }
      );

      if (response.status !== 201) {
        setFailed(true);
        setError("* " + response.data?.message || "An error occurred");
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setFailed(true);
      setError(
        "* " + error.response?.data?.message ||
          "* An error occurred while signUp"
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="flex min-h-auto flex-col justify-center px-6 py-10 rounded-lg lg:px-8 shadow-lg sm:w-auto ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Heading label={"SignUp"} />
          <SubHeading label={"Enter your information to Create Account"} />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <InputBox
              id={"firstname"}
              label={"First Name"}
              type={"text"}
              placeholder={"Enter First Name"}
              onChange={(e) => {
                setFirstName(e.target.value);
                setShowWarning(false);
              }}
              onKeyDown={handleKeyDown}
            ></InputBox>
            <InputBox
              id={"lastname"}
              label={"Last Name"}
              type={"text"}
              placeholder={"Enter Last Name"}
              onChange={(e) => {
                setLastName(e.target.value);
                setShowWarning(false);
              }}
              onKeyDown={handleKeyDown}
            ></InputBox>
            <InputBox
              id={"email"}
              label={"Email"}
              type={"email"}
              placeholder={"Enter Email Address"}
              onChange={(e) => {
                setUserName(e.target.value);
                setShowWarning(false);
              }}
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
            {failed && <Message label={error}></Message>}

            <SubmitButton label={"SignUp"} onclick={handleSignUp} />
            <ButtonWarning
              label={"Already have an account? "}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
