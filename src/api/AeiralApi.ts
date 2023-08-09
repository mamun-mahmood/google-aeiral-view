// google aerial api
import axios from "axios";
const apiKey = import.meta.env.VITE_GOOGLE_AERIAL_API_KEY;

async function fetchAerialVideoByID(
  videoId: string,
  address: string
): Promise<any> {
  const url = `https://aerialview.googleapis.com/v1beta/videos?key=${apiKey}&videoId=${videoId}`;

  try {
    const response = await axios.get(url);
    return {
      ...response.data,
      succss: true,
      status: "success",
      address: address,
    };
  } catch (error) {
    // Handle the error here
    console.error("Error fetching aerial video:", error.message);
    return {
      message: error.message,
      status: "error",
      success: false,
    };
  }
}

async function renderAerialVideo(address: string): Promise<any> {
  const url = `https://aerialview.googleapis.com/v1/videos:renderVideo?key=${apiKey}`;
  const data = {
    address: address,
  };
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, data, { headers });
    return {
      ...response.data,
      succss: true,
      status: "success",
      address: address,
    };
  } catch (error) {
    // Handle the error here
    console.error("Error rendering aerial video:", error.message);
    return {
      message: error.message,
      status: "error",
      success: false,
    };
  }
}

export { fetchAerialVideoByID, renderAerialVideo };
