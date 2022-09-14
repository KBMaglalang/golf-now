import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      const result = await prisma.order.create({
        data: {
          stripeOrderId:
            "cs_test_a14NWqAPyHcOFzFEMKVmOatz2NKaVj4k7DWBvJnxODTMHRIT5JpsGixvaC",
          quantity: 101,
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
      console.log("🚀 ~ file: order.js ~ line 25 ~ handle ~ result", result);

      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
    // } else if (req.method === "PUT") {
    //   try {
    //     const result = await prisma.order.update({
    //       where: {
    //         userId: "cl7r8kaqb00064mhdkw5eifzc",
    //       },
    //       data: {
    //         orderStatus: "cancelled",
    //       },
    //     });

    //     res.json(result);
    //   } catch (err) {
    //     res.status(err.statusCode || 500).json(err.message);
    //   }
    // } else if (req.method === "DELETE") {
    //   try {
    //     const result = await prisma.order.delete({
    //       where: {
    //         userId: "cl7r8kaqb00064mhdkw5eifzc",
    //       },
    //     });

    //     res.json(result);
    //   } catch (err) {
    //     res.status(err.statusCode || 500).json(err.message);
    //   }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// const createUser = async () => {
//   try {
//     await fetch(`/api/prisma/user/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateUser = async () => {
//   try {
//     await fetch(`/api/prisma/user/`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const findUser = async () => {
//   try {
//     await fetch(`/api/prisma/user/`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const deleteUser = async () => {
//   try {
//     await fetch(`/api/prisma/user/`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(undefined),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

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
