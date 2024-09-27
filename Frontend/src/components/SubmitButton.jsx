export function SubmitButton({ label, onclick }) {
  return (
    <button
      onClick={onclick}
      className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 border text-white shadow-sm hover:bg-transparent hover:text-blue-500 hover:border-blue-500 border-transparent  focus:border-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {label}
    </button>
  );
}
