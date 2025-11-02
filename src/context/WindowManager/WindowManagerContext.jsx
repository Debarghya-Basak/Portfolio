import React, { useEffect, useRef, useState } from "react";

const WindowManagerContext = React.createContext();

const WindowManagerProvider = ({ children }) => {
  const [mouseClickPos, setMouseClickPos] = useState({ x: 0, y: 0 });

  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(10);

  useEffect(() => {
    const handleClick = (e) => {
      console.log("Clicked somewhere:");
      setMouseClickPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const openWindow = (type, title, application, data) => {
    const newWindow = {
      id: Date.now(),
      type,
      title,
      application,
      data,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 50,
      width: type === "browser" ? 900 : type === "files" ? 600 : 500,
      height: type === "browser" ? 600 : type === "files" ? 400 : 400,
      isMaximized: false,
      isMinimized: false,
      zIndex: nextZIndex,
    };
    setWindows([...windows, newWindow]);
    setActiveWindow(newWindow.id);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id) => {
    setWindows(
      windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const maximizeWindow = (id) => {
    setWindows(
      windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  const bringToFront = (id) => {
    setActiveWindow(id);
    setWindows(
      windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
      )
    );
    setNextZIndex(nextZIndex + 1);
  };
  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        setWindows,
        activeWindow,
        setActiveWindow,
        nextZIndex,
        setNextZIndex,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        bringToFront,
        mouseClickPos,
        setMouseClickPos,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};

export { WindowManagerContext, WindowManagerProvider };
