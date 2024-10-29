import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCRUD } from '../../common/database/base-crud';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseCRUD<User> {
  constructor(
    @InjectRepository(User)
    private transactionRepo: Repository<User>
  ) {
    super(transactionRepo);
  }
}
