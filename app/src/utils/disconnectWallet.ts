import {connectedWallet} from "../stores/connectedWallet";
import {goto} from "$app/navigation";

export async function disconnectWallet() {
    // Clear the connected wallet state
    connectedWallet.set(undefined);
    await goto("/connect-wallet");
}