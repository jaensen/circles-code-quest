import {derived} from "svelte/store";
import {connectedWallet} from "./connectedWallet";
import {CirclesData, CirclesRpc} from "@circles-sdk/data";
import {Settings} from "$lib/settings";

export type SignupStatus = "NotSignedUp" | "SignedUp";

/**
 * Since a circles signup is permanent we can easily cache all results.
 */
export const isCirclesWalletCache: { [address: string]: SignupStatus } = {};

async function checkSignupStatus(address: string): Promise<SignupStatus> {
    const circlesData = new CirclesData(new CirclesRpc(Settings.chainConfigs.chiado.circlesRpcUrl));
    const avatarInfo = await circlesData.getAvatarInfo(address);
    if (avatarInfo) {
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
