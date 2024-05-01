<script lang="ts">
    export let colorVar: string

    let color = getComputedStyle(document.body).getPropertyValue(colorVar) ?? '#00FF00'

    function handleButton() {
        const hue = Math.floor(Math.random() * 361);
        color = `hsl(${hue}, 100%, 60%)`;
    }
</script>

<button on:click={handleButton} class="transition-colors" style="{colorVar}: {color}">
    <slot/>
</button>