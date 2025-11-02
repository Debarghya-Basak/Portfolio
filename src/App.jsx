import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioOS from "./PortfolioOS";
import {
  WindowManagerContext,
  WindowManagerProvider,
} from "./context/WindowManager/WindowManagerContext";

export default function App() {
  return (
    <>
      <WindowManagerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortfolioOS />} />
          </Routes>
        </BrowserRouter>
      </WindowManagerProvider>
    </>
  );
}
