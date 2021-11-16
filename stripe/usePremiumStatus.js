import { useState, useEffect } from 'react';
import isUserPremium from './isUserPremium';

export default function usePremiumStatus(currentUser) {
    const [premiumStatus, setPremiumStatus] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const checkPremiumStatus = async function () {
                setPremiumStatus(await isUserPremium());
            };
            checkPremiumStatus();
        }
    }, [currentUser]);

    return premiumStatus;
}
