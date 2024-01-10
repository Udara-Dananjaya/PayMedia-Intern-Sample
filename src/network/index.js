import axios from "axios";
import { appSettings } from "@/appSettings.js";

class NetworkResponse {
 statusCode;
 data;

 constructor(statusCode = 0, data = null) {
    this.statusCode = statusCode;
    this.data = data;
 }
}

class NetworkManager {
 static async apiRequest(endpoint, data, withToken = true, contentType = "application/json") {
    const URL = appSettings.$api_url + "/" + endpoint;

    let config = {
      headers: {},
      timeout: appSettings.timeoutDuration,
    };

    if (withToken) {
      let authHeader = "";

      
        authHeader = `Bearer ${localStorage.getItem('authToken')}`;
      

      config.headers = {
        Authorization: authHeader,
      };
    }

    config.headers["Content-Type"] = contentType;

    if (contentType === "multipart/form-data") {
      config.headers["onUploadProgress"] = progressEvent => console.log(progressEvent.loaded);
    }

    try {
      const response = await axios.post(URL, data, config);
      return response.data;
    } catch (error) {
      let resp = new NetworkResponse();

      if (error.response) {
        resp.statusCode = error.response.status;

        if (error.response.data) {
          resp = error.response.data;
        }

        
      } else {
        resp.statusCode = 502;
      }

      throw resp;
    }
 }
}

export default NetworkManager;