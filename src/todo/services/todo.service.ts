import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  readAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  readOne(id: any): Promise<Todo> {
    return this.todoRepository.findOneBy({id});
  }

  update(todo:Todo): Promise<Todo>{
    return this.todoRepository.save(todo)

  }

  async remove(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }

  create(todo: Todo): Promise<Todo>{
    delete(todo.id);
    return this.todoRepository.save(todo);
  }

}