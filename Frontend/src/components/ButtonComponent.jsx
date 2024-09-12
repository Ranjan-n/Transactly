export function ButtonComponent({ label, onclick }) {
  return (
    <button
      onClick={onclick}
      className="mt-5 hover:bg-transparent bg-blue-500 hover:text-blue-500 font-semibold text-white py-2 px-4 border hover:border-blue-500 border-transparent rounded"
    >
      {label}
    </button>
  );
}
