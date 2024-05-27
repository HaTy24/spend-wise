import { Field, ObjectType } from '@nestjs/graphql';
import { Transaction } from '../entities/transaction.entity';

@ObjectType()
export class PaginationResponse {
  @Field(() => [Transaction])
  result: [Transaction];

  @Field(() => Number)
  count: number;
}

@ObjectType()
export class RemoveTransactionResponse {
  @Field(() => Boolean)
  success: boolean;
}
