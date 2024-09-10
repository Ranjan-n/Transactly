import { Link } from "react-router-dom";
export function ButtonWarning({ label, buttonText, to }) {
  return (
    <div>
      <p>{label}</p>
      <Link to={to}>{buttonText}</Link>
    </div>
  );
}
