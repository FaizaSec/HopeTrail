import { Routes, Route } from "react-router";

// ===== FROM TEAMMATE =====
import Navbar from "./Header-Footer/Navbar.jsx";
import HomePage from "./Home-Auth/HomePage.jsx";
import PetGrid from "./components/PetGrid.jsx";
import PetDetails from "./Components/PetDetails.jsx";

// ===== FROM SHOVA =====
import DogsAndPuppies from "./pages/DogsAndPuppies.jsx";
import CatsAndKittens from "./pages/CatsAndKittens.jsx";
import OtherPets from "./pages/OtherPets.jsx";
import Adopt from "./pages/Adopt.jsx";
import Quiz from "./pages/Quiz.jsx";
import Footer from "./Header-Footer/Footer.jsx";

function App() {
  return (
    <>
      {/* ===== FROM TEAMMATE + SHOVA =====
          Navbar is now outside Routes,
          so it appears on every page.
      */}
      <Navbar />

      <Routes>

        {/* ===== FROM TEAMMATE ===== */}
        <Route path="/" element={<HomePage />} />

        {/* Teammate's existing pet system */}
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


        {/* ===== FROM SHOVA ===== */}

        {/* Your Dogs page */}
        <Route
          path="/dogs-and-puppies"
          element={<DogsAndPuppies />}
        />

        {/* Your Cats page */}
        <Route
          path="/cats-and-kittens"
          element={<CatsAndKittens />}
        />

        {/* Your Other Pets page */}
        <Route
          path="/other-pets"
          element={<OtherPets />}
        />

        {/* Your Adopt page */}
        <Route
          path="/adopt"
          element={<Adopt />}
        />

        {/* Your Quiz page */}
        <Route
          path="/quiz"
          element={<Quiz />}
        />

      </Routes>
      {/*Shova Changed the global footer */}
      <Footer />
    </>
  );
}
export default App;