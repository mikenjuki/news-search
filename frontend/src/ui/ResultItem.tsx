type ResultItemProps = {
  title: string;
  url: string;
  description: string;
  image: string | null;
  source: string;
};

export default function ResultItem({
  title,
  url,
  description,
  image,
  source,
}: ResultItemProps) {
  return (
    <div className="flex gap-4 justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4">
      {/* text content */}
      <div className="flex-1">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 visited:text-purple-700 font-medium hover:underline"
        >
          {title}
        </a>
        <p className="text-xs text-gray-500 truncate">
          {url.length > 70 ? url.slice(0, 67).trim() + "..." : url}
        </p>
        <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
          {description.length > 120
            ? description.slice(0, 117).trim() + "..."
            : description}
        </p>
        <span className="inline-block mt-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-0.5 rounded">
          {source}
        </span>
      </div>

      {/* image */}
      {image && (
        <img
          src={image}
          alt="thumbnail"
          className="w-24 h-24 object-cover rounded hidden sm:block"
        />
      )}
    </div>
  );
}
