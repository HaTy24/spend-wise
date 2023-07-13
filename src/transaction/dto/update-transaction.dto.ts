import { CreateTransactionDTO } from './create-transaction.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionDTO extends PartialType(CreateTransactionDTO) {
  @Field(() => String)
  id: string;
}
