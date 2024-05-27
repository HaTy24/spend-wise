import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationDTO } from '../../common/dto/common.dto';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import {
  PaginationResponse,
  RemoveTransactionResponse,
} from './response/transaction.response';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionDTO,
  ) {
    return this.transactionService.create(createTransactionInput);
  }

  @Query(() => PaginationResponse, { name: 'transaction' })
  findAll(
    @Args('dto')
    dto: PaginationDTO,
  ) {
    return this.transactionService.pagination(dto);
  }

  @Query(() => Transaction, { name: 'transactionById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.transactionService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionDTO,
  ) {
    return this.transactionService.update(
      updateTransactionInput.id,
      updateTransactionInput,
    );
  }

  @Mutation(() => RemoveTransactionResponse)
  async removeTransaction(@Args('id', { type: () => String }) id: string) {
    await this.transactionService.remove(id);
    return { success: true };
  }
}
