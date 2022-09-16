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
          status: "pending",
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
      const result = await prisma.order.findMany({
        where: {
          userId: "cl7r8kaqb00064mhdkw5eifzc",
        },
      });

      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// const createOrder = async () => {
//   try {
//     await fetch(`/api/prisma/order/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
// const findOrder = async () => {
//   try {
//     await fetch(`/api/prisma/order/`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
// const updateOrder = async () => {
//   try {
//     await fetch(`/api/prisma/order/`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
// const deleteOrder = async () => {
//   try {
//     await fetch(`/api/prisma/order/`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
