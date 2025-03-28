<script lang="ts">
    import "../app.css";
    import {connectedWallet} from "../stores/connectedWallet";
    import {CirclesData, CirclesRpc} from "@circles-sdk/data";
    import {Settings} from "$lib/settings";
    import {connectedCirclesAvatar} from "../stores/connectedCirclesAvatar";

    let balance: string | null = null;

    async function getBalance() {
        if (!$connectedWallet) {
            throw new Error("No connected wallet");
        }
        const circlesData = new CirclesData(new CirclesRpc(Settings.chainConfigs.chiado.circlesRpcUrl));
        balance = parseFloat(await circlesData.getTotalBalance($connectedWallet.address)).toFixed(2);
    }

    $: {
        if ($connectedCirclesAvatar) {
            getBalance();
        }
    }
</script>

<!-- Header -->
<header class="bg-blue-500 text-white p-4 flex items-center">

    {#if $connectedWallet}
        <img src="https://via.placeholder.com/50" alt="User Icon" class="w-12 h-12 rounded-full">
        <div class="ml-4">
            <h1 class="text-xl font-semibold">{$connectedWallet.address}</h1>
            {#if $connectedCirclesAvatar && balance}
                <p class="text-sm">Balance: {balance} Circles</p>
            {:else}
                <p class="text-sm">&nbsp;</p>
            {/if}
        </div>
    {:else}
        <img src="https://via.placeholder.com/50" alt="User Icon" class="w-12 h-12 rounded-full">
        <div class="ml-4">
            <h1 class="text-xl font-semibold mr-2">Circles</h1>
        </div>
    {/if}
</header>

<slot></slot>

<!-- Quick Access Bar -->
{#if $connectedCirclesAvatar}
    <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div class="flex justify-around p-3">
            <a href="/dashboard" class="btn bg-blue-500 text-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>
            </a>
            <a href="/send" class="btn bg-blue-500 text-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
                </svg>
            </a>
            <a href="/contacts" class="bg-blue-500 text-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </a>
            <a href="/settings" class="bg-blue-500 text-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </a>
        </div>
    </nav>
{/if}