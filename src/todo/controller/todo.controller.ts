import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';
import { CreateDto, UpdateDto } from './dto';
//Getone
//Getmany
//Post (create or update)
//Delete(delete)
@Controller('rest/todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    @Get()
    getAllAction(): Promise<Todo[]> {
      return this.todoService.readAll();
    }
    
    @Get(':id')
    async getOneAction(@Param('id') id: string): Promise<Todo> {
        const todo = await this.todoService.readOne(id)
        if (todo === undefined || null){
            throw new NotFoundException('Todo with id' + id + ' does not exists')
        }
        return this.todoService.readOne(id);
    }

    @Post()
    createAction(@Body() createDto: CreateDto): Promise<Todo>{
        const todo = new Todo();
        todo.title = createDto.title;
        if(createDto.isCompleted != undefined){
            todo.isCompleted = createDto.isCompleted
        }
        return this.todoService.create(todo);    
    }

    @Put(':id')
    async updateAction(
        @Param('id') id: string, 
        @Body() {title,isCompleted}: UpdateDto
        ): Promise<Todo>{
        const todo = await this.todoService.readOne(id)
        if (todo === undefined || null){
            throw new NotFoundException('Todo with id' + id + ' does not exists')
        }
        todo.title = title
        todo.isCompleted = isCompleted
        return this.todoService.update(todo);
    }

    @Delete(':id')
    deleteAction(@Param('id') id: string): Promise<void>{
        return this.todoService.remove(id)
    }
}
