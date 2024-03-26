import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { MediaTypeEnum } from '../enum/media-type.enum';
import { User } from './user.entity';

@Entity()
export class Files extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  full_url: string;

  @Column()
  file_name: string;

  @Column({ default: MediaTypeEnum.IMAGES })
  media_type: string;

  @Column({ nullable: true })
  extention: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  original_file_name: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  uploaded_by: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;
}
