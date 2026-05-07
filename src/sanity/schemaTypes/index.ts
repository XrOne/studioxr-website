import type { SchemaTypeDefinition } from "sanity";
import { capacity } from "./capacity";
import { caseStudy } from "./caseStudy";
import { legacyProject } from "./legacyProject";
import { teamMember } from "./teamMember";
import { partner } from "./partner";
import { settings } from "./settings";
import { blockContent } from "./blockContent";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  capacity,
  caseStudy,
  legacyProject,
  teamMember,
  partner,
  settings,
];
