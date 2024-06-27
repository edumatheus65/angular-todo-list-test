import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo.types';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
    private _counterTodosDone: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    get todos$(): Observable<Todo[]> {
        return this._todos.asObservable();
    }

    get counterTodosDone$(): Observable<number> {
        return this._counterTodosDone.asObservable();
    }

    addTodo(text: string): void {
        const todos = this._todos.getValue();
        todos.push({ text, done: false });
        this._todos.next(todos);
        this._updateCounter();
    }

    removeTodo(index: number): void {
        const todos = this._todos.getValue();
        if (index >= 0 && index < todos.length) {
            todos.splice(index, 1);
            this._todos.next(todos);
            this._updateCounter();
        }
    }

    toggleDone(index: number): void {
        const todos = this._todos.getValue();
        if (index >= 0 && index < todos.length) {
            todos[index].done = !todos[index].done;
            this._todos.next(todos);
            this._updateCounter();
        }
    }

    updateTodos(updatedTodos: Todo[]): void {
        this._todos.next(updatedTodos);
        this._updateCounter();
    }

    private _updateCounter(): void {
        const todos = this._todos.getValue();
        const counterTodosDone = todos.filter(todo => todo.done).length;
        this._counterTodosDone.next(counterTodosDone);
    }
}
