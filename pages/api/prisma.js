import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      // const {
      //   first_name,
      //   last_name,
      //   address_1,
      //   city,
      //   postal_code,
      //   country,
      //   telephone,
      //   email,
      //   role,
      // } = req.body;

      const result = await prisma.user.create({
        data: {
          name: "asdf",
          email: "asdf",
          image: "asdf",
          phoneNumber: "asdf",
          country: "asdf",
          city: "asdf",
          postalCode: "asdf",
          address1: "asdf",
          address2: "asdf",
        },
      });
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      // const result = await prisma.user.findUnique({
      //   where: {},
      // });
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PUT") {
    try {
      // const result = await prisma.user.update({
      //   where: {},
      //   data: {},
      // });
      res.json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "DELETE") {
    try {
      // if (req.method === "DELETE") {
      //   // handleDELETE(postId, res)
      //   const post = await prisma.post.delete({
      //     where: { id: Number(postId) },
      //   });
      // } else {
      //   throw new Error(
      //     `The HTTP ${req.method} method is not supported at this route.`
      //   );
      // }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
