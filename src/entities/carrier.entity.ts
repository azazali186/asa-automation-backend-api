import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { CarrierTypes } from 'src/enum/carrier-types.enum';
import { IncotermsTypes } from 'src/enum/incoterms.enum';

@Entity('carriers')
export class Carrier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({
    type: 'enum',
    enum: CarrierTypes,
    default: CarrierTypes.SEA,
    nullable: true,
  })
  type: CarrierTypes;

  @Column({
    type: 'enum',
    enum: IncotermsTypes,
    default: IncotermsTypes.FOB,
    nullable: true,
  })
  supported_incoterms: IncotermsTypes;

  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by_id' })
  created_by: User | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by_id' })
  updated_by: User | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;
}
