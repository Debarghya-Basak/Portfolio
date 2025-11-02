export default function AllApps() {
  return (
    <div className="h-full p-6">
      <h2 className="text-xl font-semibold mb-6">All Applications</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          "Browser",
          "Files",
          "Settings",
          "Calculator",
          "Notes",
          "Calendar",
          "Photos",
          "Music",
        ].map((app) => (
          <div
            key={app}
            className="flex flex-col items-center justify-center p-4 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mb-2"></div>
            <span className="text-xs text-gray-700">{app}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
