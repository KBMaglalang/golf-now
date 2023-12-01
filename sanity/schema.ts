import { type SchemaTypeDefinition } from "sanity";

// schemas
import notification from "./schemas/notification";
import hero from "./schemas/hero";

import clubs from "./prevSchemas/clubs";
import balls from "./prevSchemas/balls";
import shoes from "./prevSchemas/shoes";
import clothing from "./prevSchemas/clothing";
import golfTech from "./prevSchemas/golfTech";
import bagCarts from "./prevSchemas/bagCarts";
import brands from "./prevSchemas/brands";
import category from "./prevSchemas/category";

import blockContent from "./prevSchemas/blockContent";
import localeBlockContent from "./prevSchemas/locale/BlockContent";
import localeString from "./prevSchemas/locale/String";
import localeText from "./prevSchemas/locale/Text";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    notification,
    hero,

    clubs,
    balls,
    shoes,
    clothing,
    bagCarts,
    golfTech,
    brands,
    category,

    blockContent,
    localeBlockContent,
    localeString,
    localeText,
  ],
};
