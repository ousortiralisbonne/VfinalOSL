// project/src/components/Studio.tsx
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const Studio = () => {
  const url = "https://sortirlisbonnestudio.sanity.studio";

  useEffect(() => {
    // Redirect to the specified URL
    window.location.href = url;
  }, [url]);

  return <LoadingSpinner />;
};

export default Studio;
