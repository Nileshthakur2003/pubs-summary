"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <div className="bg-zinc-50 border-b border-zinc-200 p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-zinc-900">
          MyPublicationTool
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-4">
          <Button variant="link">
            Home
          </Button>
          <Button variant="link">
            Upload
          </Button>
          <Button variant="link">
            Results
          </Button>
          <Button variant="link">
            About
          </Button>
        </nav>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2">
          <Input placeholder="Search..." className="w-64" />
          <Button variant="default">Go</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="outline" className="text-sm">
            Menu
          </Button>
        </div>
      </div>
    </div>
  );
}