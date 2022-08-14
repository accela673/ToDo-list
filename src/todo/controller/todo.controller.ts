import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { CreateDto, UpdateDto } from './dto';
//Getone
//Getmany
//Post (create or update)
//Delete(delete)
@Controller('rest/todo')
export class TodoController {
    @Get()
    getAllAction(): string {
      return "Get all action";
    }
    
    @Get(':id')
    getOneAction(@Param('id') id: string): string {
      return `Get one action by id = ${id}`;
    }

    @Post()
    createAction(@Body() todo: CreateDto): CreateDto{
        console.log(todo)
        return todo;
    }

    @Put(':id')
    updateAction(
        @Param('id') id: string, 
        @Body() todo: UpdateDto
        ): UpdateDto{
        console.log(`Search todo by id = ${id}`)
        console.log(todo, `saved`)
        return todo;
    }

    @Delete(':id')
    deleteAction(@Param('id') id: string): string{
        return `Delete action by id = ${id}`
    }
}
