import { IsOptional } from 'class-validator'
import { Priority, User } from 'types'

export class UpdateTaskDto {
	@IsOptional()
	title: string

	@IsOptional()
	description: string

	@IsOptional()
	priority: Priority

	@IsOptional()
	due: string

	@IsOptional()
	user: User
}
