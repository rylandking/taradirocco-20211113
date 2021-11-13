import * as React from 'react';
import Link from '@stackbit/components/dist/utils/link';
import { useAuth } from '../contexts/AuthContext';

export default function NavAuthLink() {
    const { logout } = useAuth();

    return (
        <Link
            className="sb-component sb-component-block link sb-component-link lg:pl-6 cursor-pointer"
            onClick={async (e) => {
                e.preventDefault();
                logout();
            }}
        >
            <span>Log out</span>
        </Link>
    );
}
