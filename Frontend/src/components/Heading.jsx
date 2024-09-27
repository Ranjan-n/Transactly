import Logo from "../assets/images/Logo.png";

export function Heading({ label }) {
  return (
    <>
      <img className="mx-auto h-9 sm:h-12 w-auto" src={Logo} alt="Transactly" />
      <h2 className="mt-2 sm:mt-6 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-blue-700">
        {label}
      </h2>
    </>
  );
}
