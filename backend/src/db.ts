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

export async function cleanDB() {
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 0");
  await dataSource.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.clear(Annonce);
    await transactionalEntityManager.clear(Categorie);
  });
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 1");
}

async function createAndPersistAd(title: string, description: string, price: number, location: string, imgUrl: string, categorie: Categorie) {
  const firstAnnonce = new Annonce(title, description, price, location, imgUrl, categorie);
  const secondAnnonce = new Annonce(title, description, price, location, imgUrl, categorie);
  const thirdAnnonce = new Annonce(title, description, price, location, imgUrl, categorie);
  const fourthAnnonce = new Annonce(title, description, price, location, imgUrl, categorie);
  await dataSource.manager.save(firstAnnonce);
  // await dataSource.manager.save(secondAnnonce);
  // await dataSource.manager.save(thirdAnnonce);
  // await dataSource.manager.save(fourthAnnonce);
}

async function initData() {
  const firstCategorie = new Categorie("Vêtements");
  const secondCategorie = new Categorie("Divers");
  await dataSource.manager.save(firstCategorie);
  await dataSource.manager.save(secondCategorie);

  await createAndPersistAd(
    "Beau vélo enfant",
    "Petites roues fournies",
    80,
    "Lille",
    "https://gibuscycles.com/cdn/shop/products/draisienne-12-pouces-gibus-cycles-profil-rouge.jpg?v=1683300216",
    firstCategorie
  );
  await createAndPersistAd(
    "Jolie trottinette",
    "Pliable et légère",
    50,
    "Paris",
    "https://cdn2.conforama.fr/product/image/c025/G_CNF_E58410611_B.jpeg",
    firstCategorie
  );
  await createAndPersistAd(
    "Skateboard débutant",
    "Parfait pour les enfants",
    40,
    "Marseille",
    "https://contents.mediadecathlon.com/p1954720/k$9867d0116944bb88f3e39ec884ec8419/2500pt2598/5000xcr3077/skateboard_decathlon_comment_choisir_sa_planche_de_skate_%3F.jpg?format=auto",
    secondCategorie
  );
  await createAndPersistAd(
    "Voiture télécommandée",
    "Grande autonomie",
    90,
    "Nantes",
    "https://media.carrefour.fr/medias/61cab34a280d300287580a05fadf723d/p_540x540/845264483ec64736a2199b313a355f94-image.jpg",
    secondCategorie
  );
}

// app.listen(port, async () => {
//   await dataSource.initialize();

//   await cleanDB();
//   await initData();

//   console.log(`Example app listening on port ${port}`);
// });
