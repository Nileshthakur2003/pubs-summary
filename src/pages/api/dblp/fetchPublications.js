// Import Axios for HTTP requests
import axios from "axios";

// Define and export the function properly
const fetchPublicationsByPid = async (req, res) => {
  try {
    // Extract 'pid' from the request body
   // const { pid } = req.body;

    // Extract other parameters from the request query
    const { pid , query, format = "json", start = 0, limit = 30 } = req.query;

    // Validate the 'pid' parameter
    if (!pid) {
      return res.status(400).json({ error: "The 'pid' parameter is required." });
    }

    // Validate the 'query' parameter
    if (!query) {
      return res.status(400).json({ error: "The 'query' parameter is required." });
    }

    // Construct the DBLP API URL for publication search
    const apiUrl = `https://dblp.org/search/publ/api?query=${encodeURIComponent(
      query
    )}&format=${format}&h=${limit}&f=${start}`;

    console.log(apiUrl)
    // Make a GET request to the DBLP API
    const response = await axios.get(apiUrl);

    // Extract data from the API response
    const publications = response?.data?.result?.hits?.hit;
    console.log(response.data.result);

    // Check if publications exist in the response
    if (!publications || publications.length === 0) {
      return res
        .status(404)
        .json({ message: "No publications found for the given query." });
    }

    // Filter publications that include the provided 'pid' in the authors array
    const filteredPublications = publications.filter((pub) => {
      const authors = pub?.info?.authors?.author;
      if (Array.isArray(authors)) {
        // Check if any author's '@pid' matches the provided 'pid'
        return authors.some((author) => author["@pid"] === pid);
      } else if (typeof authors === "object") {
        // Handle case where a single author object is provided instead of an array
        return authors["@pid"] === pid;
      }
      return false;
    });

    // Check if filtered publications exist
    if (!filteredPublications || filteredPublications.length === 0) {
      return res
        .status(200)
        .json({status:"NODATA", message: "No publications found for the given 'pid'." });
    }

    // Format the filtered publications for the response
    const formattedPublications = filteredPublications.map((pub) => ({
      title: pub?.info?.title || "No Title Available",
      authors: pub?.info?.authors?.author || "No Authors Available",
      year: pub?.info?.year || "No Year Available",
      venue: pub?.info?.venue || "No Venue Information",
      type: pub?.info?.type || "No Type Specified",
      doi: pub?.info?.doi || "No DOI Available",
      ee: pub?.info?.ee || "No External Link Available",
    }));

    // Return filtered and formatted publications
    return res.status(200).json({ results: formattedPublications });
  } catch (error) {
    // Handle errors
    console.error("Error fetching publications:", error.message);
    return res.status(500).json({
      error: "An error occurred while fetching publications. Please try again.",
    });
  }
};

// Export the function properly
export default fetchPublicationsByPid;