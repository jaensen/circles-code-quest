import {connectedWallet} from "../stores/connectedWallet";
import {goto} from "$app/navigation";

export function disconnectWallet() {
    // Clear the connected wallet state
    connectedWallet.set(undefined);
    goto("/connect-wallet");
}