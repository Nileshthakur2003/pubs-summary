"use client"; // Ensure this remains at the top of the file

import React, { useState, useEffect } from "react";
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

function AuthorSearchResults() {
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
        const response = await fetch(`/api/dblp/searchAuthor?query=${name}`);
        const data = await response.json();

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

    let currentParams = Object.fromEntries(searchParams.entries());
    delete currentParams["name"];
    currentParams["author"] = authordata.authorName;
    currentParams["pid"] = encodeURIComponent(authordata.pid);

    const updatedQuery = new URLSearchParams(currentParams).toString();
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

        {loading && (
          <div className="my-4">
            <Progress className="w-full" /> {/* Progress bar */}
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

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
                <Button
                  className="bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-800"
                  onClick={() =>
                    handleAuthorSelection({
                      authorName: author.info.author,
                      pid: extractPid(author.info?.url),
                    })
                  }
                >
                  Proceed with Author
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-600">No authors found. Please refine your search.</p>
        )}

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

// Export the page with Suspense wrapper
export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthorSearchResults />
    </Suspense>
  );
}