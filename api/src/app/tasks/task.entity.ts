import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'simple-enum',
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
  })
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';

  @Column()
  createdBy: number;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'createdBy' })
  createdByUser: User;
}
