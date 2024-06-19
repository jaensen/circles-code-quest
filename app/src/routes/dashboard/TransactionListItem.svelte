<script lang="ts">
    import type {TransactionHistoryRow} from "@circles-sdk/data";
    import {ethers} from "ethers";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";

    export let item: TransactionHistoryRow;

    const timestamp = new Date(item.timestamp * 1000);
    const dateTime = `${timestamp.toLocaleDateString()} - ${timestamp.toLocaleTimeString()}`;

    $: isIncoming = item.to === $connectedCirclesAvatar?.address.toLowerCase();
    $: isOutgoing = item.from === $connectedCirclesAvatar?.address.toLowerCase();
    $: isMinting = item.from === ethers.ZeroAddress && item.to === $connectedCirclesAvatar?.address.toLowerCase();
    $: sign = isOutgoing ? '-' : '+';
    $: contactAddress = isOutgoing ? item.to : item.from;
</script>

{#if isMinting}
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 rounded-full">
        <path d="M120.439 221.112C120.439 226.76 115.863 231.387 110.255 230.869C99.1658 229.845 88.2735 227.152 77.9494 222.863C64.4786 217.268 52.2387 209.067 41.9286 198.728C31.6185 188.39 23.4401 176.116 17.8603 162.607C12.2806 149.099 9.40869 134.621 9.40869 120C9.40869 105.379 12.2806 90.9007 17.8603 77.3924C23.4401 63.8842 31.6185 51.6103 41.9286 41.2715C52.2387 30.9328 64.4786 22.7316 77.9494 17.1363C88.2736 12.848 99.1658 10.1547 110.255 9.13048C115.863 8.61246 120.439 13.2396 120.439 18.8874V66.7359C91.1033 66.7361 67.3223 90.5833 67.3223 120C67.3223 149.417 91.1027 173.264 120.438 173.265V66.7361C149.773 66.7361 173.554 90.5833 173.554 120C173.554 149.417 149.774 173.264 120.439 173.265V221.112Z"
              fill="#38318B"/>
        <path d="M120.32 173.236L120.318 66.7637C149.72 66.7637 173.555 90.5984 173.555 120C173.555 149.401 149.721 173.236 120.32 173.236Z"
              fill="#DF6552"/>
    </svg>
{:else if isIncoming}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-12 h-12 rounded-full">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"/>
    </svg>
{:else if isOutgoing}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-12 h-12 rounded-full">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/>
    </svg>
{/if}
<div class="ml-4">
    <p class="text-sm">{contactAddress === ethers.ZeroAddress ? "Personal currency minted" : contactAddress}</p>
    <p class="text-xs text-gray-500">${dateTime}</p>
</div>
<div class="ml-auto">
    <p class="text-lg">{sign} {item.timeCircles}</p>
</div>