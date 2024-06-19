import {derived, type Readable} from "svelte/store";
import {connectedWallet} from "./connectedWallet";
import {type AvatarInterface, Sdk} from "@circles-sdk/sdk";
import {Settings} from "$lib/settings";

export let setConnectedCirclesAvatar: (avatar: AvatarInterface | undefined) => void;

/**
 * A store derived from the connectedWallet store that contains an instance of the AvatarInterface
 * if the wallet is connected and signed up at Circles. Otherwise, it is undefined.
 */
export const connectedCirclesAvatar: Readable<AvatarInterface | undefined> = derived(connectedWallet, ($connectedWallet, set) => {
    setConnectedCirclesAvatar = set;
    if (!$connectedWallet) {
        set(undefined);
        return;
    }

    const sdk = new Sdk(Settings.chainConfigs.gnosis, $connectedWallet.signer);
    sdk.getAvatar($connectedWallet.address)
        .then(avatar => set(avatar))
        .catch(reason => {
            console.warn(`Failed to get avatar for address ${$connectedWallet.address}. Reason: `, reason);
            set(undefined);
        });
});