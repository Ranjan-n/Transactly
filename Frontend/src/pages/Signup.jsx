import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { ButtonComponent } from "../components/ButtonComponent";
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
    <div className="bg-gray-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white sm:w-96 text-center border border-solid border-blue-300 shadow-xl p-2 sm:h-max px-4">
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
            onKeyDown={handleKeyDown}
          ></InputBox>
          <InputBox
            id={"lastname"}
            label={"Last Name"}
            type={"text"}
            placeholder={"Enter Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
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

          <ButtonComponent
            label={"SignUp"}
            onclick={handleSignUp}
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
