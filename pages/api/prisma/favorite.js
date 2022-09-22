import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      const { stripeData, cartItems, userData } = req.body;

      const result = await prisma.order.create({
        data: {
          stripeOrderId: stripeData.session.id,
          quantity: cartItems.quantity,
          userId: userData.id,
          status: "Pending",
          productSKU: cartItems.sku,
          productSubTotal: parseInt((cartItems.price * 100).toFixed(0)),
          productName: cartItems.name,
        },
      });

      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      const result = await prisma.user.findUnique({
        where: {
          email: req.query.key,
        },
      });

      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PUT") {
    try {
      const result = await prisma.user.findUnique({
        where: {
          email: req.query.key,
        },
      });

      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST, GET, PUT");
    res.status(405).end("Method Not Allowed");
  }
}
