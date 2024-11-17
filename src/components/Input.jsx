export default function Input({ label, value, onChange, flexdirection }) {
  return (
    <div
      className={`text-x flex w-full gap-3 text-gray-900 flex-${flexdirection} ${flexdirection === "row" ? "items-center" : ""}`}
    >
      <label className="text-xl font-medium" htmlFor={label}>
        {label}
      </label>
      <input
        className="rounded-xl bg-gray-100 p-1 py-2 pl-3 font-medium outline-none"
        value={value}
        type="text"
        onChange={onChange}
      />
    </div>
  );
}
