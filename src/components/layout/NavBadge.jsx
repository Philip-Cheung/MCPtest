export default function NavBadge({ count }) {
  return (
    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
      {count}
    </span>
  );
}

