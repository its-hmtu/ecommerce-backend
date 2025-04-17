import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ type: 'date', nullable: true })
  dob: Date; // Date of Birth

  @Column({ nullable: true })
  phone: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;
}
