import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      const { product, prismaUserData } = req.body;

      const result = await prisma.favorite.create({
        data: {
          productSKU: product.sku,
          productName: product.name,
          productSanityId: product._id,
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
          userId: "cl7r8kaqb00064mhdkw5eifzc",
          removed: false,
        },
      });
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PUT") {
    // try {
    //   const { product, prismaUserData } = req.body;
    //   console.log(
    //     "🚀 ~ file: favorite.js ~ line 46 ~ handle ~ prismaUserData",
    //     prismaUserData
    //   );
    //   console.log(
    //     "🚀 ~ file: favorite.js ~ line 46 ~ handle ~ product",
    //     product
    //   );
    //   const result = await prisma.favorite.updateMany({
    //     where: {
    //       userId: prismaUserData.id,
    //       productSanityId: product._id,
    //     },
    //     data: {
    //       removed: true,
    //     },
    //   });
    //   console.log("🚀 ~ file: favorite.js ~ line 61 ~ handle ~ result", result);
    //   res.json(result);
    // } catch (err) {
    //   res.status(err.statusCode || 500).json(err.message);
    // }
  } else if (req.method === "DELETE") {
    try {
      console.log(
        "🚀 ~ file: favorite.js ~ line 62 ~ handle ~ req.body",
        req.body
      );
      // const { product, prismaUserData } = req.body;
      // console.log(
      //   "🚀 ~ file: favorite.js ~ line 46 ~ handle ~ prismaUserData",
      //   prismaUserData
      // );
      // console.log(
      //   "🚀 ~ file: favorite.js ~ line 46 ~ handle ~ product",
      //   product
      // );

      const result = await prisma.favorite.deleteMany({
        where: {
          userId: "cl7r8kaqb00064mhdkw5eifzc",
          productSanityId: "09ea3f50-673e-4c00-9313-c1f8c2e51370",
          // userId: prismaUserData.id,
          // productSanityId: product._id,
        },
      });
      console.log("🚀 ~ file: favorite.js ~ line 61 ~ handle ~ result", result);
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST, GET, PUT");
    res.status(405).end("Method Not Allowed");
  }
}
