export default function Count({ label, count }) {
  return (
    <div
      className={`flex h-28 w-28 min-w-40 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-lg border pb-0 text-white transition-shadow hover:shadow-2xl ${
        label === "Total"
          ? "bg-yellow-400"
          : label === "Completed"
            ? "bg-green-500"
            : "bg-red-500"
      }`}
    >
      <span className="self-center pt-5 text-4xl font-semibold">{count}</span>
      <span
        className={`w-full rounded-b-lg p-1 text-center text-xl font-medium ${
          label === "Total"
            ? "bg-yellow-300"
            : label === "Completed"
              ? "bg-green-300"
              : "bg-red-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
