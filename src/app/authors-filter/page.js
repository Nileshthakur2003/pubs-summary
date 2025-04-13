"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Import ShadCN Progress component
import { useSearchParams, useRouter } from "next/navigation"; // Fetch query parameters

function extractPid(url) {
  const regex = /pid\/(\d+\/\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null; 
}

export default function AuthorSearchResults() {
  const searchParams = useSearchParams(); // Access URL query parameters
  const name = searchParams.get("name"); // Get the `name` prop from the URL

  const router = useRouter(); // Initialize router for navigation
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!name) {
      setError("No search data provided. Please provide a valid name to search.");
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        // Example API call using the name from props
        const response = await fetch(`/api/dblp/searchAuthor?query=${name}`);
        const data = await response.json();

        // Check if results are available
        if (data?.result?.hits?.hit) {
          setSearchResults(data.result.hits.hit);
        } else {
          setError("No authors found. Please try a different name.");
        }
      } catch (err) {
        setError("Error fetching authors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [name]);

  // Handle Author Selection
  const handleAuthorSelection = (authordata) => {
    if (!authordata) return;

    // Get current parameters from searchParams
    let currentParams = Object.fromEntries(searchParams.entries());

    // Remove "name" parameter and add "author" parameter
    delete currentParams["name"];
    currentParams["author"] = authordata.authorName;
    currentParams["pid"] = encodeURIComponent(authordata.pid);

    // Reconstruct query string
    const updatedQuery = new URLSearchParams(currentParams).toString();

    // Navigate to results-pub page with updated query
    router.push(`/results-pub?${updatedQuery}`);
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* Navbar */}
      <Navbar className="bg-zinc-50 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-zinc-900">Author Search Results</h1>
          <span className="text-zinc-600">Powered by DBLP</span>
        </div>
      </Navbar>

      <div className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4 text-zinc-800">Select Author from:</h2>

        {/* ShadCN Progress Component for Loading State */}
        {loading && (
          <div className="my-4">
            <Progress className="w-full" /> {/* Progress bar with optional value */}
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Results Display */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((author, index) => (
              <Card key={index} className="p-6 bg-white border border-zinc-300 shadow-md rounded-lg">
                <h3 className="text-lg font-bold text-zinc-800 mb-2">{author.info.author || "No Name Available"}</h3>
                <p className="text-sm text-zinc-600 mb-1">
                  <strong>URL:</strong>{" "}
                  {author.info.url ? (
                    <a
                      href={author.info.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {author.info.url}
                    </a>
                  ) : (
                    "No URL Available"
                  )}
                </p>
                <p className="text-sm text-zinc-600">
                  <strong>ID:</strong> {author["@id"] || "No ID Available"}
                </p>
                {/* Corrected onClick Handler */}
                <Button
                  className="bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-800"
                  onClick={() => handleAuthorSelection({authorName:author.info.author,pid:extractPid(author.info?.url)})}
                >
                  Proceed with Author
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-600">No authors found. Please refine your search.</p>
        )}

        {/* Go Back Button */}
        <div className="mt-6 flex justify-center">
          <Button
            className="bg-zinc-200 text-zinc-900 px-4 py-2 rounded hover:bg-zinc-100"
            onClick={() => router.push("/search")}
          >
            Go Back to Search
          </Button>
        </div>
      </div>
    </div>
  );
}