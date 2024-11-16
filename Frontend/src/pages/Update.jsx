import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";
import { Message } from "../components/Message";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

export function Update() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");
  const [showMismatchWarning, setShowMismatchWarning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const clearWarnings = () => {
    setShowMismatchWarning(false);
    setShowWarning(false);
    setFailed(false);
  };

  const handleUpdate = async () => {
    clearWarnings();

    if (password !== confirmPassword) {
      setShowMismatchWarning(true);
      return;
    }

    const payload = {};
    if (firstname) {
      payload.firstname = firstname.toLowerCase();
    }
    if (lastname) {
      payload.lastname = lastname.toLowerCase();
    }
    if (password) {
      payload.password = password;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/user/update`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setSuccess(true);
      setTimeout(() => {
        if (response.status == 200) {
          navigate("/dashboard");
        }
      }, 2000);
    } catch (error) {
      setFailed(true);
      setError(
        "* " +
          (error.response?.data?.message || "An error occurred while updating")
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white sm:w-96 text-center border border-solid border-blue-300 shadow-xl p-2 sm:h-max px-4">
          <Heading label={"Update"} />
          <SubHeading label={"Enter the information to be updated"} />
          <InputBox
            id={"firstname"}
            label={"First Name"}
            type={"text"}
            placeholder={"Enter new First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearWarnings();
            }}
            onKeyDown={handleKeyDown}
          />
          <InputBox
            id={"lastname"}
            label={"Last Name"}
            type={"text"}
            placeholder={"Enter new Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
              clearWarnings();
            }}
            onKeyDown={handleKeyDown}
          />
          <InputBox
            id={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"Enter new password"}
            onChange={(e) => {
              setPassword(e.target.value);
              clearWarnings();
            }}
            onKeyDown={handleKeyDown}
          />
          <InputBox
            id={"confirmPassword"}
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Enter password again"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearWarnings();
            }}
            onKeyDown={handleKeyDown}
          />
          {showWarning && (
            <Message
              label={
                "* Create a strong password with a minimum of six characters"
              }
            />
          )}
          {showMismatchWarning && (
            <Message label={"* Passwords do not match. Please try again"} />
          )}
          {success && (
            <p className="text-lg text-center text-green-500 font-semibold pt-5 ">
              SuccessFully Updated!!
            </p>
          )}
          {failed && <Message label={error} />}
          <ButtonComponent label={"Update"} onclick={handleUpdate} />
          <ButtonWarning
            label={"Don't you want to Update?"}
            buttonText={"Go back"}
            to={"/dashboard"}
          />
        </div>
      </div>
    </div>
  );
}
