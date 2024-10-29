import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  IsNull,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import * as queryHelper from '../helpers/query-helper';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type PK = string | number;
type where<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];

@Injectable()
export class BaseCRUD<T extends ObjectLiteral> {
  constructor(protected readonly respository: Repository<T>) {}

  public async paginate(pagingDTO) {
    const { limit = 10, offset = 0, filter } = pagingDTO || {};

    const totalCount = await this.respository.count({
      where: filter,
    });

    if (totalCount === 0) {
      return {
        totalCount: 0,
        items: [],
      };
    }
    const parsedSort = queryHelper.parseSort(pagingDTO.sort);

    const data = await this.respository.find({
      take: limit,
      skip: offset,
      order: parsedSort as any,
      where: {
        deletedAt: IsNull(),
        ...filter,
      },
    });

    return {
      items: data,
      totalCount,
    };
  }

  public async save(data: DeepPartial<T>) {
    return this.respository.save(data);
  }

  public async updateById(id: PK, data: QueryDeepPartialEntity<T>) {
    await this.respository.update(id, data);
  }

  public async bulkUpdate(updateData: QueryDeepPartialEntity<T>, conditions?: Partial<T>) {
    await this.respository
      .createQueryBuilder()
      .update()
      .set(updateData)
      .where({ ...conditions })
      .execute();
  }

  public async deleteById(id: PK) {
    return this.respository.delete(id);
  }

  public async softDeleteById(id: PK) {
    return this.respository.softDelete(id);
  }

  public async findOne(condition: Record<string, any>, withDeleted = false): Promise<T> {
    return this.respository.findOne({
      where: condition,
      withDeleted,
    });
  }

  public async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.respository.find(options);
  }

  public count(where: where<T>) {
    return this.respository.countBy(where);
  }
}
