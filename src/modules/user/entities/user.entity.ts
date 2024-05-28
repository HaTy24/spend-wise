import { Audit } from 'src/common/database/audit';
import { ENTITY_STATUS } from 'src/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface PublicUser {
  id: string;
  username: string;
  email: string;
}

export const extractPublicUserInfo = (user: User): PublicUser => {
  if (!user) return null;

  const { id, username, email } = user;
  return {
    id,
    username,
    email,
  };
};

@Entity()
export class User extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: ENTITY_STATUS.ACTIVE })
  status: ENTITY_STATUS;

  @Column()
  password: string;
}
