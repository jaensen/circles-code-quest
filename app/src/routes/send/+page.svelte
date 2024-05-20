<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import {onMount} from "svelte";
    import {isCirclesWallet} from "../../stores/isCirclesWallet";
    import {redirectToHome} from "../../utils/redirectToHome";
    import Waiting from "../../components/Waiting.svelte";
    import {Sdk} from "@circles-sdk/sdk";
    import {Settings} from "$lib/settings";
    import {connectedWallet} from "../../stores/connectedWallet";

    onMount(() => {
        redirectToHome(!$isCirclesWallet);
    });

    let recipient: string = "";
    let isWaiting = false;

    const send = async () => {
        isWaiting = true;

        if (!$connectedWallet?.signer) {
            throw new Error('Signer not found');
        }

        const sdk = new Sdk(Settings.chainConfigs.chiado, $connectedWallet.signer);

        // Send logic here
    };
</script>

<!-- Main Section -->
<PageFrame title="Send Funds">
    {#if !isWaiting}
        <!-- Recipient Address -->
        <div class="relative">
            <label for="recipient" class="block text-sm font-medium text-gray-700">Recipient Address</label>
            <div class="flex">
                <input bind:value={recipient}
                       type="text" id="recipient" class="mt-1 block w-full p-2 border border-gray-300 rounded-l-md"
                       placeholder="0x123...">
                <button id="search-recipient" class="bg-blue-500 text-white p-2 rounded-r-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21 21l-4.35-4.35m1.45-5.65a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Amount -->
        <div>
            <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" id="amount" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                   placeholder="0.00">
        </div>

        <!-- Max Amount and Set Max Button -->
        <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">Max Amount: <span id="max-amount">$1234.56</span></p>
            <button id="set-max" class="bg-blue-500 text-white px-3 py-2 rounded-md">Set Max</button>
        </div>

        <!-- Send Button -->
        <button class="bg-green-500 text-white w-full py-2 rounded-md" on:click={()=>send()}>Send</button>
    {:else}
        <Waiting title="Sending Funds" description="Please wait until the transaction is settled."/>
    {/if}
</PageFrame>
