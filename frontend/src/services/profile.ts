import { GEOLOCATION_KEY } from "../config";

import axios from "axios";

export async function getCoordinates(location) {
  const base = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${GEOLOCATION_KEY}`;
  const req = axios({
    method: "get",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
    },
    url: base + `"${location}"`,
    withCredentials: false,
  });
  return req;
}
