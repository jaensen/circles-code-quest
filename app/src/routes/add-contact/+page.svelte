<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import {onMount} from "svelte";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {Sdk} from "@circles-sdk/sdk";
    import {Settings} from "$lib/settings";
    import {connectedWallet} from "../../stores/connectedWallet";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";

    onMount(() => {
        redirectToHome(!$connectedCirclesAvatar);
    });

    let trustAddress = "";

    async function trust() {
        if (!$connectedCirclesAvatar) {
            throw new Error("Not a valid circles wallet");
        }

        const txReceipt = await $connectedCirclesAvatar.trust(trustAddress);
        console.log(txReceipt);
    }
</script>

<PageFrame title="Settings">
    <div class="space-y-6">
        <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-medium">Trust someone</h2>
            <div class="mt-3 space-y-2">
                <div>
                    <label for="circlesAddress" class="block text-sm font-medium text-gray-700">Circles address</label>
                    <input bind:value={trustAddress}
                           type="text" id="circlesAddress"
                           class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                           placeholder="0x.....">
                </div>
                <button class="bg-red-500 text-white py-2 px-6 rounded-md" on:click={() => {
                        trust();
                     }}>
                    Trust
                </button>
            </div>
        </div>
    </div>
</PageFrame>
