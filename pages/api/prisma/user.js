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
