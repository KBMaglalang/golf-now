export default {
  name: "balls",
  title: "Balls",
  type: "document",
  fields: [
    /*
      product description
      product features
    */
    {
      name: "brand",
      title: "Brand",
      type: "string",
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
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 80,
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
      type: "string", // this could be a rich text things instead of just a string
    },
    {
      name: "features",
      title: "Features",
      type: "string", // this could be a rich text things instead of just a string
    },
  ],
};
