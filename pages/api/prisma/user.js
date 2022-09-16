import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
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
      const result = await prisma.user.update({
        where: {
          id: req.body.userData.id,
        },
        data: {
          ...req.body.formData,
        },
      });

      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "GET, PUT");
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
