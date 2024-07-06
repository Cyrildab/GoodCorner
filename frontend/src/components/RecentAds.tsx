import { useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_ANNONCES } from "@/graphql-queries/annonces";

export type categorieType = {
  id: number;
  name: string;
};

const RecentAds = () => {
  const [total, setTotal] = useState(0);

  const { data, loading, error } = useQuery(GET_ALL_ANNONCES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  // let ads: AdCardProps[] = [...data.getAllAnnonces];
  // ads = ads.sort((adLeft: AdCardProps, adRight: AdCardProps) => (adLeft.title < adRight.title ? -1 : 1));

  const ads = data.getAllAnnonces;

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total = {total} €</p>
      <Link href="ad/new">Je crée mon annonce !</Link>
      <br />
      <br />
      <section className="recent-ads">
        {ads.map((ad: any) => (
          <div key={ad.id}>
            <AdCard imgUrl={ad.imgUrl} price={ad.price} title={ad.title} id={ad.id} />
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
        ))}
      </section>
    </>
  );
};

export default RecentAds;
