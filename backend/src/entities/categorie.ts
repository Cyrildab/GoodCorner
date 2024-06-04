import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Annonce } from "./annonce";

@Entity()
export class Categorie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string;

  @OneToMany(() => Annonce, (annonce) => annonce.categorie, { cascade: true })
  annonces?: Promise<Annonce[]>;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
