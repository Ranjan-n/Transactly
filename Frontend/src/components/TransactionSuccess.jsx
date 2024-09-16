import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function TransactionSuccess() {
  const navigate = useNavigate();

  const onClickHandler = () => navigate("/dashboard");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") {
        onClickHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white w-80 h-96 sm:w-96 sm:h-96 shadow-xl flex flex-col justify-around items-center rounded-lg p-8">
        <div className="flex justify-center items-center mb-4">
          <svg viewBox="0 0 24 24" className="text-green-500 w-16 h-16">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="font-bold">Have a great day!</p>
          <div className="py-8">
            <button
              className="bg-green-500 text-white font-semibold py-2 px-4 border border-transparent rounded hover:bg-green-600"
              onClick={onClickHandler}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
