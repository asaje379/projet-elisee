import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.users.create({ data: createUserDto });
    return newUser;
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.users.delete({ where: { id } });
  }
}
