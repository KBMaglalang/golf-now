import prisma from "../../../lib/prisma/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      const { product, prismaUserData } = req.body;

      const result = await prisma.favorite.create({
        data: {
          productSKU: product.sku,
          productName: product.name,
          productSanityId: product._id,
          productType: product._type,
          removed: false,
          userId: prismaUserData.id,
        },
      });

      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      const result = await prisma.favorite.findMany({
        where: {
          ...req.query,
        },
      });
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { favoriteId } = req.body;
      const result = await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST, GET, DELETE");
    res.status(405).end("Method Not Allowed");
  }
}
