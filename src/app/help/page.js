"use client";

import React from "react";
import Navbar from "@/components/navbar"; // Include your Navbar component

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I search for authors?",
      answer:
        "To search for authors, enter the author&apos;s name in the search bar on the homepage and press the search button. You&apos;ll be redirected to the results page with relevant authors.",
    },
    {
      question: "How can I filter publications?",
      answer:
        "On the results page, use the filters provided (e.g., year, category, specialization) to refine your search for books, journals, or other publications.",
    },
    {
      question: "What should I do if no results are found?",
      answer:
        "If no results are found, try using a different author name or check for typos. If the problem persists, please contact support.",
    },
    {
      question: "How do I view author profiles?",
      answer:
        "On the left-hand side of the results page, you&apos;ll find the author&apos;s profile, displaying all available information such as name, specialization, location, and more.",
    },
    {
      question: "How can I contact support?",
      answer:
        "Scroll to the bottom of this page to find the contact form or email us at support@example.com for assistance.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Help & Support</h1>

        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <p className="text-zinc-700">{faq.answer}</p>
            </div>
          ))}
        </section>

        {/* User Guide Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How to Use the Application</h2>
          <ol className="list-decimal list-inside text-zinc-700">
            <li>Navigate to the homepage and enter the author&apos;s name in the search bar.</li>
            <li>Browse through the search results to find the relevant author.</li>
            <li>View the author&apos;s profile on the left-hand side of the results page.</li>
            <li>Filter publications (books, journals, or other) using the filters provided.</li>
            <li>Click on publication links to view more details or external links.</li>
          </ol>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
          <p className="text-zinc-700 mb-4">
            If you have additional questions or need further assistance, feel free to contact our support team.
          </p>
          <p className="mb-4">
            Email:{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 hover:underline"
            >
              support@example.com
            </a>
          </p>
          <p className="mb-4">Phone: +1-800-555-1234</p>

          {/* Contact Form (Optional) */}
          <form className="max-w-md bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-bold mb-4">Send us a message</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Type your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;