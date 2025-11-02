import { useState } from "react";

export default function Browser() {
  const [url, setUrl] = useState("https://www.google.com");
  const [inputUrl, setInputUrl] = useState("https://www.google.com");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUrlSubmit();
    }
  };

  const handleUrlSubmit = () => {
    let newUrl = inputUrl;
    if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
      newUrl = "https://" + newUrl;
    }
    setUrl(newUrl);
    setInputUrl(newUrl);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 bg-gray-50 border-b flex items-center gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter URL..."
        />
        <button
          onClick={handleUrlSubmit}
          className="px-4 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
        >
          Go
        </button>
      </div>
      <iframe src={url} className="w-full h-full border-0" title="Browser" />
    </div>
  );
}
