<script lang="ts">
	import { createEventDispatcher, untrack } from 'svelte';

	let year = $state(new Date().getFullYear());
	let month = $state(new Date().getMonth() + 1);
	// for variables you create, you should give them a sensible
	let day = $state(1);
	let open = $state(false);

	// TODO: export let closeOnSelection;
	let { closeOnSelection } = $props();

	// get the day of the week for the first day of the month
	// getDayOfWeek()
	// month - 1 is because the Date(), is 0 based system, january is 0, december is 11
	const dayOfWeek = $derived(new Date(year, month - 1, 1).getDay());

	// new Date (y, m, 0) gives us the last day of the month
	// effectively giving us the number of days in the month
	// month is not -1 here because day 0, would refer to the previous month
	const daysInMonth = $derived(new Date(year, month, 0).getDate());

	// we convert $state to $derived here so that it can be based off of
	// the 2 variables required to fill our calendar
	// dayOfWeek lets us add the "negative entries"
	let days = $derived(
		new Array(daysInMonth + dayOfWeek).fill(0).map((_, index) => index + 1 - dayOfWeek)
	);

	let isLeapYear = $derived(year % 4 === 0);

	const dispatch = createEventDispatcher();
	const daysOfTheWeek = $state([
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]);

	// TODO: keyboard navigate the calendar component
	function navigate(event: Event) {
		console.log(event);
		// control calendar via arrow keys
	}

	let init = false;
	$effect(() => {
		// rebind the signals that you do want to track
		const d = day;
		if (init) {
			untrack(() => {
				change(year, month, d);
			});
		}
		init = true;
	});

	function change(y: number, m: number, d: number) {
		dispatch('date', new Date(y, m - 1, d));
		if (closeOnSelection) {
			toggle();
		}
	}

	function ok() {
		dispatch('date', new Date(year, month - 1, day));
		toggle();
	}

	// question: i want the OK button to also call this
	// the OK button calls the change()
	function toggle() {
		untrack(() => {
			open = !open;
		});
	}
</script>

<button on:click={toggle}>{year}-{month}-{day}</button>

<!-- TODO: account for previous month from January -->
<!-- TODO: account for last day of month when changing months -->
<div class="relative">
	<dialog {open}>
		<button on:click={() => month--}>Previous</button>
		{year}
		{month}
		<button on:click={() => month++}>Next</button>
		<section class="calendar">
			{#each daysOfTheWeek as week}
				<div class="week">{week}</div>
			{/each}
			{#each days as d, i}
				{@const currentMonth = d > 0}
				{@const selected = day === d}
				<!-- calculate what the weekend is using this const -->
				<!-- i % 7 = 0 means it's divisible by 7, which means it's a sunday -->
				<!-- i % 7 = 6 means divided 7 and remainder of 6, means it's a saturday -->
				{@const weekend = currentMonth && (i % 7 === 0 || i % 7 === 6)}
				<div class:day={currentMonth} class:weekend class:selected>
					{#if currentMonth}
						<button on:keydown={navigate} on:click={() => (day = d)}>{d}</button>
					{/if}
				</div>
			{/each}
		</section>

		<button on:click={ok}>OK</button>
	</dialog>
</div>

<!-- add  lang="scss" to the style tag -->
<style lang="scss">
	/** npm i sass -D */
	/* TODO: Andy, find out what CSS Plus is */
	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		font-family: cursive;
	}

	.day,
	.week {
		border: 1px solid black;
		border-radius: 10px;
		margin: 2px;
	}

	.day:hover {
		background: #fc0;
	}

	.day button {
		border: none;
		background: none;
		height: 100%;
		width: 100%;
	}

	.week {
		background: #333;
		color: #fc0;
		display: flex;
		justify-content: space-around;
		margin-bottom: 2px;
	}

	.weekend {
		background: #ccc;
	}

	.day.selected {
		background: #cf0;
	}

	.relative {
		position: relative;
	}

	dialog {
		border: 1px solid black;
		border-radius: 4px;
		margin-top: 100px;

		position: absolute;
		left: 0;
		/* TODO: how to position html dialog boxes */
	}
</style>
