import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "studio-xr-one",
  title: "Studio XR·ONE",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
