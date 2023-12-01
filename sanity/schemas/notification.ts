import { defineType } from "sanity";

export default defineType({
  name: "notification",
  title: "Notification",
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
      name: "text",
      title: "Text",
      type: "string",
    },
  ],
});
