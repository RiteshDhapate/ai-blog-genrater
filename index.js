import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { uploadOnCloudinary } from "./utils/cloudinary.js"; // Import the function you created
import {
  generateImage,
  generateBlogTitleSubtitleAndContent,
} from "./utils/generateQuote.js";
import Blog from "./models/blog.model.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Inspirational Quote Generator!");
});

app.post("/generate-quote-image", async (req, res) => {
  try {
    console.log(req.body);
    const { title } = req.body;

    const imageUrl = await generateImage(title);
    console.log("Generated image URL:", imageUrl);
    const data = await generateBlogTitleSubtitleAndContent(title);
    // console.log("Generated quote:", quote);

    console.log("Final image path:", imageUrl);
    const blog = new Blog({
      data,
      imageUrl, // This will return the path to the saved image
    });
    await blog.save();
    res.json({
      data,
      imageUrl, // This will return the path to the saved image
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// New route to get all blogs with pagination
app.get("/blogs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Fetch blogs with pagination
    const blogs = await Blog.find().skip(skip).limit(limit);

    // Get total count for pagination metadata
    const totalBlogs = await Blog.countDocuments();

    res.json({
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect(process.env.MONGO_URL);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
