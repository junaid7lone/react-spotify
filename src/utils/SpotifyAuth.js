import axios from "axios";
import qs from "qs";
import { CLIENT_ID, CLIENT_SECRET } from "../components/Constants";

export const getAuth = async () => {
  // const clientId = process.env.REACT_APP_BASIC_CLIENT_ID;
  // const clientSecret = process.env.REACT_APP_BASIC_CLIENT_SECRET;
  const clientId = CLIENT_ID;
  const clientSecret = CLIENT_SECRET;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: "client_credentials",
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    console.log(response.data.access_token);
    localStorage.setItem("accessToken", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthToken = () => {
  const tokenData = localStorage.getItem("accessToken");

  return tokenData;
};
