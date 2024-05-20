<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {isCirclesWallet} from "../../stores/isCirclesWallet";
    import {redirectToHome} from "../../utils/redirectToHome";

    onMount(() => {
        redirectToHome(!$isCirclesWallet);
    });

    const items = [
        { description: 'Transaction 1 - $50.00', date: '2024-05-01' },
        { description: 'Transaction 2 - $20.00', date: '2024-05-02' },
        { description: 'Transaction 3 - $100.00', date: '2024-05-03' }
    ];

    function transactionTemplate(transaction) {
        return `
            <div class="ml-4">
                <p class="text-sm">${transaction.description}</p>
                <p class="text-xs text-gray-500">Date: ${transaction.date}</p>
            </div>
        `;
    }
</script>

<PageFrame title="Recent transactions">
    <List {items} template={transactionTemplate} />
</PageFrame>
