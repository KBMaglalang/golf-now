import { sanityClient } from "../../lib/sanity/sanity.server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await Promise.all(
        req.body.map(async (product) => {
          await sanityClient
            .patch(product._id)
            .dec({ stock: product.quantity })
            .commit();
        })
      );

      res.status(200).json({});
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      const response = await sanityClient.fetch(
        `*[brand._ref == '${req.query.id}']{..., brand->{_id,title}}`
      );

      res.status(200).json({ response });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST, GET");
    res.status(405).end("Method Not Allowed");
  }
}
