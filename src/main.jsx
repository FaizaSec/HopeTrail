import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
//import PetGrid from "./components/PetGrid.jsx";
//import PetDetails from "./components/PetDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/*<Routes> {/*ShovaChanged Attoja's route placed it inside app.jsx}
        <Route path="/" element={<App />} />
        <Route
          path="/dogs"
          element={
            <PetGrid
              species="dog"
              noun="dog"
              eyebrow="HopeTrail · Adoptable Dogs"
              heading="Every good trail starts with a first step."
            />
          }
        />
        <Route
          path="/cats"
          element={
            <PetGrid
              species="cat"
              noun="cat"
              eyebrow="HopeTrail · Adoptable Cats"
              heading="A quiet trail, a warm lap, waiting."
            />
          }
        />
        <Route path="/dogs/:id" element={<PetDetails />} />
        <Route path="/cats/:id" element={<PetDetails />} />
      </Routes>*/}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
