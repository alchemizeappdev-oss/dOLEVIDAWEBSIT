import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe/checkout', { method: 'POST' });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '4rem' }}>
      <h1 style={{ fontSize: '3rem', color: '#c9a84c' }}>Dolce Vida</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Premium lifestyle brand</p>
      <button
        onClick={handleCheckout}
        style={{
          background: '#c9a84c',
          color: '#fff',
          border: 'none',
          padding: '1rem 2rem',
          fontSize: '1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Shop Now
      </button>
    </main>
  );
}
