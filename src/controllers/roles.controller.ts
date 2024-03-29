import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateRoleParams, CreateRoleSearchParams } from 'src/dtos/create-role-params';
import { CreateRoleBody } from 'src/dtos/create-role-body';

@Controller('cargos')
export class RolesController {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Get('/list')
  async index() {
    const roles = await this.prisma.roles.findMany({
      orderBy: {
        description: "asc"
      }
    })

    return roles
  }

  @Get('/:description')
  async getRole(@Param() params: CreateRoleSearchParams) {
    const { description } = params
    const role = await this.prisma.roles.findMany({
      where: {
        description: {
          contains: description.toLocaleLowerCase()
        },
      },
      orderBy: {
        description: "asc"
      }
    })

    if (!role) {
      throw new HttpException('Cargo não encontrado', HttpStatus.NOT_FOUND)
    }

    return role
    
  }

  @Post('/create')
  async createRole(@Body() body: CreateRoleBody) {
    const { description } = body

    const checkIfRoleExists = await this.prisma.roles.findFirst({
      where: {
        description: description.toLowerCase()
      }
    })

    if (checkIfRoleExists) {
      throw new HttpException('Esse cargo já existe', HttpStatus.BAD_REQUEST)
    }

    const role = await this.prisma.roles.create({
      data: {
        description: description.toLowerCase()
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
        description: description.toLowerCase()
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


