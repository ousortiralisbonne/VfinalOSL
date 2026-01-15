import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "z8eiwrv2",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
});

export default sanityClient;
