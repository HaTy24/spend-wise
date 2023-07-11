import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Transaction {
  @Field(() => Int)
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
