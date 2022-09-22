import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      console.log(
        "🚀 ~ file: favorite.js ~ line 7 ~ handle ~ req.body",
        req.body
      );
      const { testString } = req.body;
      console.log(
        "🚀 ~ file: favorite.js ~ line 7 ~ handle ~ testString",
        testString
      );
      // const result = await prisma.order.create({
      //   data: {
      //     stripeOrderId: stripeData.session.id,
      //     quantity: cartItems.quantity,
      //     userId: userData.id,
      //     status: "Pending",
      //     productSKU: cartItems.sku,
      //     productSubTotal: parseInt((cartItems.price * 100).toFixed(0)),
      //     productName: cartItems.name,
      //   },
      // });
      // res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      console.log(
        "🚀 ~ file: favorite.js ~ line 32 ~ handle ~ req.query.key",
        req.query.key
      );
      // const result = await prisma.user.findUnique({
      //   where: {
      //     email: req.query.key,
      //   },
      // });
      // res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PUT") {
    try {
      console.log(
        "🚀 ~ file: favorite.js ~ line 48  ~ handle ~ req.body",
        req.body
      );
      // const result = await prisma.user.findUnique({
      //   where: {
      //     email: req.query.key,
      //   },
      // });
      // res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST, GET, PUT");
    res.status(405).end("Method Not Allowed");
  }
}