import {derived} from "svelte/store";
import {connectedWallet} from "./connectedWallet";
import {CirclesData, Rpc} from "@circles-sdk/data";
import {Settings} from "$lib/settings";

export type SignupStatus = "NotSignedUp" | "SignedUp";

/**
 * Since a circles signup is permanent we can easily cache all results.
 */
export const isCirclesWalletCache: { [address: string]: SignupStatus } = {};

async function checkSignupStatus(address: string): Promise<SignupStatus> {
    const circlesData = new CirclesData(new Rpc(Settings.circlesRpcUrl));
    const isSignedUp = await circlesData.isSignedUp(address);
    if (isSignedUp) {
        return "SignedUp";
    }
    return "NotSignedUp";
}

/**
 * A derived store that tracks if a wallet (e.g. metamask) is connected and checks the v1 hub
 * to see if the wallet is a Circles wallet.
 */
export const isCirclesWallet = derived(connectedWallet, ($connectedWallet, set) => {
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
