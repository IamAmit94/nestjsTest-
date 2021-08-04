import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { TimePunch } from '../timePunch/timePunch.entity';

@Entity()
export class CheckIn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => TimePunch, { nullable: true })
  @JoinColumn()
  checkIn: TimePunch;

  @OneToOne(() => TimePunch, { nullable: true })
  @JoinColumn()
  checkOut: TimePunch;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
