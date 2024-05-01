<script lang="ts">
    import DarkMode from '../assets/dark_mode.svg?raw'
    import LightMode from '../assets/light_mode.svg?raw'

    let darkMode: boolean = true

    function handleButton() {
        if (darkMode) {
            document.documentElement.classList.remove('dark')
            darkMode = false
        } else {
            document.documentElement.classList.add('dark')
            darkMode = true
        }
    }
</script>

<button class="fill-black dark:fill-white {$$props.class ?? ''}" on:click={handleButton}>
    {#if darkMode}
        {@html LightMode}
    {:else}
        {@html DarkMode}
    {/if}
</button>