export function Transaction() {
  return (
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div className="shadow-lg flex flex-col bg-white h-96 w-80  sm:h-96 sm:w-96 rounded-xl items-center">
        <h2 className="font-extrabold text-2xl sm:text-3xl py-10 text-green-500">
          Send Money
        </h2>

        <div className="flex justify-start items-center font-bold text-xl sm:text-2xl mr-20">
          <div className="bg-green-500 w-12 h-12 flex justify-center items-center text-2xl rounded-full text-white">
            A
          </div>
          <h3 className="pl-3.5">User Name</h3>
        </div>
        <div className="pt-6 w-full flex flex-col items-center">
          <label
            className="text-sm pr-32 sm:pr-44 pt-3 pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="amount"
          >
            Amount (in Rs)
          </label>
          <input
            type="number"
            class="flex h-10 w-9/12 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-green-300 focus:outline-none"
            id="amount"
            placeholder="Enter amount"
          />
        </div>

        <button className="w-9/12 mt-6 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 border-transparent rounded">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
