import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTransactionDTO {
  @Field(() => Float)
  amount: number;

  @Field()
  spendingReason?: string;

  @Field({ nullable: true, defaultValue: new Date() })
  date?: Date;
}
