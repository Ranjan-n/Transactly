import { Link } from "react-router-dom";
export function ButtonWarning({ label, buttonText, to }) {
  return (
    <div className="pt-6 pb-2 text-sm flex justify-center ">
      <p className="text-blue-800">{label}</p>
      <Link
        className="pointer hover:underline pl-1 cursor-pointer text-blue-800"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
