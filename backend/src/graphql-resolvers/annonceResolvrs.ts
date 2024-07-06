import { Arg, ID, Query, Resolver } from "type-graphql";
import { Annonce } from "../entities/annonce";

@Resolver(Annonce)
export class annonceResolvers {
  @Query((type) => [Annonce])
  async getAllAnnonces(): Promise<Annonce[]> {
    const Annonces: Annonce[] = await Annonce.find({});
    return Annonces;
  }

  @Query((type) => Annonce, { nullable: true })
  async getAnnonceById(@Arg("id", (type) => ID) id: number): Promise<Annonce | null> {
    const annonce: Annonce | null = await Annonce.findOne({ where: { id } });
    return annonce;
  }
}
