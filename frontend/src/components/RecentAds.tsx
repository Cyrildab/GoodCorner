import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import Link from "next/link";

export type categorieType = {
  id: number;
  name: string;
};

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [annonces, setAnnonces] = useState<AdCardProps[]>([]);
  const [categories, setCategories] = useState<categorieType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:4000/annonces");
        setAnnonces(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const result = await axios.get<categorieType[]>("http://localhost:4000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchCategorie();
  }, []);

  const filteredAnnonces = selectedCategory ? annonces.filter((e) => e.categorie && e.categorie.name === selectedCategory) : annonces;

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/annonce/${id}`);
      setAnnonces(annonces.filter((ad) => ad.id !== id));
    } catch (err) {
      console.log("Error deleting ad:", err);
    }
  };

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total = {total} €</p>
      <Link href="ad/new">Je crée mon annonce !</Link>
      <br />
      <br />
      <button type="button" className="filterButton" onClick={() => setSelectedCategory(null)}>
        Toutes les catégories
      </button>
      {categories.map((e, index: number) => (
        <button key={index} type="button" className="filterButton" onClick={() => setSelectedCategory(e.name)}>
          {e.name}
        </button>
      ))}
      <section className="recent-ads">
        {filteredAnnonces.map((ad, index: number) => (
          <>
            <div key={index}>
              <AdCard imgUrl={ad.imgUrl} link={ad.link} price={ad.price} title={ad.title} key={ad.id} id={ad.id} />
              <button type="button" className="deleteButton" onClick={() => handleDelete(ad.id)}>
                Supprimer
              </button>
              <button
                type="button"
                className="buttonAdPrice"
                onClick={() => {
                  setTotal(total + ad.price);
                }}
              >
                Add price to total
              </button>
            </div>
          </>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
