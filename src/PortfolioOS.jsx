import React, { useState, useEffect, useRef, useContext } from "react";
import { Volume2, Settings, FolderOpen, Globe, Battery } from "lucide-react";
import Window from "./components/window/Window";
import Browser from "./components/apps/Browser";
import Files from "./components/apps/Files";
import SettingsApp from "./components/apps/Settings";
import { WindowManagerContext } from "./context/WindowManager/WindowManagerContext";

export default function PortfolioOS() {
  //TIME CALCULATIONS
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  //WINDOW MANAGER
  const {
    windows,
    setWindows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
  } = useContext(WindowManagerContext);

  //DOCK APPS
  const dockApps = [
    {
      id: "apps",
      icon: (
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>
          ))}
        </div>
      ),
      label: "All Apps",
      color: "from-violet-500 to-purple-600",
      onClick: () => openWindow("apps", "All Apps", null, null),
    },
    {
      id: "browser",
      icon: <Globe size={32} />,
      label: "Browser",
      color: "from-indigo-500 to-purple-600",
      onClick: () => openWindow("browser", "Browser", Browser, null),
    },
    {
      id: "files",
      icon: <FolderOpen size={32} />,
      label: "My Files",
      color: "from-pink-500 to-rose-500",
      onClick: () => openWindow("files", "My Files", Files, null),
    },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-end justify-center overflow-hidden relative">
      {windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          isActive={activeWindow === win.id}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => bringToFront(win.id)}
          onUpdate={(updates) => {
            setWindows(
              windows.map((w) => (w.id === win.id ? { ...w, ...updates } : w))
            );
          }}
          openWindow={openWindow}
        />
      ))}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-5 py-3 bg-white/15 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl z-50">
        <div className="flex items-center gap-3 h-20">
          {dockApps.map((app) => (
            <div
              key={app.id}
              onClick={app.onClick}
              className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-110 shadow-lg group relative`}
            >
              <div className="text-white">{app.icon}</div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.label}
              </div>
            </div>
          ))}

          <div className="w-px h-12 bg-white/30 mx-1" />

          <div
            onClick={() => openWindow("settings", "Settings", SettingsApp)}
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-110 shadow-lg group relative"
          >
            <Settings size={32} className="text-white" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Settings
            </div>
          </div>

          <div className="w-px h-12 bg-white/30 mx-1" />

          <div className="flex items-center gap-3 pl-2">
            <div className="flex items-center justify-center w-12 h-12 cursor-pointer transition-all duration-300 hover:scale-110 group relative">
              <Volume2 size={24} className="text-white" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Sound
              </div>
            </div>

            <div className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 group relative">
              <Battery size={24} className="text-white" />
              <span className="text-white text-sm font-medium">85%</span>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Battery
              </div>
            </div>

            <div className="w-px h-12 bg-white/30 mx-1" />

            <div className="flex flex-col items-end px-2 cursor-pointer transition-all duration-300 hover:scale-105 group relative">
              <span className="text-white text-sm font-semibold">
                {formatTime(time)}
              </span>
              <span className="text-white/80 text-xs">{formatDate(time)}</span>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Date & Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
