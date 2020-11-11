import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title = 'Minhas Tarefas';
  public form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])]
    });
    // this.todos.push(new Todo(1, 'passear com o cachorro', false));
    // this.todos.push(new Todo(2, 'ir ao mercado', false));
    // this.todos.push(new Todo(3, 'cortar o cabelo', false));
    // this.todos.push(new Todo(4, 'trabalhar a tarde', false));
    // this.todos.push(new Todo(5, 'buscar pão', true));

    this.load();

  }

  add(): void {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(): void {
    this.form.reset();
  }

  remove(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.save();
    }
  }

  markAsDone(todo: Todo): void {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo): void {
    todo.done = false;
    this.save();
  }

  alterarTexto(): void {
    this.title === 'Suas Tarefas' ? this.title = 'Minhas Tarefas' : this.title = 'Suas Tarefas';
  }

  save(): void {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load(): void {
    const data = localStorage.getItem('todos');
    if(data) {
      this.todos = JSON.parse(data);
    }else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
