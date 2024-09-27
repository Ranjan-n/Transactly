export function InputBox({ id, type, label, onChange, onKeyDown }) {
  return (
    <div className="pb-1">
      <label
        className="block text-xs sm:text-sm font-semibold text-blue-700"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-500 focus:outline-none sm:text-sm sm:leading-6"
        id={id}
        type={type}
        onKeyDown={onKeyDown}
        required
      />
    </div>
  );
}
