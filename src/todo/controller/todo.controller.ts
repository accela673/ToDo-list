import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { type } from 'os';
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
    @ApiResponse({
        status: 200,
        description: 'Get all todo',
        type: [Todo]
    })
    getAllAction(): Promise<Todo[]> {
      return this.todoService.readAll();
    }
    
    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Get one todo by id in database',
        type: [Todo]
    })
    async getOneAction(@Param('id') id: string): Promise<Todo> {
        const todo = await this.todoService.readOne(id)
        if (todo === undefined || null){
            throw new NotFoundException('Todo with id' + id + ' does not exists')
        }
        return this.todoService.readOne(id);
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: 'Create todo',
        type: [Todo]
    })
    @ApiBody({type: CreateDto})
    createAction(@Body() createDto: CreateDto): Promise<Todo>{
        const todo = new Todo();
        todo.title = createDto.title;
        if(createDto.isCompleted != undefined){
            todo.isCompleted = createDto.isCompleted
        }
        return this.todoService.create(todo);    
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Update todo by id in database',
        type: [Todo]
    })
    @ApiBody({type: UpdateDto})
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
    @ApiResponse({
        status: 200,
        description: 'Delete todo by id in database'
        })
    deleteAction(@Param('id') id: string): Promise<void>{
        return this.todoService.remove(id)
    }
}
