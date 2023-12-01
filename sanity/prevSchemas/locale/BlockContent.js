import { defineType } from "sanity";

import supportedLanguages from "./supportedLanguages";

export default defineType({
  name: "localeBlockContent",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "blockContent",
    fieldset: lang.isDefault ? null : "translations",
  })),
});
