export interface TODO {
	id: number;
	name: string;
	description: string;
	done: boolean;
}

export function createTodo() {
	let todos = $state<TODO[]>([] as TODO[]);

	return {
		get todos() {
			return todos;
		},
		add(todo: TODO) {
			todos.push(todo);
		},
		markAsDone(id: number) {
			todos = todos.map((todo) => {
				if (todo.id === id) {
					todo.done = !todo.done;
				}
				return todo;
			});
		}
	};
}
