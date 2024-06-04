import express from "express";
import "reflect-metadata";
import { dataSource } from "./db";
import { Annonce } from "./entities/annonce";
import { Categorie } from "./entities/categorie";
import { DataSource } from "typeorm";
const app = express();
const port = 3000;

app.use(express.json());
async function cleanDB() {
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 0");
  await dataSource.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.clear(Annonce);
    await transactionalEntityManager.clear(Categorie);
  });
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 1");
}

// Poster une annonce
app.post("/postannonce", async (req, res) => {
  const { title, description, price, location, categorie } = req.body;

  const ad = new Annonce(title, description, price, location, categorie || null);

  await dataSource.manager.save(ad);
  res.send("New annonce posted.");
});

// Poster une catégorie
app.post("/postcategorie", async (req, res) => {
  const ad = new Categorie(req.body.name);

  await dataSource.manager.save(ad);
  console.log(ad);

  res.send("New categorie added.");
});

// Obtenir toutes les annonces
app.get("/annonces", async (req, res) => {
  const annonces: Annonce[] = await dataSource.manager.find(Annonce);

  res.send(annonces);
});

// Obtenir toutes les catégories
app.get("/categories", async (req, res) => {
  const categories: Categorie[] = await dataSource.manager.find(Categorie);

  res.send(categories);
});

// Obtenir une catégorie par ID
app.get("/categorie/:id", async (req, res) => {
  const id: number = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send("Invalid ID");
  }
  const categorie: any = await dataSource.manager.findOne(Categorie, { where: { id } });

  res.send(categorie);
});

// Obtenir les annonces par ID
app.get("/annonce/:id", async (req, res) => {
  const id: number = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send("Id is not a number, try again.");
  }

  const annonce: any = await dataSource.manager.findOne(Annonce, { where: { id } });

  res.send(annonce);
});

// Supprimer une annonce par ID
app.delete("/annonce/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  await dataSource.manager.delete(Annonce, { id });

  res.send("Annonce supprimée.");
});

// Modifier une catégorie par ID
app.put("/updateCategorie/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send("Invalid ID.");
  }

  const updateCategorie = req.body.name;

  try {
    const categorie = await dataSource.manager.findOne(Categorie, { where: { id } });

    if (!categorie) {
      return res.status(404).send("Categorie not found.");
    }

    if (updateCategorie === categorie.name) {
      return res.status(400).send("The name of the category is already the same.");
    }

    categorie.name = updateCategorie;

    await dataSource.manager.save(categorie);

    res.send("Category updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error.");
  }
});

async function createAndPersistAd(title: string, description: string, price: number, location: string, categorie: Categorie) {
  const firstAnnonce = new Annonce(title, description, price, location, categorie);
  await dataSource.manager.save(firstAnnonce);
}

async function initData() {
  const firstCategorie = new Categorie("Vêtements");
  const secondCategorie = new Categorie("Divers");
  await dataSource.manager.save(firstCategorie);
  await dataSource.manager.save(secondCategorie);

  await createAndPersistAd("Beau vélo enfant", "Petites roues fournies", 80, "Lille", firstCategorie);
}

app.listen(port, async () => {
  await dataSource.initialize();

  await cleanDB();
  await initData();

  console.log(`Example app listening on port ${port}`);
});
