export default function LabeledInput({
  label,
  htmlFor = "",
  error = false,
  ...props
}) {
  const inputBorderClass = error
    ? "border-2 border-red-500 focus:border-red-500"
    : "border border-gray-300 dark:border-gray-700 focus:border-2 focus:border-indigo-400";

  return (
    <div className="relative w-full">
      <input
        type="text"
        id={htmlFor}
        placeholder=" "
        className={`peer h-12 w-full rounded-md shadow-sm px-3 focus:px-[calc(0.75rem-1px)] pt-5 pb-1 text-sm placeholder-transparent focus:outline-none transition-colors duration-150 ${inputBorderClass}`}
        {...props}
      />
      <label
        htmlFor={htmlFor}
        className="absolute font-normal tracking-wide left-[calc(0.75rem+1px)] top-1.5 text-xs text-neutral-500 transition-all peer-focus:top-1.5 peer-focus:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400"
      >
        {label}
      </label>
    </div>
  );
}
