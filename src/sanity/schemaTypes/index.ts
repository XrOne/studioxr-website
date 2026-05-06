import type { SchemaTypeDefinition } from "sanity";
import { capacity } from "./capacity";
import { caseStudy } from "./caseStudy";
import { teamMember } from "./teamMember";
import { partner } from "./partner";
import { settings } from "./settings";
import { blockContent } from "./blockContent";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  capacity,
  caseStudy,
  teamMember,
  partner,
  settings,
];
