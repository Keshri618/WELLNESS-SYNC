
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyDmgaH07I4E8VKQnJRu5UN99kIjyebonUs',
  version: "weekly",
  libraries: ["places"],
});

export default loader;