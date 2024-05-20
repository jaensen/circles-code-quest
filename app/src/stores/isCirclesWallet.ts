import {derived} from "svelte/store";
import {connectedWallet} from "./connectedWallet";
import type {ConnectedWallet} from "./connectedWallet";

export type SignupStatus = "NotSignedUp" | "SignedUp";

/**
 * Since a circles signup is permanent we can easily cache all results.
 */
export const isCirclesWalletCache: { [address: string]: SignupStatus } = {};

async function checkSignupStatus(address: string): Promise<SignupStatus> {
    // TODO: Implement
    return "NotSignedUp";
}

/**
 * A derived store that tracks if a wallet (e.g. metamask) is connected and checks the v1 hub
 * to see if the wallet is a Circles wallet.
 */
export const isCirclesWallet = derived(connectedWallet, ($connectedWallet: ConnectedWallet, set) => {
    if (!$connectedWallet) {
        set(false);
        return;
    }

    const cacheLookup = isCirclesWalletCache[$connectedWallet.address];
    if (cacheLookup) {
        set(true);
        return;
    }

    checkSignupStatus($connectedWallet.address)
        .then(signupState => {
            if (signupState != "SignedUp") {
                set(false);
                return;
            }
            isCirclesWalletCache[$connectedWallet.address] = signupState;
            set(true);
        })
        .catch(e => {
            set(false);
        });
});
