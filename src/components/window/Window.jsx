import { useState, useEffect, Children, useContext } from "react";
import { Minimize2, X, FileText, Minimize } from "lucide-react";
import { easeInOut, isDragActive, motion, scale } from "framer-motion";
import { WindowManagerContext } from "../../context/WindowManager/WindowManagerContext";

export default function Window({
  window: win,
  isActive,
  onClose,
  onMaximize,
  onFocus,
  onUpdate,
}) {
  const { mouseClickPos } = useContext(WindowManagerContext);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (
      e.target.closest(".window-controls") ||
      e.target.closest(".resize-handle")
    )
      return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    });
    onFocus();
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      width: win.width,
      height: win.height,
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !win.isMaximized) {
        onUpdate({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
      if (isResizing) {
        const newWidth = Math.max(
          400,
          dragStart.width + (e.clientX - dragStart.x)
        );
        const newHeight = Math.max(
          300,
          dragStart.height + (e.clientY - dragStart.y)
        );
        onUpdate({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, win.isMaximized]);

  if (win.isMinimized) return null;

  const style = win.isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 120px)",
        zIndex: win.zIndex,
        transition: `${
          isDragging || isResizing
            ? ""
            : "width 0.3s ease-in-out, height 0.3s ease-in-out, top 0.3s ease-in-out, left 0.3s ease-in-out"
        }`,
      }
    : {
        top: win.y,
        left: win.x,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        transition: `${
          isDragging || isResizing
            ? ""
            : "width 0.3s ease-in-out, height 0.3s ease-in-out, top 0.3s ease-in-out, left 0.3s ease-in-out"
        }`,
      };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0, x: mouseClickPos.x, y: mouseClickPos.y }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`text-black fixed bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col ${
        isActive ? "ring-2 ring-blue-500" : ""
      }`}
      style={style}
      onMouseDown={onFocus}
    >
      <div
        className="h-10 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-between px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium text-gray-700">{win.title}</span>
        <div className="window-controls flex items-center gap-2">
          <button
            onClick={onMaximize}
            className="w-auto h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors flex justify-center items-center"
          >
            {win.isMaximized ? (
              <Minimize2 size={16} color="white" />
            ) : (
              <Minimize size={16} color="white" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-auto h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors flex justify-center items-center"
          >
            <X size={16} color="white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-white relative">
        <win.application params={{ data: win.data }} />

        {!win.isMaximized && (
          <div
            className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={handleResizeMouseDown}
          >
            <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
