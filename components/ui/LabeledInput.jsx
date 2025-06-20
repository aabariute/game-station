export default function LabeledInput({
  label,
  htmlFor = "",
  error = false,
  ...props
}) {
  const inputBorderClass = error
    ? "border-2 border-red-500 focus:border-red-500"
    : "border border-primary-300 focus:border-2 focus:border-indigo-400";

  return (
    <div className="relative w-full">
      <input
        type="text"
        id={htmlFor}
        placeholder=" "
        className={`peer h-12 w-full rounded-md px-3 pt-5 pb-1 text-sm placeholder-transparent shadow-sm transition-colors duration-150 focus:px-[calc(0.75rem-1px)] focus:outline-none ${inputBorderClass}`}
        {...props}
      />
      <label
        htmlFor={htmlFor}
        className="absolute top-1.5 left-[calc(0.75rem+1px)] text-xs font-normal tracking-wide text-neutral-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:top-1.5 peer-focus:text-xs"
      >
        {label}
      </label>
    </div>
  );
}
