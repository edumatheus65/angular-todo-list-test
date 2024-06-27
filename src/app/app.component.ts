import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnimateDirective } from './animate.directive';
import { TodoService } from './todo-service.service';
import { Todo } from './todo.types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChildren(AnimateDirective) items: QueryList<AnimateDirective>;

    todos: Todo[] = [];
    counterTodosDone = 0;

    private _unsubscribeAll = new Subject();

    constructor(
        private todoService: TodoService,
    ) {}

    ngOnInit(): void {
        this.todoService.todos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(todos => this.todos = todos);

        this.todoService.counterTodosDone$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(count => this.counterTodosDone = count);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    addTodo(input: HTMLInputElement) {
        const text = input.value;

        if (!text) return;

        input.value = '';
        this.todoService.addTodo(text);
        this.animate();
    }

    remove(index: number) {
        this.todoService.removeTodo(index);
        this.animate();
    }

    onToggleDone(index: number, todo: Todo) {
        this.todoService.toggleDone(index);
    }

    onDragStart(event: DragEvent, fromIndex: number) {
        event.dataTransfer.setData('text/plain', fromIndex.toString());
    }

    onDrop(event: DragEvent, toIndex: number) {
        const fromIndex = +event.dataTransfer.getData('text/plain');
        if (fromIndex !== toIndex) {
            const movedItem = this.todos.splice(fromIndex, 1)[0];
            this.todos.splice(toIndex, 0, movedItem);
            this.todoService.updateTodos(this.todos);
        }
        event.preventDefault();
        this.animate();
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    animate() {
        setTimeout(() => this.items.forEach(x => x.animateGo()), 10);
    }
}
