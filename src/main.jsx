import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import PetGrid from "./components/PetGrid.jsx";
import PetDetails from "./components/PetDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dogs" element={<DogGrid />} />
        <Route path="/cats" element={<CatGrid />} />
        <Route path="/dogs/:id" element={<PetDetails />} />
        <Route path="/cats/:id" element={<PetDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
