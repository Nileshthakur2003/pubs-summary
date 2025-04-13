// pages/api/fetch-publications.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    // Extract 'query' from the request query (use req.query, not req.params)
    const { query } = req.query; 

    // Validate the query parameter
    if (!query) {
      return res.status(400).json({ error: "The 'query' parameter is required." });
    }

    // Construct the DBLP API URL
    const apiUrl = `https://dblp.org/search/author/api?q=${encodeURIComponent(query)}&format=json`;

    // Fetch data from the DBLP API
    const response = await axios.get(apiUrl);

    // Return the raw response data as is
    return res.status(200).json(response.data);
  } catch (error) {
    // Handle errors and return appropriate response
    console.error("Error fetching publications:", error.message);
    return res.status(500).json({ error: "An error occurred while fetching publications." });
  }
}