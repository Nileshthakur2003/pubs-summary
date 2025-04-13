"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { useSearchParams } from "next/navigation"; // Fetch URL query parameters dynamically
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsPage() {
  const searchParams = useSearchParams(); // Retrieve query parameters from URL
  const authorName = searchParams.get("author");
  const authorPid = searchParams.get("pid"); // Extract author name and PID

  const [authorProfile, setAuthorProfile] = useState(null); // Store author profile
  const [publications, setPublications] = useState([]); // Store publications
  const [books, setBooks] = useState([]); // Store books
  const [journals, setJournals] = useState([]); // Store journals
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!authorName) {
        setError("No author provided. Please navigate back and select an author.");
        return;
      }

      try {
        setLoading(true);

        // API call to fetch author profile using Axios
        const profileResponse = await axios.get(`/api/dblp/searchAuthor?query=${authorName}`);
        const profileData = profileResponse.data;

        // API call to fetch publications using Axios
        const publicationsResponse = await axios.get(`/api/dblp/fetchPublications?query=${authorName}&pid=${authorPid}`);
        const publicationsData = publicationsResponse.data;

        // Handle "NODATA" status
        if (publicationsResponse.status === 404 || publicationsData.status === "NODATA") {
          setError("No data found.");
          return;
        }

        // Separate data into books, journals, and publications
        const booksData = publicationsData.results.filter((pub) => pub.type === "Books");
        const journalsData = publicationsData.results.filter((pub) => pub.type === "Journals");
        const publicationsDataFiltered = publicationsData.results.filter((pub) => pub.type !== "Books" && pub.type !== "Journals");

        // Set state with fetched data
        setAuthorProfile(profileData);
        setPublications(publicationsDataFiltered);
        setBooks(booksData);
        setJournals(journalsData);
      } catch (err) {
        if (err.response && (err.response.status === 404 || err.response.data.status === "NODATA")) {
          setError("No data found.");
        } else {
          setError("Error fetching data from the server. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorName]);

  // Pie chart data
  const pieChartData = {
    labels: ["Books", "Journals", "Other Publications"],
    datasets: [
      {
        label: "Publication Distribution",
        data: [books.length, journals.length, publications.length],
        backgroundColor: ["#34D399", "#3B82F6", "#F97316"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <Navbar />
      {/* Main Layout */}
      <div className="flex">
        {/* Left Fixed Section */}
        <div className="w-1/4 h-screen sticky top-0 bg-white p-4 border-r border-zinc-200">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Author :</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : authorProfile ? (
              <>
                {/* <p className="mb-1"><strong>Name:</strong> {authorProfile.name}</p>
                <p className="mb-1"><strong>Specialization:</strong> {authorProfile.specialization}</p>
                <p className="mb-1"><strong>Location:</strong> {authorProfile.location}</p>
                <p className="mb-1"><strong>Institution:</strong> {authorProfile.institution}</p>
                <p className="mb-1"><strong>Total Citations:</strong> {authorProfile.totalCitations}</p>
                <p className="mb-2"><strong>Total Publications:</strong> {authorProfile.totalPublications}</p> */}

                {authorName}
              </>
            ) : (
              <p>No profile data found.</p>
            )}
          </Card>
        </div>

        

        {/* Right Scrollable Section */}
        <div className="w-3/4 p-6 overflow-y-auto">
          {/* Publication Distribution Pie Chart */}


           {/* Publications Section */}
           <Card className="p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Publications</h2>
            {publications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead>Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {publications.map((publication, index) => (
                    <TableRow key={index}>
                      <TableCell>{publication.title}</TableCell>
                      <TableCell>{publication.year}</TableCell>
                      <TableCell>{publication.authors.map((author) => author.text).join(", ")}</TableCell>
                      <TableCell>
                        <a
                          href={publication.ee}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          External Link
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                          
                        
           ) : (
             <p className="text-center">No other publications found.</p>
            )}
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Publication Distribution</h2>
            <div className="flex justify-center items-center">
              <div style={{ width: "300px", height: "300px" }}>
                <Pie data={pieChartData} />
              </div>
            </div>
          </Card>


         

          {/* Books Section
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Books</h2>
            {books.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead>Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.year}</TableCell>
                      <TableCell>{book.authors.map((author) => author.text).join(", ")}</TableCell>
                      <TableCell>
                        <a
                          href={book.ee}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          External Link
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center">No books found.</p>
            )}
          </Card> */}

          {/* Journals Section */}
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Journals</h2>
            {journals.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead>Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journals.map((journal, index) => (
                    <TableRow key={index}>
                      <TableCell>{journal.title}</TableCell>
                      <TableCell>{journal.year}</TableCell>
                      <TableCell>{journal.authors.map((author) => author.text).join(", ")}</TableCell>
                      <TableCell>
                        <a
                          href={journal.ee}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          External Link
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center">No journals found.</p>
            )}
          </Card>

          
        </div>
      </div>
    </div>
  );
}
             