import { Link } from "react-router-dom";

const BackToListLink = () => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      (event.target as HTMLAnchorElement).click();
    }
  };

  return (
    <Link
      to="/"
      className="block text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ml-0"
      aria-label="Go back to list"
      title="Go back to list"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      &lt; Back to list
    </Link>
  );
};

export default BackToListLink;
