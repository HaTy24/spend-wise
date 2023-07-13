import { Injectable } from '@nestjs/common';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { PaginationDTO } from './dto/common.dto';

@Injectable()
export class BaseCRUD<T extends ObjectLiteral> {
  constructor(protected model: Repository<T>) {}
  async pagination(
    dto: PaginationDTO,
    query?: FindOptionsWhere<T>,
  ): Promise<{ result: T[]; count: number }> {
    const [result, total] = await this.model.findAndCount({
      where: {
        ...query,
      },
      order: { [dto.sort]: 'DESC' } as FindOptionsOrder<T>,
      take: dto.take,
      skip: dto.skip,
    });

    return {
      result,
      count: total,
    };
  }
}
