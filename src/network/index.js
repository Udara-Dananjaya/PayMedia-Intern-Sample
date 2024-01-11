import axios from "axios";
import { appSettings } from "@/appSettings.js";

class NetworkResponse {
  constructor(statusCode = 0, data = null) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

class NetworkManager {
  static async apiRequest(url, data, withToken = true, contentType = "application/json") {
    // Construct the full URL
    const URL = `${appSettings.$api_url}/${url}`;

    // Set default headers and timeout
    let config = {
      headers: {
        Accept: "*/*",
      },
      timeout: appSettings.timeoutDuration,
    };

    // Include Authorization header if withToken is true
    if (withToken) {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }

    // Set Content-Type header
    config.headers["Content-Type"] = contentType;

    try {
      // Make the API request using axios
      const response = await axios.post(URL, data, config);
      return response.data;
    } catch (error) {
      // Handle errors and create a NetworkResponse object
      console.error("API Request Error:", error);
      let resp = new NetworkResponse();

      if (error.response) {
        resp.statusCode = error.response.status;

        if (error.response.data) {
          resp.data = error.response.data;
        }
      } else {
        resp.statusCode = 502;
      }

      throw resp;
    }
  }
}

export default NetworkManager;
