<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {CirclesData, CirclesQuery, CirclesRpc} from "@circles-sdk/data";
    import {Settings} from "$lib/settings";
    import {connectedWallet} from "../../stores/connectedWallet";
    import type {TransactionHistoryRow} from "@circles-sdk/data/dist/rows/transactionHistoryRow";
    import {ethers} from "ethers";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";
    import TransactionListItem from "./TransactionListItem.svelte";

    onMount(() => {
        redirectToHome(!$connectedCirclesAvatar);
    });

    let items: TransactionHistoryRow[] = [];
    let query: CirclesQuery<TransactionHistoryRow> | null = null;

    $: {
        if (!$connectedWallet || !$connectedCirclesAvatar) {
            items = [];
            query = null;
        } else {
            const circlesData = new CirclesData(new CirclesRpc(Settings.chainConfigs.chiado.circlesRpcUrl));
            query = circlesData.getTransactionHistory($connectedWallet.address, 25);
        }

        if (query && items.length === 0) {
            query.queryNextPage().then(() => {
                if (!query?.currentPage?.results) {
                    return;
                }
                items = query.currentPage.results;
            });
        }
    }

    async function handleMintCircles() {
        if (!$connectedWallet?.signer) {
            throw new Error("No connected wallet");
        }

        const tx = $connectedCirclesAvatar?.personalMint();
        console.log(tx);
    }
</script>

<PageFrame title="Recent transactions">
    <div class="flex justify-between items-center mb-4">
        <button class="bg-blue-500 text-white py-2 px-4 rounded-md" on:click={handleMintCircles}>
            Mint Circles
        </button>
    </div>
    <List {items} listItemComponent={TransactionListItem}/>
</PageFrame>
