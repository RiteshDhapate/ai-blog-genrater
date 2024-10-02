# Inspirational Blog Generator

This project is an Express.js server that generates inspirational blog posts with AI-generated images. It uses MongoDB for data storage and Cloudinary for image hosting.

## Features

- Generate blog posts with AI-generated titles, subtitles, content, and images
- Store generated blog posts in MongoDB
- Retrieve paginated list of blog posts
- Cloudinary integration for image hosting

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14 or higher recommended)
- MongoDB installed and running
- Cloudinary account for image hosting
- OpenAI API key for content generation

## server
deplyed server URL
```curl
https://ai-blog-genrater.onrender.com
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/RiteshDhapate/ai-blog-genrater.git
   cd ai-blog-genrater
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3001
   MONGO_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will be running at `http://localhost:3001` (or the port specified in your .env file).

## API Endpoints

### Generate a Blog Post

- **URL**: `/generate-blog`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Your inspirational topic"
  }
  ```
- **Response**: Returns the generated blog post data and image URL.

### Get Blog Posts

- **URL**: `/blogs`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of blogs per page (default: 10)
- **Response**: Returns a paginated list of blog posts.

## Example Usage

### Generating a Blog Post

```bash
curl -X POST http://localhost:3001/generate-blog \
     -H "Content-Type: application/json" \
     -d '{"title": "Overcoming Challenges"}'
```

### Retrieving Blog Posts

```bash
curl http://localhost:3001/blogs?page=1&limit=5
```

## Contributing

Contributions to the Inspirational Blog Generator are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- Express.js
- MongoDB
- Mongoose
- Cloudinary
- OpenAI
- Dotenv