import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(
        "🚀 ~ file: stripe.js ~ line 33 ~ line_items:req.body.cartItems.map ~ req.body",
        req.body
      );

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
              unit_amount: item.price * 100,
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

      // add user email to the stripe data if user is logged in
      if (req.body.user) params["customer_email"] = req.body.user.email;

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "GET") {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.key);
      const customer = await stripe.customers.retrieve(session.customer);

      res.status(200).json({ session, customer });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
