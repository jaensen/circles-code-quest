import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

export interface ConnectedWallet {
    readonly address: string;
}

/**
 * Svelte store to store a connected wallet provider like metamask
 */
export const connectedWallet: Writable<ConnectedWallet|undefined> = writable<ConnectedWallet|undefined>();
