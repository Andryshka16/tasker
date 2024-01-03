import { Get, Post, Body, Controller, UseGuards, ParseIntPipe, Patch, Delete, Param } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { IsModeratorGuard } from 'common/guards'
import { GetUser } from 'common/decorators'
import { TaskService } from '../../services'
import { CreateTaskDto, UpdateTaskDto } from '../../dtos'
import { ValidateTaskPipe } from '../../pipes'
import { type UserFromRequest } from 'types'

@Controller('tasks')
export class TaskController {
	constructor(private tasksService: TaskService) {}

	@Get()
	async fetchTasks() {
		return await this.tasksService.fetchTasks()
	}

	@Post()
	@UseGuards(AuthGuard('jwt-access-token'), IsModeratorGuard)
	async createTask(@GetUser() user: UserFromRequest, @Body(ValidateTaskPipe) createTaskDto: CreateTaskDto) {
		return this.tasksService.createTask(createTaskDto, user)
	}

	@Patch(':id')
	@UseGuards(AuthGuard('jwt-access-token'), IsModeratorGuard)
	async updateTask(
		@Param('id', ParseIntPipe) id: number,
		@Body(ValidateTaskPipe) updateFields: UpdateTaskDto
	) {
		await this.tasksService.updateTask(id, updateFields)
	}

	@Delete()
	deleteTask() {
		return this.tasksService.deleteAll()
	}
}
