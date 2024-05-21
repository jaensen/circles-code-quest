<script lang="ts">
    import PageFrame from "../../../components/PageFrame.svelte";
    import {onMount} from "svelte";
    import {redirectToHome} from "../../../utils/redirectToHome";
    import {connectedCirclesAvatar} from "../../../stores/connectedCirclesAvatar";
    import ActionButton from "../../../components/ActionButton.svelte";
    import {goto} from "$app/navigation";

    onMount(() => {
        redirectToHome(!$connectedCirclesAvatar);
    });

    let trustAddress = "";

    async function trust() {
        if (!$connectedCirclesAvatar) {
            throw new Error("Not a valid circles wallet");
        }

        await $connectedCirclesAvatar.trust(trustAddress);
        await goto("/contacts");
    }
</script>

<PageFrame title="Add contact">
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
                <ActionButton action={trust} disabled={!$connectedCirclesAvatar} doneStateDuration={5000}>
                    Trust
                </ActionButton>
            </div>
        </div>
    </div>
</PageFrame>
