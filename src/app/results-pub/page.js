"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS , ArcElement , Tooltip , Legend } from "chart.js";

ChartJS.register(ArcElement,Tooltip , Legend);

export default function ResultsPage() {

  const [authorProfile] = useState({
    name: "John Doe",
    specialization: "Artificial Intelligence & Cybersecurity",
    location: "USA",
    institution: "MIT",
    totalCitations: 800,
    totalPublications: 20,
  });


  const [books] = useState([
    { title: "Deep Learning for Beginners", publisher: "TechPress", year: 2019, citations: 120 },
    { title: "Advanced AI Systems", publisher: "AI Publishing", year: 2022, citations: 300 },
  ]);

  const [journals] = useState([
    { title: "Deep Learning Techniques", category: "Journal", specialization: "AI", location: "USA", citations: 450, year: 2021 },
    { title: "Cybersecurity Insights", category: "Journal", specialization: "Cybersecurity", location: "UK", citations: 200, year: 2019 },
  ]);


  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    specialization: "",
    location: "",
    citationCount: "",
  });

  const filteredBooks = books.filter(
    (book) =>
      (!filters.startDate || book.year >= parseInt(filters.startDate)) &&
      (!filters.endDate || book.year <= parseInt(filters.endDate)) &&
      (!filters.citationCount || book.citations >= parseInt(filters.citationCount))
  );

  const filteredJournals = journals.filter(
    (journal) =>
      (!filters.startDate || journal.year >= parseInt(filters.startDate)) &&
      (!filters.endDate || journal.year <= parseInt(filters.endDate)) &&
      (!filters.citationCount || journal.citations >= parseInt(filters.citationCount)) &&
      (!filters.specialization || journal.specialization.toLowerCase().includes(filters.specialization.toLowerCase())) &&
      (!filters.location || journal.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.category || journal.category.toLowerCase() === filters.category.toLowerCase())
  );


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      category: "",
      specialization: "",
      location: "",
      citationCount: "",
    });
  };

  const pieChartData = {
    labels:["Books","Journals"],
    datasets:[{
        label:"Publication Distribution",
        data:[books.length, journals.length],
        backgroundColor:["#34D399","#3B82F6"],
        borderWidth:1,
    }]
  }

  const handleBack = () => {
    setFilters({
      startDate: "",
      endDate: "",
      category: "",
      specialization: "",
      location: "",
      citationCount: "",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center justify-center p-6">
        
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">

        <Card className="md:w-1/3 p-6">
        
          <h2 className="text-xl font-bold mb-4">Author Profile</h2>
          <p className="mb-1"><strong>Name:</strong> {authorProfile.name}</p>
          <p className="mb-1"><strong>Specialization:</strong> {authorProfile.specialization}</p>
          <p className="mb-1"><strong>Location:</strong> {authorProfile.location}</p>
          <p className="mb-1"><strong>Institution:</strong> {authorProfile.institution}</p>
          <p className="mb-1"><strong>Total Citations:</strong> {authorProfile.totalCitations}</p>
          <p className="mb-2"><strong>Total Publications:</strong> {authorProfile.totalPublications}</p>
           {/* Pie Chart */}
            

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Filters</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply Filters</DialogTitle>
                <DialogDescription>Use these filters to refine your results.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="number"
                  placeholder="Enter start year"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full"
                />

                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="number"
                  placeholder="Enter end year"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="w-full"
                />

                <Label htmlFor="citationCount">Minimum Citations</Label>
                <Input
                  id="citationCount"
                  name="citationCount"
                  type="number"
                  placeholder="Enter minimum citation count"
                  value={filters.citationCount}
                  onChange={handleFilterChange}
                  className="w-full"
                />

                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="Enter specialization"
                  value={filters.specialization}
                  onChange={handleFilterChange}
                  className="w-full"
                />

                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full"
                />

                <Label htmlFor="category">Category</Label>
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
              <DialogFooter>
                <Button variant="outline" onClick={handleResetFilters}>Reset Filters</Button>
                <Button variant="default">Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>


        <Card className="md:w-2/3 p-6">
        <h2 className="text-xl font-bold mt-8 mb-4">Publication Distribution</h2>
            <div className="flex justify-center items-center">
             <div style={{ width: "200px", height: "200px" }}> {/* Smaller size */}
               <Pie data={pieChartData} />
             </div>
            </div>
          <h2 className="text-xl font-bold mb-4">Books</h2>
          {filteredBooks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Publisher</TableHead>
                  <TableHead>Citations</TableHead>
                  <TableHead>Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.publisher}</TableCell>
                    <TableCell>{book.citations}</TableCell>
                    <TableCell>{book.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center mt-4">No books found.</p>
          )}

          <h2 className="text-xl font-bold mt-8 mb-4">Journals</h2>
          {filteredJournals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Citations</TableHead>
                  <TableHead>Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJournals.map((journal, index) => (
                  <TableRow key={index}>
                    <TableCell>{journal.title}</TableCell>
                    <TableCell>{journal.category}</TableCell>
                    <TableCell>{journal.specialization}</TableCell>
                    <TableCell>{journal.location}</TableCell>
                    <TableCell>{journal.citations}</TableCell>
                    <TableCell>{journal.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center mt-4">No journals found.</p>
          )}
          <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={handleBack}>Back to Search</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}