import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { BaseCRUD } from 'src/common/base-crud';

@Injectable()
export class TransactionService extends BaseCRUD<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {
    super(transactionRepo);
  }
  create(createTransactionInput: CreateTransactionDTO) {
    return this.transactionRepo.save(createTransactionInput);
  }

  findOne(id: string) {
    return this.transactionRepo.findOneBy({ id });
  }

  async update(id: string, updateTransactionInput: UpdateTransactionDTO) {
    const transaction = await this.transactionRepo.findOneBy({ id });
    if (!transaction) throw new Error('transaction not found');
    transaction.amount = updateTransactionInput.amount;
    transaction.date = updateTransactionInput.date;
    transaction.purpose = updateTransactionInput.purpose;
    return this.transactionRepo.save(transaction);
  }

  async remove(id: string) {
    const transaction = await this.transactionRepo.findOneBy({ id });
    if (!transaction) throw new Error('transaction not found');
    return this.transactionRepo.remove(transaction);
  }
}
