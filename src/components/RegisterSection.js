import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { doc, setDoc, collection, addDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/init-firebase';
import getStripe from '../../stripe/initializeStripe.ts';
import usePremiumStatus from '../../stripe/usePremiumStatus';

export default function Register() {
    const { currentUser, register, login, logInWithGoogle, logInWithTwitter, logout } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isSigningUp, setIsSigningUp] = useState(true);

    const userIsPremium = usePremiumStatus(currentUser);

    const recordNewUser = async (user) => {
        // Tutorial https://www.youtube.com/watch?v=YpuyxBfYRT8&ab_channel=Logicism
        const docRef = doc(db, 'users', user.user.uid);
        const payload = {
            uid: user.user.uid,
            email: user.user.email,
            displayName: user.user.displayName,
            providerId: user.user.providerData[0].providerId,
            photoURL: user.user.photoURL
        };
        await setDoc(docRef, payload);
    };

    const createCheckoutSession2 = async () => {
        // Create a new checkout session in the subcollection inside this users document
        const collectionRef = collection(db, 'users', currentUser.uid, 'checkout_sessions');
        const payload = {
            price: 'price_1JvjWLChfN4TVWbYw2LdDXZZ',
            success_url: 'http://localhost:3000/register/',
            cancel_url: window.location.origin
        };
        await addDoc(collectionRef, payload);

        // Get document from collectionRef
        const docRef = await addDoc(collectionRef, payload);

        const docSnap = onSnapshot(docRef, (doc) => {
            // Get sessionId from newly created document inside user's checkout_sessions collection
            const { sessionId } = doc.data();

            const directToStripe = async () => {
                if (sessionId) {
                    // If sessionId is returned from Stripe, redirect to Stripe Checkout
                    const stripe = await getStripe();
                    stripe.redirectToCheckout({ sessionId });
                }
            };
            directToStripe(sessionId);
        });
    };

    return (
        <>
            <div className="min-h-full flex">
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            {!currentUser ? (
                                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{isSigningUp ? `Join` : `Log In to`} Tara Lynn Yoga</h2>
                            ) : (
                                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">My profile</h2>
                            )}
                        </div>

                        <div className="mt-8">
                            {!currentUser && (
                                <div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{isSigningUp ? `Sign up` : `Log in`} with</p>
                                        <div className="mt-1 grid grid-cols-2 gap-3">
                                            <div>
                                                <a
                                                    onClick={() => {
                                                        logInWithGoogle()
                                                            .then((user) => {
                                                                console.log(user);
                                                                // Record new user to Firestore
                                                                recordNewUser(user);
                                                                router.push('/register');
                                                            })
                                                            .catch((error) => console.log(error));
                                                    }}
                                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                                >
                                                    <span className="sr-only">Sign in with Google</span>
                                                    <svg
                                                        className="w-5 h-5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                                            <path
                                                                fill="#4285F4"
                                                                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                                                            />
                                                            <path
                                                                fill="#34A853"
                                                                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                                                            />
                                                            <path
                                                                fill="#FBBC05"
                                                                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                                                            />
                                                            <path
                                                                fill="#EA4335"
                                                                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                                                            />
                                                        </g>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div>
                                                <a
                                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => {
                                                        logInWithTwitter()
                                                            .then((user) => {
                                                                console.log(user);
                                                                // Record new user to Firestore
                                                                recordNewUser(user);
                                                                router.push('/register');
                                                            })
                                                            .catch((error) => console.log(error));
                                                    }}
                                                >
                                                    <span className="sr-only">Sign in with Twitter</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="#0EA5E9" viewBox="0 0 20 20">
                                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6">
                                {!currentUser ? (
                                    <form
                                        action="#"
                                        method="POST"
                                        className="space-y-6"
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            if (isSigningUp === true) {
                                                register(email, password)
                                                    .then((response) => {
                                                        console.log(response);
                                                        router.push('/register');
                                                    })
                                                    .catch((error) => alert(`Credentials not accepted: ` + error.message));
                                            } else {
                                                login(email, password)
                                                    .then((response) => {
                                                        console.log(response);
                                                        router.push('/register');
                                                    })
                                                    .catch((error) => alert(`Credentials not accepted: ` + error.message));
                                            }
                                        }}
                                    >
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div> */}
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                            >
                                                {isSigningUp ? `Sign Up` : `Log In`}
                                            </button>
                                            <div className="flex justify-center">
                                                <p onClick={() => setIsSigningUp(!isSigningUp)} className="mt-3 text-sm text-gray-600 cursor-pointer">
                                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        {isSigningUp ? `Log In` : `Sign Up`}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="block">
                                        <button
                                            type="button"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                                            onClick={(user) => {
                                                createCheckoutSession2(currentUser.uid);
                                            }}
                                        >
                                            Monthly Subscription Test - $39/mo
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                logout();
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                                {userIsPremium && <p>Confirmed! User is Premium</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    ></img>
                </div>
            </div>
        </>
    );
}
