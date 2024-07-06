import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Annonce } from "./annonce";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Categorie extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number | undefined;

  @Column()
  @Field()
  name?: string;

  @OneToMany(() => Annonce, (annonce) => annonce.categorie, { cascade: true })
  @Field((type) => Annonce)
  annonces?: Promise<Annonce[]>;

  constructor(name?: string) {
    super();
    this.name = name;
  }
}
