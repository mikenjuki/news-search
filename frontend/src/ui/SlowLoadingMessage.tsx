import hackingImage from "../assets/hacking.jpg";

export function SlowLoadingMessage() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 text-center px-4">
      <img
        src={hackingImage}
        alt="Hacking illustration"
        className="w-64 h-auto rounded-md shadow-md"
      />
      <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
        Downloading CIA-classified news...
      </p>
    </div>
  );
}
