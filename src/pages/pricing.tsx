import React from 'react';
import Layout from '@/components/ui/Layout';
import { loadStripe } from '@stripe/stripe-js';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  {
    name: 'Basic Plan',
    price: '$9.99',
    interval: 'month',
    features: ['5 videos per month', 'Standard processing'],
    priceId: 'price_1P3zYlJvVjYjYjYjYjYjYjYj', // Replace with your Stripe Price ID
  },
  {
    name: 'Pro Plan',
    price: '$29.99',
    interval: 'month',
    features: ['Unlimited videos', 'Priority processing', 'Advanced analytics'],
    priceId: 'price_1P3zYlJvVjYjYjYjYjYjYjY2', // Replace with your Stripe Price ID
  },
];

const handleSubscribe = async (priceId: string) => {
  const res = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });
  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  }
};

export default function Pricing() {
  return (
    <Layout>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <p className="text-lg text-gray-600 mt-2">Choose the plan that's right for you.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-4xl font-extrabold mt-4">{plan.price}</p>
              <p className="text-gray-500">{`per ${plan.interval}`}</p>
              <ul className="mt-6 text-left w-full space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.priceId)}
                className="mt-8 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};