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
    <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 visited:text-purple-700 font-medium hover:underline block"
        >
          {title}
        </a>

        <p className="text-xs text-gray-500 break-all truncate">
          {url.length > 70 ? url.slice(0, 67).trim() + "..." : url}
        </p>

        <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 line-clamp-2">
          {description.length > 120
            ? description.slice(0, 117).trim() + "..."
            : description}
        </p>

        <span className="inline-block mt-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-0.5 rounded">
          {source}
        </span>
      </div>

      {/* Image */}
      {image && (
        <img
          src={image}
          alt="thumbnail"
          className="hidden md:block w-20 h-20 sm:w-24 sm:h-24 object-cover rounded self-start shrink-0"
        />
      )}
    </div>
  );
}
