import { Query, Resolver } from "type-graphql";
import { Categorie } from "../entities/categorie";

@Resolver(Categorie)
export class categorieResolvers {
  @Query(type => [Categorie])
  async getAllCategories():Promise<Categorie[]> {
    const categories: Categorie[] = await Categorie.find({});
    return categories;
  }
}