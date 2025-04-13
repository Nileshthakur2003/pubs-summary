"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Navbar from "@/components/navbar";

export default function ManualInputPage() {
  const router = useRouter(); // Initialize the router for page navigation

  // State for manual input
  const [facultyDetails, setFacultyDetails] = useState({
    name: "",
    department: "",
    institution: "",
  });

  // State for search filters
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    specialization: "",
    location: "",
    citationCount: "",
  });

  // Handle manual input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacultyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine faculty details and filters
    const formData = {
      ...facultyDetails,
      ...filters,
    };

    // Convert data to query parameters
    const query = new URLSearchParams(formData).toString();

    // Navigate to another page and pass data through the URL
    router.push(`/authors-filter?${query}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <Navbar /> {/* Add Navbar component here */}
      <div className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-5xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Manual Faculty Data Input with Filters
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Faculty Name */}
            <div>
              <Label htmlFor="name" className="block mb-2">
                Faculty Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter faculty name"
                value={facultyDetails.name}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            {/* Department */}
            <div>
              <Label htmlFor="department" className="block mb-2">
                Department
              </Label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder="Enter department"
                value={facultyDetails.department}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            {/* Institution */}
            <div>
              <Label htmlFor="institution" className="block mb-2">
                Institution
              </Label>
              <Input
                id="institution"
                name="institution"
                type="text"
                placeholder="Enter institution"
                value={facultyDetails.institution}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="startDate" className="block mb-2">
                Start Date
              </Label>
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
              <Label htmlFor="endDate" className="block mb-2">
                End Date
              </Label>
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
              <Label htmlFor="category" className="block mb-2">
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setFilters((prevFilters) => ({ ...prevFilters, category: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specialization */}
            <div>
              <Label htmlFor="specialization" className="block mb-2">
                Specialization
              </Label>
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
              <Label htmlFor="location" className="block mb-2">
                Area/Location
              </Label>
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
              <Label htmlFor="citationCount" className="block mb-2">
                Minimum Citations
              </Label>
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
              <Button type="submit" className="w-full">
                Submit Data and Filters
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}