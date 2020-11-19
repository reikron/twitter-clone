import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  timestamp: number;
}
