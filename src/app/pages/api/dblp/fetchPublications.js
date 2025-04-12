// Import Axios for HTTP requests
import axios from "axios";

export default fetchPublications = async(req, res) => {
  try {
    // Extract query parameters
    const { query, format = "json", start = 0, limit = 30 } = req.query;

    // Validate query parameter
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    // Construct the DBLP API URL
    const apiUrl = `https://dblp.org/search/publ/api?q=${encodeURIComponent(
      query
    )}&format=${format}&h=${limit}&f=${start}`;

    // Make a GET request to the DBLP API
    const response = await axios.get(apiUrl);

    // Extract data from the response
    const publications = response.data.result.hits.hit;

    // Check if publications exist in the result
    if (!publications || publications.length === 0) {
      return res.status(404).json({ message: "No publications found" });
    }

    // Format the publications for response
    const formattedPublications = publications.map((pub) => ({
      title: pub.info.title || "No Title Available",
      authors: pub.info.authors?.author || "No Authors Available",
      year: pub.info.year || "No Year Available",
      venue: pub.info.venue || "No Venue Information",
      type: pub.info.type || "No Type Specified",
    }));

    // Return formatted publications
    res.status(200).json({ results: formattedPublications });
  } catch (error) {
    // Handle errors
    console.error("Error fetching publications:", error.message);
    res.status(500).json({ error: "An error occurred while fetching publications" });
  }
}