import { Arg, Field, Float, ID, InputType, Int, Mutation, Resolver } from "type-graphql";
import { Annonce } from "../entities/annonce";
import { DataSource, EntityManager } from "typeorm";
import { dataSource } from "../db";
import { Categorie } from "../entities/categorie";

@InputType()
export class AnnonceInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  ImgUrl?: string;

  @Field({ nullable: true })
  location?: string;

  @Field((type) => Int) // CategorieId should be Int
  categorieId!: number;
}

@Resolver(Annonce)
export class AdMutations {
  @Mutation((_) => Annonce)
  async publishAd(@Arg("adData") adData: AnnonceInput): Promise<Annonce> {
    return dataSource.transaction(async (entityManager: EntityManager) => {
      const category = await entityManager.findOneBy(Categorie, { id: adData.categorieId });

      if (!category) {
        throw new Error("Category not found");
      }

      try {
        const ad = new Annonce(adData.title, adData.description, adData.price, adData.ImgUrl, adData.location);
        ad.categorie = category;

        await entityManager.save(ad);

        return ad;
      } catch (e) {
        throw new Error("Cannot create ad: " + e);
      }
    });
  }
}
