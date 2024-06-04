import { DataSource } from "typeorm";
import { Annonce } from "./entities/annonce";
import { Categorie } from "./entities/categorie";

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Anypajotio94#",
  database: "goodCorner",
  synchronize: false,
  migrations: ["migrations/*.ts"],
  migrationsTableName: "migrations",
  logging: true,
  entities: [Annonce, Categorie],
});
