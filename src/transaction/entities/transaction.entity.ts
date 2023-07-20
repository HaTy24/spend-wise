import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Transaction {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Float, { nullable: false })
  @Column()
  amount: number;

  @Field({ nullable: true })
  @Column()
  purpose?: string;

  @Field(() => Date, { nullable: false })
  @Column()
  date: Date;
}

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
