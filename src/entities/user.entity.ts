import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Session } from './session.entity';
import { Exclude, Expose } from 'class-transformer';
import { CommonStatus } from 'src/enum/common-status.enum';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // @Exclude()
  @Column()
  password: string;

  @Column({ default: '', length: 15 })
  mobile_number: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  telegram_id: string;

  @Column({ default: true })
  is_kyc: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  created_by_id: number;

  @Column({ nullable: true })
  updated_by_id: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by_id' })
  created_by: User | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by_id' })
  updated_by: User | null;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  @Column({ nullable: true })
  roles_id: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roles_id' })
  // @Transform(({ value }) => value.name)
  roles: Role;

  @OneToMany(() => Session, (session) => session.id)
  sessions: Session[];

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  last_login: Date;

  @Expose()
  @OneToOne(() => Session)
  @JoinColumn({ name: 'latest_session_id' })
  get latestSession(): Session | undefined {
    if (this.sessions && this.sessions.length > 0) {
      return this.sessions.reduce((latest, current) =>
        current.id > latest.id ? current : latest,
      );
    }
    return undefined;
  }

  lang: string;
  currency: string;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  delated_at: Date;
}
