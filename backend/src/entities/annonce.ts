import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categorie } from "./categorie";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Annonce extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number | undefined;

  @Column({ length: 100 })
  @Field()
  title?: string;

  @Column()
  @Field()
  description?: string;

  @Column()
  @Field((type) => Int)
  price?: number;

  @Column()
  @Field()
  location?: string;

  @Column()
  @Field()
  imgUrl?: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.annonces, { eager: true })
  @Field((type) => Categorie)
  categorie?: Categorie | null;

  constructor(title?: string, description?: string, price?: number, location?: string, imgUrl?: string, categorie?: Categorie) {
    super();
    this.title = title;
    this.description = description;
    this.price = price;
    this.location = location;
    this.imgUrl = imgUrl;
    this.categorie = categorie;
  }
}
