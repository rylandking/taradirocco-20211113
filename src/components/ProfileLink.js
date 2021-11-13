import * as React from 'react';
import Link from '@stackbit/components/dist/utils/link';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileLink() {
    const { currentUser } = useAuth();

    return (
        <>
            {currentUser && (
                <Link href="/register" className="sb-component sb-component-block link sb-component-link lg:pl-6 cursor-pointer">
                    {!currentUser.photoURL ? (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <img className="inline-block h-10 w-10 rounded-full" src={currentUser.photoURL} alt={currentUser.displayName}></img>
                    )}
                    <div className="lg:hidden">
                        <p className="ml-2">View profile</p>
                    </div>
                </Link>
            )}
        </>
    );
}
