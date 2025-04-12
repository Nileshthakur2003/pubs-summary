"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter(); // Initialize the useRouter hook

  // Navigation handlers
  const handleHomeNavigation = () => {
    router.push("/"); // Navigate to Home
  };

  const handleBibTexSearchNavigation = () => {
    router.push("/search-pub-manual"); // Navigate to BibTEX/Excel Search
  };

  const handleManualSearchNavigation = () => {
    router.push("/search-pub"); // Navigate to Manual Search
  };

  const handleHelpNavigation = () => {
    router.push("#submit"); // Navigate to Help (can be replaced with a valid route)
  };

  return (
    <nav className="bg-zinc-100 border-b border-zinc-300 w-full">
      <div className="container mx-auto flex justify-between h-12 px-4 mt-2">
        {/* Home navigation when clicking title */}
        <h1 className="text-lg font-medium text-zinc-800 cursor-pointer" onClick={handleHomeNavigation}>
          Publication Summarizer
        </h1>

        {/* Navigation Buttons */}
        <div className="flex space-x-6">
          <Button variant="link" className="text-zinc-600 hover:text-zinc-900" onClick={handleBibTexSearchNavigation}>
            BibTEX/Excel Search
          </Button>
          <Button variant="link" className="text-zinc-600 hover:text-zinc-900" onClick={handleManualSearchNavigation}>
            Manual Search
          </Button>
          <Button variant="link" className="text-zinc-600 hover:text-zinc-900" onClick={handleHelpNavigation}>
            Help
          </Button>
        </div>
      </div>
    </nav>
  );
}