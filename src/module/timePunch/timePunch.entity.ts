import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TimePunch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @Column()
  date: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @Column({ default: 'qwerty.jpg' })
  image: string;

  @Column({ default: 'phone' })
  platform: string;
  enum: ['phone', 'desktop', 'laptop'];
}
