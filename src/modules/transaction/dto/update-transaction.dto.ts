import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTransactionDTO } from './create-transaction.dto';

@InputType()
export class UpdateTransactionDTO extends PartialType(CreateTransactionDTO) {
  @Field(() => String)
  id: string;
}
