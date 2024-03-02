<script lang="ts">
	let year = $state(new Date().getFullYear());
	let month = $state(new Date().getMonth() + 1);
	let days = $state(new Array(30).fill(0).map((_, index) => index + 1));

	let isLeapYear = $derived(year % 4 === 0);
</script>

{year}
{month}
Is this a leap year? {isLeapYear}

<!-- TODO:
    Show the correct number of days in the month, including leap years
    Which month is 30 days vs 31 days
-->

<section class="calendar">
	{#each days as day}
		<div class="day">{day}</div>
	{/each}
</section>

<style>
	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.day {
		border: 1px solid black;
		border-radius: 2px;
	}
</style>
