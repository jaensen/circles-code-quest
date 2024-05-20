<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {isCirclesWallet} from "../../stores/isCirclesWallet";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {CirclesData, CirclesQuery, Rpc} from "@circles-sdk/data";
    import {Settings} from "$lib/settings";
    import {connectedWallet} from "../../stores/connectedWallet";
    import type {TransactionHistoryRow} from "@circles-sdk/data/dist/rows/transactionHistoryRow";
    import {ethers} from "ethers";

    onMount(() => {
        redirectToHome(!$isCirclesWallet);
    });

    let items: TransactionHistoryRow[] = [];
    let query: CirclesQuery<TransactionHistoryRow> | null = null;

    $: {
        if (!$connectedWallet || !$isCirclesWallet) {
            items = [];
            query = null;
        } else {
            const circlesData = new CirclesData(new Rpc(Settings.chainConfigs.chiado.circlesRpcUrl));
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

    function transactionTemplate(transaction: TransactionHistoryRow) {
        console.log(`transaction.timestamp: ${transaction.timestamp}`);
        const dateString = new Date(transaction.timestamp * 1000).toLocaleDateString();
        const timeString = new Date(transaction.timestamp * 1000).toLocaleTimeString();
        const dateTime = `${dateString} - ${timeString}`;
        if (transaction.from == $connectedWallet?.address) {
            // This wallet is the sender
            return `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 rounded-full">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                <div class="ml-4">
                    <p class="text-sm">${transaction.to}</p>
                    <p class="text-xs text-gray-500">${dateTime}</p>
                </div>
                <div class="ml-auto">
                    <p class="text-lg">- ${transaction.value}</p>
                </div>
        `;
        } else {
            // This wallet is the receiver
            if (transaction.from === ethers.ZeroAddress) {
                return `
                    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 rounded-full">
                        <path d="M120.439 221.112C120.439 226.76 115.863 231.387 110.255 230.869C99.1658 229.845 88.2735 227.152 77.9494 222.863C64.4786 217.268 52.2387 209.067 41.9286 198.728C31.6185 188.39 23.4401 176.116 17.8603 162.607C12.2806 149.099 9.40869 134.621 9.40869 120C9.40869 105.379 12.2806 90.9007 17.8603 77.3924C23.4401 63.8842 31.6185 51.6103 41.9286 41.2715C52.2387 30.9328 64.4786 22.7316 77.9494 17.1363C88.2736 12.848 99.1658 10.1547 110.255 9.13048C115.863 8.61246 120.439 13.2396 120.439 18.8874V66.7359C91.1033 66.7361 67.3223 90.5833 67.3223 120C67.3223 149.417 91.1027 173.264 120.438 173.265V66.7361C149.773 66.7361 173.554 90.5833 173.554 120C173.554 149.417 149.774 173.264 120.439 173.265V221.112Z" fill="#38318B"/>
                        <path d="M120.32 173.236L120.318 66.7637C149.72 66.7637 173.555 90.5984 173.555 120C173.555 149.401 149.721 173.236 120.32 173.236Z" fill="#DF6552"/>
                    </svg>
                    <div class="ml-4">
                        <p class="text-sm">Minted personal Circles</p>
                        <p class="text-xs text-gray-500">${dateTime}</p>
                    </div>
                    <div class="ml-auto">
                        <p class="text-lg">+ ${transaction.value}</p>
                    </div>
                `;
            } else {
                return `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 rounded-full">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                    </svg>
                    <div class="ml-4">
                        <p class="text-sm">${transaction.from}</p>
                        <p class="text-xs text-gray-500">${dateTime}</p>
                    </div>
                    <div class="ml-auto">
                        <p class="text-lg">+ ${transaction.value}</p>
                    </div>
                `;
            }
        }
    }
</script>

<PageFrame title="Recent transactions">
    <List {items} template={transactionTemplate}/>
</PageFrame>
