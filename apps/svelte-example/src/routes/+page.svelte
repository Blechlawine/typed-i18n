<script lang="ts">
    import { i18n, locale, locales } from "../locale";
</script>

<h1>Welcome to SvelteKit</h1>
<h2>{$i18n().hello()}</h2>
<select bind:value={$locale}>
    {#each locales as l}
        <option value={l}>{l}</option>
    {/each}
</select>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
