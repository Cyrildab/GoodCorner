import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categorie } from "./categorie";

@Entity()
export class Annonce extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.annonces, { eager: true })
  categorie: Categorie | null;

  constructor(title: string, description: string, price: number, location: string, categorie: Categorie) {
    super();
    this.title = title;
    this.description = description;
    this.price = price;
    this.location = location;
    this.categorie = categorie;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getLocation(): string {
    return this.location;
  }
}
