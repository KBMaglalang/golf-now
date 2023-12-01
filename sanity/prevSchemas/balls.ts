import { defineType } from "sanity";

export default defineType({
  name: "balls",
  title: "Balls",
  type: "document",
  fields: [
    {
      name: "visible",
      title: "Visible on the frontend",
      type: "boolean",
      initialValue: false,
    },

    {
      name: "brand",
      title: "Brand",
      type: "reference",
      to: { type: "brand" },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "sku",
      title: "SKU",
      type: "string",
    },
    {
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: `sku`,
        maxLength: 80,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "stock",
      title: "Stock",
      type: "number",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "features",
      title: "Features",
      type: "blockContent",
    },
  ],
});
