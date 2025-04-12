"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); // Initialize the useRouter hook

  const handleNavigation = () => {
    router.push("/search-pub-manual"); // Navigate to '/search-pub-manual'
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center p-6 sm:p-12 text-center">
        <section id="hero" className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold leading-tight">Streamline Faculty Publication Summaries</h1>
          <p className="text-lg text-zinc-700">
            Crawl, categorize, and showcase research achievements efficiently. Elevate your institution’s academic profile with our solution.
          </p>
          <div className="flex gap-4">
            {/* Updated Button */}
            <Button variant="default" onClick={handleNavigation}>
              Get Started with Manual Search
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="flex flex-col gap-6 mt-12">
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-left text-zinc-700">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Automated Crawling</h3>
              <p>Fetch data from Google Scholar and DBLP effortlessly.</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Year-Wise Summaries</h3>
              <p>Generate exportable Word and Excel reports.</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Custom Queries</h3>
              <p>Filter data by specific time periods.</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Secure Integration</h3>
              <p>Ensure real-time and secure data management.</p>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 border-t border-zinc-300 p-6">
        <div className="flex gap-8">
          <Button variant="link">Learn More</Button>
          <Button variant="link">Deploy</Button>
        </div>
        <p className="text-zinc-700">&copy; 2025 Publication Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}