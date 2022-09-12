import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      const result = await prisma.order.create({
        data: {
          productSKU: "123",
          quantity: 10,
          userId: "cl7r8kaqb00064mhdkw5eifzc",
        },
      });
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      const result = await prisma.order.findMany({
        where: {
          userId: "cl7r8kaqb00064mhdkw5eifzc",
        },
      });
      console.log("🚀 ~ file: prisma.js ~ line 42 ~ handle ~ result", result);
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PUT") {
    try {
      const result = await prisma.order.update({
        where: {
          id: "cl7tw1lej029010hdvt8ldk0c",
        },
        data: {
          orderStatus: "cancelled",
        },
      });
      console.log("🚀 ~ file: prisma.js ~ line 57 ~ handle ~ result", result);
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "DELETE") {
    console.log("in delete route");
    try {
      const result = await prisma.order.delete({
        where: {
          id: "cl7tvwiko027510hdgpvmqyvn",
        },
      });
      console.log("🚀 ~ file: prisma.js ~ line 71 ~ handle ~ result", result);
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
