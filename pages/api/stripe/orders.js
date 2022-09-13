import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LcEBcHuV7ggtf9uWGBesx8j" },
          { shipping_rate: "shr_1LcECcHuV7ggtf9uaZ6r4ZI5" },
        ],
        line_items: req.body.cartItems.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: (item.price * 100).toFixed(0),
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.key);

      res.status(200).json({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PUT") {
    // ! no need to UPDATE anything in stripe
  } else if (req.method === "DELETE") {
    // ! no need to DELETE anything in stripe
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
