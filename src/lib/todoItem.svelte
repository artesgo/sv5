<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TODO } from './todo.svelte';

	export let item: TODO;

	const dispatch = createEventDispatcher();
</script>

<div class="todo">
	<input type="checkbox" checked={item.done} on:click={() => dispatch('check', item.id)} />
	{item.name} : {item.description}
</div>
