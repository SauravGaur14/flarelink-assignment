export default function TaskItem({ task }) {
  return (
    <div className="mb-4 flex w-full justify-between rounded-md border-b border-blue-200 p-2">
      <div>{task.title}</div>
      <p className="w-[50%]">{task.task}</p>
    </div>
  );
}
