export default function Settings() {
  return (
    <div className="h-full p-6">
      <h2 className="text-xl font-semibold mb-4">System Settings</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700">Display</div>
          <div className="text-xs text-gray-500 mt-1">
            Resolution: 1920x1080
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700">System</div>
          <div className="text-xs text-gray-500 mt-1">
            Version: Portfolio OS 1.0
          </div>
        </div>
      </div>
    </div>
  );
}
