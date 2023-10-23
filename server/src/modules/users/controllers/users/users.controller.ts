import { Get, Post, Patch, Body, UseGuards, ParseIntPipe, Controller, Param } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { IsAdminGuard } from 'common/guards'
import { UsersService } from '../../services'
import { CreateUserDto, UpdateUserDto } from '../../dtos'
import { EmailIsUnique } from '../../guards'
import { HashPasswordPipe } from '../../pipes'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    fetchUsers() {
        return this.usersService.fetchUsers()
    }

    @Post()
    @UseGuards(AuthGuard('jwt-access-token'), IsAdminGuard, EmailIsUnique)
    createUser(@Body(HashPasswordPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt-access-token'), IsAdminGuard)
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(HashPasswordPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto)
    }
}
