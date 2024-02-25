export interface TODO {
	id: number;
	description: string;
	done: boolean;
}

export function createTodo() {
	let todos = $state<TODO[]>([] as TODO[]);
	const rawTodo: TODO[] = [];
	//constant

	return {
		get todos() {
			// using runes array
			return todos;
		},
		get raw() {
			// using regular javascript array
			return rawTodo;
		},
		add(todo: TODO) {
			todos.push(todo);
			rawTodo.push(todo);
		},
		markAsDone(id: number) {
			todos = todos.map((todo) => {
				if (todo.id === id) {
					todo.done != todo.done;
				}
				return todo;
			});
		}
	};
}
