import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  // if (req.method === "POST") {
  //   // try {
  //   //   // const {
  //   //   //   first_name,
  //   //   //   last_name,
  //   //   //   address_1,
  //   //   //   city,
  //   //   //   postal_code,
  //   //   //   country,
  //   //   //   telephone,
  //   //   //   email,
  //   //   //   role,
  //   //   // } = req.body;

  //   //   const result = await prisma.user.create({
  //   //     data: {
  //   //       name: "asdf",
  //   //       email: "asdf@asdf.com",
  //   //       image: "asdf",
  //   //       phoneNumber: "asdf",
  //   //       country: "asdf",
  //   //       city: "asdf",
  //   //       postalCode: "asdf",
  //   //       address1: "asdf",
  //   //       address2: "asdf",
  //   //     },
  //   //   });
  //   //   res.json(result);
  //   // } catch (err) {
  //   // }
  //   res.status(err.statusCode || 500).json(err.message);
  // } else
  if (req.method === "GET") {
    console.log("in prisma user get api");
    console.log(
      "🚀 ~ file: user.js ~ line 42 ~ handle ~ req.query.key",
      req.query.key
    );

    try {
      const result = await prisma.user.findUnique({
        where: {
          email: req.query.key,
        },
      });
      console.log("🚀 ~ file: user.js ~ line 43 ~ handle ~ result", result);

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
    // } else if (req.method === "DELETE") {
    //   // try {
    //   //   const result = await prisma.user.delete({
    //   //     where: {
    //   //       email: "asdf@asdf.com",
    //   //     },
    //   //   });

    //   //   res.json(result);
    //   // } catch (err) {
    //   // }
    //   res.status(err.statusCode || 500).json(err.message);
  } else {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
  }
}
