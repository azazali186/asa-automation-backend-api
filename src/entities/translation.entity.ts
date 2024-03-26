import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Language } from './language.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { Stock } from './stock.entity';
import { Catalog } from './catalog.entity';
import { ProductFeature } from './product-features.entity';

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

  @ManyToOne(() => Category, (category) => category.translations, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'category_id' })
  categories: Category;

  @ManyToOne(() => Product, (product) => product.translations, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'product_id' })
  products: Product;

  @ManyToOne(() => Stock, (st) => st.translations, { nullable: true })
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;

  @ManyToOne(() => Catalog, (category) => category.translations, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'catalog_id' })
  catalogs: Catalog;

  @ManyToOne(() => ProductFeature, (pf) => pf.translations, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'product_feature_id' })
  product_feature: ProductFeature;
}
