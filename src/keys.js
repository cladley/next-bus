export default function getKeys() {
  if (process.env.NODE_ENV === "production") {
    return {
      GOOGLE_MAP_API_KEY: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    };
  } else if (process.env.NODE_ENV === "development") {
    return {
      GOOGLE_MAP_API_KEY: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    };
  }
}
