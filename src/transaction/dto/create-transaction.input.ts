import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Float)
  amount: number;

  @Field()
  purpose?: string;

  @Field(() => Date)
  date: Date;
}
