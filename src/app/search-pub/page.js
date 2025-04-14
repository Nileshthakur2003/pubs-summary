"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/navbar";
import { useRouter } from "next/navigation"; // For navigation to /results-pub

export default function searchPub() {
  const [file, setFile] = useState(null); // Single file upload state
  const router = useRouter(); // Initialize Next.js router for navigation

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    specialization: "",
    location: "",
    citationCount: "",
  });

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]); // Store the uploaded file in state
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Initialize FormData for the file and filter data
      const formData = new FormData();
      if (file) formData.append("file", file);

      // Append filter data
      Object.entries(filters).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Make API request to upload and process the data
      const response = await fetch("/api/process-files", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Navigate to /results-pub with the processed data
        router.push({
          pathname: "/results-pub",
          query: { data: JSON.stringify(result.data) },
        });
      } else {
        console.error("Error processing file:", result.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {/* Page Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-5xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Upload Publication File and Filters</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Upload */}
            <div>
              <Label htmlFor="file" className="block mb-2">Upload File (.xlsx or .bib)</Label>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.bib"
                onChange={handleFileUpload}
                className="w-full"
              />
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="startDate" className="block mb-2">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* End Date */}
            <div>
              <Label htmlFor="endDate" className="block mb-2">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="block mb-2">Category</Label>
              <Input
                id="category"
                name="category"
                type="text"
                placeholder="Enter category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* Specialization */}
            <div>
              <Label htmlFor="specialization" className="block mb-2">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                type="text"
                placeholder="Enter specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="block mb-2">Area/Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* Citation Count */}
            <div>
              <Label htmlFor="citationCount" className="block mb-2">Minimum Citations</Label>
              <Input
                id="citationCount"
                name="citationCount"
                type="number"
                placeholder="Enter minimum citation count"
                value={filters.citationCount}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <Button type="submit" className="w-full">Submit File and Filters</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}