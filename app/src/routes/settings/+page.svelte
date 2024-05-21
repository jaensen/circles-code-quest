<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import {onMount} from "svelte";
    import {isWalletConnected} from "../../stores/isWalletConnected";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {disconnectWallet} from "../../utils/disconnectWallet";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";

    onMount(() => {
        redirectToHome(!$isWalletConnected);
    });
</script>

<PageFrame title="Settings">
    <div class="space-y-6">
        <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-medium">Profile</h2>
            <div class="mt-3 space-y-2">
                <div>
                    <label for="circlesAddress" class="block text-sm font-medium text-gray-700">Circles address</label>
                    <input type="text" id="circlesAddress"
                           readonly
                           value={$connectedCirclesAvatar?.address}
                           class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                           placeholder="0x.....">
                </div>
                <div>
                    <label for="tokenAddress" class="block text-sm font-medium text-gray-700">Token address</label>
                    <input type="text" id="tokenAddress" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                           readonly
                           value={$connectedCirclesAvatar?.avatarInfo?.tokenId}
                           placeholder="0x.....">
                </div>
            </div>
        </div>

        <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-medium">Wallet</h2>
            <div class="mt-3 space-y-2">
                <div>
                    <button class="bg-red-500 text-white py-2 px-6 rounded-md" on:click={() => {
                        disconnectWallet();
                     }}>
                        Connect different wallet
                    </button>
                </div>
            </div>
        </div>
    </div>
</PageFrame>
