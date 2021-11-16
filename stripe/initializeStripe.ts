import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Stripe | null;

const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe('pk_test_51JvidzChfN4TVWbYDYy9kYqAj0lDNQswpsl1YyN1Fe68ipaiZmzOtxsuP3iySrGvjkk304Ot1H8g2LPsYVQtVFJG00TPZBEvyO');
    }
    return stripePromise;
};

export default initializeStripe;
