import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateRoleParams } from 'src/dtos/create-role-params';
import { CreateRoleBody } from 'src/dtos/create-role-body';

@Controller('cargos')
export class RolesController {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Get('/list')
  async index() {
    const roles = await this.prisma.roles.findMany()

    return roles
  }

  @Get('/:id')
  async getRole(@Param() params: CreateRoleParams) {
    const { id } = params
    const role = await this.prisma.roles.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    if (!role) {
      throw new HttpException('Cargo não encontrado', HttpStatus.NOT_FOUND)
    }

    return {
      role,
    }
  }

  @Post('/create')
  async createRole(@Body() body: CreateRoleBody) {
    const { description } = body

    const checkIfRoleExists = await this.prisma.roles.findFirst({
      where: {
        description: description.toLocaleLowerCase()
      }
    })

    if (checkIfRoleExists) {
      throw new HttpException('Esse cargo já existe', HttpStatus.BAD_REQUEST)
    }

    const role = await this.prisma.roles.create({
      data: {
        description: description.toLocaleLowerCase()
      }
    })

    return {
      role,
    }
  }

  @Put('/edit/:id')
  async editRole( @Param() params: CreateRoleParams, @Body() body: CreateRoleBody) {
    const { id } = params
    const { description } = body

    const checkIfRoleExists = await this.prisma.roles.findFirst({
      where: {
        id: parseInt(id)
      }
    })
  
    if (!checkIfRoleExists) {
      throw new HttpException('Esse cargo não existe', HttpStatus.NOT_FOUND)
    }
      
    const editedRole = await this.prisma.roles.update({
      where: {
        id: parseInt(id)
      },
      data: {
        description: description.toLocaleLowerCase()
      }
    })
  
    return {
      editedRole,
    }
  }

  @Delete('/delete/:id')
  async deleteRole(@Param() params: CreateRoleParams) {
    const { id } = params

    const deletedRole = await this.prisma.roles.delete({
      where: {
        id: parseInt(id)
      }
    })

    if (!deletedRole) {
      throw new HttpException('Cargo não encontrado.', HttpStatus.NOT_FOUND)
    }

    return {
      message: "Cargo deletado",
      deletedRole
    }
  }
}


