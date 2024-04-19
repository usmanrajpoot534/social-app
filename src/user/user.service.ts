import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/paginated-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query: PaginationQueryDto) {
    var orderBy: { [key: string]: string } = {};
    console.log(query);

    if (query.orderBy != null || query.orderBy != '') {
      let sortArray = query.orderBy.split(':');

      if (sortArray.length > 1) {
        orderBy = {};
        sortArray[1] = sortArray[1] == 'ASC' ? 'asc' : 'desc';
        orderBy[sortArray[0]] = sortArray[1];

        console.log(orderBy);
      }
    }
    console.log(orderBy);

    const [count, records] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query.search } },
            { country: { contains: query.search } },
            {
              posts: {
                some: {
                  title: { contains: query.search },
                  categories: {
                    some: { name: { contains: query.search } },
                  },
                },
              },
            },
          ],
          country:
            !query.countryFilter || JSON.parse(query.countryFilter).length == 0
              ? undefined
              : { in: JSON.parse(query.countryFilter) },
          role: { equals: query.userType },
        },
        include: { posts: { include: { categories: true } } },
        orderBy: orderBy,
        skip: (query.page - 1) * query.per_page,
        take: query.per_page,
      }),
    ]);
    const pages = Math.ceil(count / query.per_page);
    return { count, pages, records };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
