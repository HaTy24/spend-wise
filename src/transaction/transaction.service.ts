import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}
  create(createTransactionInput: CreateTransactionInput) {
    return this.transactionRepo.save(createTransactionInput);
  }

  findAll() {
    return this.transactionRepo.find();
  }

  findOne(id: string) {
    return this.transactionRepo.findOneBy({ id });
  }

  async update(id: string, updateTransactionInput: UpdateTransactionInput) {
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
