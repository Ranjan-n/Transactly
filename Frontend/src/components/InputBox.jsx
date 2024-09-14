export function InputBox({
  id,
  type,
  placeholder,
  label,
  onChange,
  onKeyDown,
}) {
  return (
    <div className="pb-1">
      <label
        className="text-sm text-blue-400 font-medium text-left py-2 block"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        onChange={onChange}
        className="w-full px-2 py-1 border rounded border-blue-200 focus:border-blue-500 focus:outline-none text-blue-700"
        id={id}
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        required
      />
    </div>
  );
}
