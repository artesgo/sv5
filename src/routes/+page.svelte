<script lang="ts">
	import { createTodo } from '$lib/todo.svelte';
	import TodoItem from '$lib/todoItem.svelte';

	let description = '';

	const todoList = createTodo();

	const done = $derived(todoList.todos.filter((todo) => todo.done));
	const notDone = $derived(todoList.todos.filter((todo) => !todo.done));

	let id = 0;
	function add() {
		todoList.add({
			id,
			description,
			done: false
		});
		id++;
	}

	function markAsDone(_id: number) {
		todoList.markAsDone(_id);
	}
</script>

<div class="controls">
	<input type="text" bind:value={description} />
	<button on:click={add}>Add Todo</button>
</div>

{#each todoList.todos as item}
	<TodoItem {item} on:check={(event) => markAsDone(event.detail)} />
{/each}

<h2>Done Tasks</h2>
{#each done as item}
	<TodoItem {item} on:check={(event) => markAsDone(event.detail)} />
{/each}

<h2>Unfinished Tasks</h2>
{#each notDone as item}
	<TodoItem {item} on:check={(event) => markAsDone(event.detail)} />
{/each}
