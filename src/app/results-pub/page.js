// app/results-pub/page.tsx
"use client";
import { Suspense } from "react";

function ResultsPageWrapper() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <ResultsPageInner />
    </Suspense>
  );
}

export default ResultsPageWrapper;

// ==========================
// CLIENT COMPONENT STARTS
// ==========================


import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ResultsPageInner() {
  const searchParams = useSearchParams();
  const authorName = searchParams.get("author");
  const authorPid = searchParams.get("pid");

  const [authorProfile, setAuthorProfile] = useState(null);
  const [publications, setPublications] = useState([]);
  const [books, setBooks] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!authorName) {
        setError("No author provided. Please navigate back and select an author.");
        return;
      }

      try {
        setLoading(true);
        const profileResponse = await axios.get(`/api/dblp/searchAuthor?query=${authorName}`);
        const profileData = profileResponse.data;

        const publicationsResponse = await axios.get(`/api/dblp/fetchPublications?query=${authorName}&pid=${authorPid}`);
        const publicationsData = publicationsResponse.data;

        if (publicationsResponse.status === 404 || publicationsData.status === "NODATA") {
          setError("No data found.");
          return;
        }

        const booksData = publicationsData.results.filter((pub) => pub.type === "Books");
        const journalsData = publicationsData.results.filter((pub) => pub.type === "Journals");
        const publicationsDataFiltered = publicationsData.results.filter((pub) => pub.type !== "Books" && pub.type !== "Journals");

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
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/4 w-full bg-white p-4 border-b md:border-b-0 md:border-r border-zinc-200">
          <Card className="p-4 md:p-6">
            <h2 className="text-lg font-bold mb-4">Author</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : authorProfile ? (
              <h3 className="text-3xl">{authorName}</h3>
            ) : (
              <p>No profile data found.</p>
            )}
          </Card>

          <Card className="p-4 md:p-6 mb-6 mt-4">
            <h2 className="text-lg md:text-xl font-bold mb-4">Publication Distribution</h2>
            <div className="flex justify-center items-center">
              <div className="w-full md:w-[300px] h-[300px]">
                <Pie data={pieChartData} />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section */}
        <div className="md:w-3/4 w-full p-4 md:p-6">
          {/* Publications Section */}
          <Card className="p-4 md:p-6 mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-4">Publications</h2>
            {publications.length > 0 ? (
              <div className="space-y-4 md:space-y-0 overflow-x-auto">
                {publications.map((publication, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row bg-white rounded-md shadow-md p-4 space-y-2 md:space-y-0 md:space-x-4"
                  >
                    <div className="w-full md:w-1/4 text-justify">
                      <strong>{publication.title}</strong>
                    </div>
                    <div className="w-full md:w-1/4">
                      <strong>Year:</strong> {publication.year}
                    </div>
                    <div className="w-full md:w-1/4">
                      <strong>Authors:</strong>{" "}
                      {publication.authors.map((author) => author.text).join(", ")}
                    </div>
                    <div className="w-full md:w-1/4">
                      <strong>Link:</strong>{" "}
                      <a
                        href={publication.ee}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        External Link
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No other publications found.</p>
            )}
          </Card>

          {/* Journals Section */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4">Journals</h2>
            {journals.length > 0 ? (
              <div className="space-y-4 md:space-y-0 overflow-x-auto">
                {journals.map((journal, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row bg-white rounded-md shadow-md p-4 space-y-2 md:space-y-0 md:space-x-4"
                  >
                    <div className="w-full md:w-1/4">
                      <strong>Title:</strong> {journal.title}
                    </div>
                    <div className="w-full md:w-1/4">
                      <strong>Year:</strong> {journal.year}
                    </div>
                    <div className="w-full md:w-1/4">
                      <strong>Authors:</strong>{" "}
                      {journal.authors.map((author) => author.text).join(", ")}
                    </div>
                    <div className="w-full md:w-1/4">
                      <strong>Link:</strong>{" "}
                      <a
                        href={journal.ee}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        External Link
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No journals found.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
