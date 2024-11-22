import express from 'express';
import Stripe from 'stripe';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd'
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: 'Payment processing error' });
  }
});

// Create Stripe account link
router.post('/create-account-link', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        }
      });

      user.stripeAccountId = account.id;
      await user.save();
    }

    const accountLink = await stripe.accountLinks.create({
      account: user.stripeAccountId,
      refresh_url: `${process.env.CORS_ORIGIN}/dashboard`,
      return_url: `${process.env.CORS_ORIGIN}/dashboard`,
      type: 'account_onboarding'
    });

    res.json({ url: accountLink.url });
  } catch (err) {
    res.status(500).json({ message: 'Error creating Stripe account' });
  }
});

export default router;