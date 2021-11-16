import { db } from '../src/utils/init-firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import getStripe from './initializeStripe.ts';
// import { redirectToCheckout } from '@stripe/stripe-js';

/////////
/// OLD - NOT IN USE. See createCheckoutSession2
/////////

export async function createCheckoutSession() {
    // Create a new checkout session in the subcollection inside this users document
    const collectionRef = collection(db, 'users', currentUser.uid, 'checkout_sessions');
    const payload = {
        price: 'prod_KavNSA16uDPxOT',
        success_url: window.location.origin,
        cancel_url: window.location.origin
    };

    await addDoc(collectionRef, payload);

    // Wait for the document in the user's CheckoutSession collection to be created by the extension
    collectionRef.onSnapshot(async (snap) => {
        const { sessionId } = snap.data();

        if (sessionId) {
            // We have a session, let's redirect to Checkout
            // Init Stripe
            const stripe = await getStripe();
            console.log(stripe);
            stripe.redirectToCheckout({ sessionId });
        }
    });
}
