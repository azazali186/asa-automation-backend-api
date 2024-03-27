import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Language } from './language.entity';

@Entity()
export class Translations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  meta_title: string;

  @Column({ type: 'text', nullable: true })
  meta_keywords: string;

  @Column({ type: 'text', nullable: true })
  meta_descriptions: string;

  @ManyToOne(() => Language, (lang) => lang.id)
  @JoinColumn({ name: 'language_id' })
  language: Language;
}
