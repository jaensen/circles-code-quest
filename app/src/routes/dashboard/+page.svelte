<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {CirclesQuery} from "@circles-sdk/data";
    import {connectedWallet} from "../../stores/connectedWallet";
    import type {TransactionHistoryRow} from "@circles-sdk/data/dist/rows/transactionHistoryRow";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";
    import TransactionListItem from "./TransactionListItem.svelte";
    import ActionButton from "../../components/ActionButton.svelte";

    onMount(() => {
        if (redirectToHome(!$connectedCirclesAvatar)) {
            return;
        }

        initializeQuery();

        return $connectedCirclesAvatar?.events.subscribe(async value => {
            if (value.name === "HubTransfer") {
                console.log("HubTransfer event received:", value.data);
                await initializeQuery()
            } else if (value.name === "Transfer") {
                console.log("Transfer event received", value.data);
                await initializeQuery();
            }
        });
    });

    let items: TransactionHistoryRow[] = [];
    let query: CirclesQuery<TransactionHistoryRow> | null = null;

    async function initializeQuery() {
        if (!$connectedCirclesAvatar) {
            return;
        }

        query = await $connectedCirclesAvatar.getTransactionHistory(25);
        items = [];
        setTimeout(() => items = query?.currentPage?.results ?? [], 0);
    }

    async function handleMintCircles() {
        if (!$connectedWallet?.signer) {
            throw new Error("No connected wallet");
        }

        return $connectedCirclesAvatar?.personalMint();
    }
</script>

<PageFrame title="Recent transactions">
    <div class="flex justify-between items-center mb-4">
        <ActionButton action={handleMintCircles} disabled={!$connectedCirclesAvatar} doneStateDuration={5000}>
            Mint Circles
        </ActionButton>
    </div>
    <List {items} listItemComponent={TransactionListItem}/>
</PageFrame>
