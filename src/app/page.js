import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-zinc-50 text-zinc-900 p-6 sm:p-12">
      {/* Header Section */}
      <header className="w-full max-w-4xl flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-bold">Publication Summary</h1>
        <nav className="flex gap-6">
          <Button variant="link">Features</Button>
          <Button variant="link">About</Button>
          <Button variant="link">Contact</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-4xl flex flex-col gap-16 items-center text-center">
        <section id="hero" className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold leading-tight">
            Streamline Faculty Publication Summaries
          </h1>
          <p className="text-lg text-zinc-700">
            Crawl, categorize, and showcase research achievements efficiently.
            Elevate your institution’s academic profile with our solution.
          </p>
          <div className="flex gap-4">
            <Button variant="default">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="flex flex-col gap-12">
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 text-left text-zinc-700">
            <Card>
              <h3 className="font-semibold text-lg">Automated Crawling</h3>
              <p>Fetch data from Google Scholar and DBLP effortlessly.</p>
            </Card>
            <Card>
              <h3 className="font-semibold text-lg">Year-Wise Summaries</h3>
              <p>Generate exportable Word and Excel reports.</p>
            </Card>
            <Card>
              <h3 className="font-semibold text-lg">Custom Queries</h3>
              <p>Filter data by specific time periods.</p>
            </Card>
            <Card>
              <h3 className="font-semibold text-lg">Secure Integration</h3>
              <p>Ensure real-time and secure data management.</p>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-4xl flex flex-col gap-4 items-center border-t border-zinc-300 pt-6">
        <div className="flex gap-8">
          <Button variant="link">Learn More</Button>
          <Button variant="link">Deploy</Button>
        </div>
        <p className="text-zinc-700">&copy; 2025 Publication Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}