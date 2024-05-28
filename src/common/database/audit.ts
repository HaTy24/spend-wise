import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class Audit {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    select: false,
  })
  deletedAt: Date;
}
