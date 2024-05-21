<script lang="ts">
    import PageFrame from "../../../components/PageFrame.svelte";
    import { onMount } from "svelte";
    import { redirectToHome } from "../../../utils/redirectToHome";
    import { ethers } from "ethers";
    import { connectedCirclesAvatar } from "../../../stores/connectedCirclesAvatar";
    import { page } from "$app/stores";
    import ActionButton from "../../../components/ActionButton.svelte";
    import { goto } from "$app/navigation";

    onMount(() => {
        redirectToHome(!$connectedCirclesAvatar);
    });

    let recipient: string = $page.params.to ?? "";
    let valueString: string = "";
    let recipientIsValid = false;
    let maxAmountString: string = "-"; // Todo: add current balance as initial state
    let maxAmount: bigint = BigInt(0);

    $: {
        recipientIsValid = ethers.isAddress(recipient);
        if (recipientIsValid) {
            maxAmountString = "loading ...";
            determineMaxFlow().then((maxFlow) => {
                maxAmount = maxFlow;
                maxAmountString = ethers.formatEther(maxFlow);
            });
        }
    }

    const determineMaxFlow = async () => {
        if (!$connectedCirclesAvatar) {
            return BigInt(0);
        }

        return await $connectedCirclesAvatar.getMaxTransferableAmount(recipient);
    };

    const send = async () => {
        if (!$connectedCirclesAvatar) {
            throw new Error('Not a Circles avatar');
        }
        if (!recipientIsValid) {
            throw new Error('Recipient is not a valid address');
        }

        const receipt = await $connectedCirclesAvatar.transfer(recipient, ethers.parseEther(valueString.toString()));
        console.log(receipt);
        await goto("/dashboard");
    };

    function setMax() {
        valueString = ethers.formatEther(maxAmount.toString());
    }
</script>

<!-- Main Section -->
<PageFrame title="Send Funds">

    <!-- Recipient Address -->
    <div class="relative">
        <label for="recipient" class="block text-sm font-medium text-gray-700">Recipient Address</label>
        <div class="flex">
            <input bind:value={recipient}
                   type="text" id="recipient" class="mt-1 block w-full p-2 border border-gray-300 rounded-l-md"
                   placeholder="0x123...">
            <button id="search-recipient" class="bg-blue-500 text-white p-2 rounded-r-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 21l-4.35-4.35m1.45-5.65a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- Amount -->
    <div class="mt-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <div class="flex">
            <input bind:value={valueString} type="number" id="amount"
                   class="mt-1 block w-full p-2 border border-gray-300 rounded-l-md"
                   placeholder="0.00">
            <button id="set-max" class="bg-blue-500 text-white p-2 rounded-r-md flex items-center justify-center" on:click={() => setMax()}>
                Set Max
            </button>
        </div>
    </div>

    <!-- Max Amount Display -->
    <div class="flex items-center justify-between mt-2">
        <p class="text-sm text-gray-500">Max Amount: <span id="max-amount">{maxAmountString}</span></p>
    </div>

    <!-- Send Button -->
    <div class="mt-4">
        <ActionButton action={send} disabled={!$connectedCirclesAvatar || !recipientIsValid}>
            Send
        </ActionButton>
    </div>
</PageFrame>
