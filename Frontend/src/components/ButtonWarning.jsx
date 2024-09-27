import { Link } from "react-router-dom";
export function ButtonWarning({ label, buttonText, to }) {
  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {label}
      <Link
        className="font-semibold leading-6 text-blue-600 hover:underline"
        to={to}
      >
        {buttonText}
      </Link>
    </p>
  );
}
