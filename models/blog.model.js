import mongoose from "mongoose";

// Define the schema
const blogSchema = new mongoose.Schema(
  {
    data: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will automatically add 'createdAt' and 'updatedAt' fields
  }
);

// Create the model
const Blog = mongoose.model("BlogPosts", blogSchema);

// Export the model
export default Blog;
