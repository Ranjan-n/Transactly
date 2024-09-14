import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Transaction() {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

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
            value={amount} // Controlled input
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="w-9/12 mt-6 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          onClick={async () => {
            try {
              const msg = await request(); // Await the async request
              alert(msg); // Corrected spelling
            } catch (error) {
              alert("An error occurred: " + error.message);
            }
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );

  async function request() {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return res.data.message;
    } catch (error) {
      console.error("Error during API request:", error);
      throw error;
    }
  }
}
