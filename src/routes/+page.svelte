<script lang="ts">
	import Calendar from '$lib/calendar.svelte';
	import { createTodo } from '$lib/todo.svelte';
	import TodoItem from '$lib/todoItem.svelte';

	let who = $state('');
	let description = $state('');
	let date = $state(new Date());

	const todoList = createTodo();

	// derived creates another set of data based off of the original set of data
	const done = $derived(todoList.todos.filter((todo) => todo.done));
	const notDone = $derived(todoList.todos.filter((todo) => !todo.done));

	const whoDunIt = $derived(who + ': ' + description);

	let id = 0;
	function add() {
		todoList.add({
			id,
			name: who,
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
	<label>
		Who:
		<input type="text" bind:value={who} />
	</label>
	<label>
		Task:
		<input type="text" bind:value={description} />
	</label>

	<Calendar on:date={(event) => (date = event.detail)} closeOnSelection={true}></Calendar>
	<div>Due: {date}</div>
	<button on:click={add}>Add Todo</button>
</div>

<Calendar on:date={(event) => (date = event.detail)} closeOnSelection={false}></Calendar>

{whoDunIt}

<!-- TODO: work with local storage until we have a proper setup to store the TODO's into database -->
<h2>Unfinished Tasks</h2>
<!--                   (item.id) here tracks which item was here so the 
	application can know when it gets removed or updated -->
{#each notDone as item (item.id)}
	<TodoItem {item} on:check={(event) => markAsDone(event.detail)} />
{/each}

<h2>Done Tasks</h2>
{#each done as item (item.id)}
	<TodoItem {item} on:check={(event) => markAsDone(event.detail)} />
{/each}
