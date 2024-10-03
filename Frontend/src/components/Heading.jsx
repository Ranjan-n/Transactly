import Logo from "../assets/images/Logo.png";

export function Heading({ label }) {
  return (
    <>
      <h2 className=" text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-blue-700">
        {label}
      </h2>
    </>
  );
}
