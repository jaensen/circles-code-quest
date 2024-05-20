import {derived} from "svelte/store";
import type {Readable} from "svelte/store";
import {connectedWallet} from "./connectedWallet";
import type {ConnectedWallet} from "./connectedWallet";

/**
 * Derived store that is 'true' if a wallet is connected and 'false' if it isn't
 */
export const isWalletConnected: Readable<boolean> = derived(connectedWallet, ($connectedWallet: ConnectedWallet, set) => set(!!$connectedWallet));