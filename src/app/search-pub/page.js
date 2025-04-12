"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import  NavBar  from "@/components/navbar";

export default function UploadFilesPage() {
  const [excelFile, setExcelFile] = useState(null);
  const [bibtexFile, setBibtexFile] = useState(null);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    specialization: "",
    location: "",
    citationCount: "",
  });

  const handleExcelUpload = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleBibtexUpload = (e) => {
    setBibtexFile(e.target.files[0]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Excel File:", excelFile);
    console.log("BibTeX File:", bibtexFile);
    console.log("Filters:", filters);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      {/* Classy Navigation Bar */}
      <NavBar/>

      {/* Page Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-5xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Upload Publication Files and Filters</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Excel Upload */}
            <div id="upload">
              <Label htmlFor="excel-file" className="block mb-2">Upload Excel File</Label>
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx"
                onChange={handleExcelUpload}
                className="w-full"
              />
            </div>

            {/* BibTeX Upload */}
            <div>
              <Label htmlFor="bibtex-file" className="block mb-2">Upload BibTeX File</Label>
              <Input
                id="bibtex-file"
                type="file"
                accept=".bib"
                onChange={handleBibtexUpload}
                className="w-full"
              />
            </div>

            {/* Start Date */}
            <div id="filters">
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
            <div id="submit" className="col-span-full">
              <Button type="submit" className="w-full">Submit Files and Filters</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}