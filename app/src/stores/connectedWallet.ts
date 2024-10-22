import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import {BrowserProvider} from "ethers";
import type {AbstractSigner} from "ethers";

export interface ConnectedWallet {
    readonly provider: BrowserProvider;
    readonly signer: AbstractSigner;
    readonly address: string;
}

/**
 * Svelte store to store a connected wallet provider like metamask
 */
export const connectedWallet: Writable<ConnectedWallet | undefined> = writable<ConnectedWallet | undefined>();
