import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      res.status(200).json({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      console.log(
        "🚀 ~ file: balanceTransactions.js ~ line 13 ~ handler ~ req.",
        req.query
      );
      // const session = await stripe.checkout.sessions.retrieve(req.query.key);
      // const session = await stripe.balanceTransactions.retrieve(req.query.key);
      const session = await stripe.balanceTransactions.list();
      console.log(
        "🚀 ~ file: balanceTransactions.js ~ line 20 ~ handler ~ session",
        session
      );

      res.status(200).json({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PUT") {
    try {
      res.status(200).json({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "DELETE") {
    try {
      res.status(200).json({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
