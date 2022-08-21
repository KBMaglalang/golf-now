import { cmsClient } from "../../lib/sanityClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await Promise.all(
        req.body.map(async (product) => {
          await cmsClient
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
    console.log("in get req", req.query);
    try {
      const response = await cmsClient.fetch(
        `*[brand._ref == '${req.query.id}']{..., brand->{_id,title}}`
      );

      res.status(200).json({ response });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
