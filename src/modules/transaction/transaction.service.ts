import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCRUD } from '../../common/database/base-crud';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService extends BaseCRUD<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>
  ) {
    super(transactionRepo);
  }
}
