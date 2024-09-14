export function BalanceCard({ value }) {
  return (
    <div className="flex justify-center ">
      <div className="mt-10  text-white h-36 shadow-xl rounded flex flex-col justify-center items-center bg-blue-500 w-80 sm:w-4/5 sm:h-16 sm:flex-row hover:bg-blue-700">
        <div className="font-bold text-2xl">Your balance :</div>
        <div className="font-semibold ml-4 text-2xl">Rs.{value}</div>
      </div>
    </div>
  );
}
