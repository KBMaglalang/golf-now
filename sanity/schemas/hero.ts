import { defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    {
      name: "visible",
      title: "Visible on the frontend",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "link",
      title: "Link",
      type: "string",
    },
  ],
});
