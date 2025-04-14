import multer from "multer";
import nextConnect from "next-connect";
import path from "path";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the directory where files will be stored
      cb(null, "./public/uploads"); // Save files in the "public/uploads" folder
    },
    filename: (req, file, cb) => {
      // Set the filename to be the original name with a timestamp
      const timestamp = Date.now();
      cb(null, `${timestamp}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Optional: Validate file type
    const allowedTypes = ["application/pdf", "text/plain", "application/json"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF, TXT, or JSON files are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

// Initialize next-connect middleware
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file")); // Use multer middleware to handle a single file

// POST handler to upload files
apiRoute.post((req, res) => {
  if (req.file) {
    // File successfully uploaded
    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
      },
    });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

export default apiRoute;

// Prevent Next.js default body parser from interfering with multer
export const config = {
  api: {
    bodyParser: false,
  },
};