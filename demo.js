
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

// List of titles
const titles = [
  "3-2-1 Shipping",
  "Just-In-Time Inventory",
  "Cross-Docking",
  "Distributed Inventory",
  "Last-Mile Delivery Solutions",
  "Freight Consolidation",
  "Dynamic Routing",
  "Third-Party Logistics (3PL)",
  "Seasonal Planning",
  "Cycle Counting",
  "Sales and Operations Planning (S&OP)",
  "Cost-to-Serve Analysis",
];

// Function to select a random title from the list
const getRandomTitle = () => {
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
};

// Function to send POST request
const sendPostRequest = async (title) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/generate-quote-image",
      {
        title: title,
      }
    );
    console.log(`Success: ${title}`, response.data);
  } catch (error) {
    console.error(`Error for title: ${title}`, error.message);
  }
};

// Main function to run the loop 100 times
const runLoop = async () => {
    console.log("db connection established");
  for (let i = 0; i < 100; i++) {
    const randomTitle = getRandomTitle();
    console.log(`Request ${i + 1}: Sending title "${randomTitle}"`);
    await sendPostRequest(randomTitle); // Await ensures requests happen sequentially
  }
};

// Start the loop
runLoop();
console.log(process.env.MONGO_URL);