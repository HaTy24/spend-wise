import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTransactionDTO {
  @Field(() => Float)
  amount: number;

  @Field()
  spendingReason?: string;

  @Field(() => Date)
  date: Date;
}
