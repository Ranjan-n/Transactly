import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Message } from "../components/Message";
import { Loader } from "../components/Loader";

export function Transaction() {
  const [amount, setAmount] = useState("");
  const [isAuthorized, setAuthorization] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    axios
      .get("http://localhost:3000/api/v1/user/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data.authenticated) {
          setAuthorization(true);
        } else {
          navigate("/signup");
        }
      })
      .catch(() => {
        navigate("/signup");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="shadow-lg flex flex-col bg-white h-96 w-80 sm:h-96 sm:w-96 rounded-xl items-center">
        <h2 className="font-extrabold text-2xl sm:text-3xl py-10 text-green-500">
          Send Money
        </h2>

        <div className="flex justify-start items-center font-bold text-xl sm:text-2xl mr-20">
          <div className="bg-green-500 w-12 h-12 flex justify-center items-center text-2xl rounded-full text-white">
            {name[0].toUpperCase()}
          </div>
          <h3 className="pl-3.5">
            {name[0].toUpperCase() + name.substring(1)}
          </h3>
        </div>

        <div className="pt-6 w-full flex flex-col items-center">
          <label
            className="text-sm pr-32 sm:pr-44 pt-3 pb-2 font-medium leading-none"
            htmlFor="amount"
          >
            Amount (in Rs)
          </label>
          <input
            type="number"
            className="flex h-10 w-9/12 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-green-300 focus:outline-none"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {errorMessage && <Message label={errorMessage} />}

        <button
          className="w-9/12 mt-6 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          onClick={() => {
            try {
              if (isAuthorized) {
                setLoading(true);
                try {
                  axios
                    .post(
                      "http://localhost:3000/api/v1/account/transfer",
                      {
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    )
                    .then((res) => {
                      if (res.status == 200) alert(res.data.message);
                      else setErrorMessage("Failed to initiate transfer.");
                    })
                    .catch((error) => {
                      setErrorMessage("Failed to initiate transfer.");
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                } catch (error) {
                  console.error("Error during API request:", error);
                  throw error;
                }
              }
            } catch (error) {
              setErrorMessage("Failed to initiate transfer.");
            }
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
