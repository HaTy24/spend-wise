import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationDTO {
  @Field(() => Int)
  take: number;

  @Field(() => Int)
  skip: number;

  @Field({ nullable: true, defaultValue: 'date' })
  sort: string;
}
