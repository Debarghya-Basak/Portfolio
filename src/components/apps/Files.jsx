import { FileText } from "lucide-react";
import TextEditor from "./TextEditor";
import { useContext } from "react";
import { WindowManagerContext } from "../../context/WindowManager/WindowManagerContext";

export default function Files({ params }) {
  const { openWindow } = useContext(WindowManagerContext);

  return (
    <div className="h-full p-4">
      <div className="text-sm text-gray-600 mb-4 font-medium">My Documents</div>
      <div
        onClick={() =>
          openWindow("texteditor", "Text Editor", TextEditor, params.data)
        }
        className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
      >
        <FileText size={32} className="text-blue-500" />
        <span className="text-sm font-medium">readme.txt</span>
      </div>
    </div>
  );
}
