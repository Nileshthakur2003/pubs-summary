"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Toggle mobile menu
  const router = useRouter(); // Initialize Next.js router

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false); // Close the menu after navigation
    router.push(path); // Navigate to the selected route
  };

  return (
    <nav className="bg-zinc-100 border-b border-zinc-300 w-full">
      <div className="container mx-auto flex justify-between h-12 px-4 items-center">
        {/* Logo */}
        <h1
          className="text-lg font-medium text-zinc-800 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          Publication Summarizer
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <button
            className="text-zinc-600 hover:text-zinc-900"
            onClick={() => handleNavigation("/search-pub")}
          >
            BibTEX/Excel Search
          </button>
          <button
            className="text-zinc-600 hover:text-zinc-900"
            onClick={() => handleNavigation("/search-pub-manual")}
          >
            Manual Search
          </button>
          <button
            className="text-zinc-600 hover:text-zinc-900"
            onClick={() => handleNavigation("/help")}
          >
            Help
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-zinc-600 hover:text-zinc-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // Close icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-100 border-t border-zinc-300">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <button
                className="w-full text-left text-zinc-600 hover:text-zinc-900"
                onClick={() => handleNavigation("/search-pub")}
              >
                BibTEX/Excel Search
              </button>
            </li>
            <li>
              <button
                className="w-full text-left text-zinc-600 hover:text-zinc-900"
                onClick={() => handleNavigation("/search-pub-manual")}
              >
                Manual Search
              </button>
            </li>
            <li>
              <button
                className="w-full text-left text-zinc-600 hover:text-zinc-900"
                onClick={() => handleNavigation("/help")}
              >
                Help
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}