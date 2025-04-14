import fs from "fs";
import path from "path";
import XLSX from "xlsx"; // For reading Excel files
import { BibtexParser } from "bibtex-js-parser"; // For parsing BibTeX files

// Utility to read and parse an XLSX file
const readXlsxFile = (filePath) => {
  try {
    const workbook = XLSX.readFile(filePath); // Read the Excel file
    const sheetNames = workbook.SheetNames; // Get all sheet names
    const jsonData = sheetNames.map((sheetName) => ({
      sheetName,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]), // Convert each sheet to JSON
    }));
    return jsonData;
  } catch (error) {
    console.error("Error reading XLSX file:", error.message);
    throw new Error("Failed to read Excel file");
  }
};

// Utility to read and parse a BibTeX file
const readBibtexFile = (filePath) => {
  try {
    const bibtexContent = fs.readFileSync(filePath, "utf8"); // Read the BibTeX file
    const parsedData = BibtexParser.parseToJSON(bibtexContent); // Parse BibTeX data into JSON
    return parsedData;
  } catch (error) {
    console.error("Error reading BibTeX file:", error.message);
    throw new Error("Failed to read BibTeX file");
  }
};

// Next.js API handler to read files
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { fileType, fileName } = req.body;

    if (!fileType || !fileName) {
      return res.status(400).json({ error: "fileType and fileName are required" });
    }

    // Define the path to the file in `./public/uploads`
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    let fileData;

    // Read and process the file based on its type
    if (fileType === "xlsx") {
      fileData = readXlsxFile(filePath); // Process XLSX files
    } else if (fileType === "bibtex") {
      fileData = readBibtexFile(filePath); // Process BibTeX files
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.status(200).json({ data: fileData }); // Respond with JSON data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}