import Categories, { categorieProps } from "./Categories";

const AdCategories = () => {
  const categories: categorieProps[] = [
    { title: "Ameublement", link: "/" },
    { title: "Électroménager", link: "/" },
    { title: "Photographie", link: "/" },
    { title: "Informatique", link: "/" },
    { title: "Téléphonie", link: "/" },
    { title: "Vélos", link: "/" },
    { title: "Véhicules", link: "/" },
    { title: "Sport", link: "/" },
    { title: "Habillement", link: "/" },
    { title: "Bébé", link: "/" },
    { title: "Outillage", link: "/" },
    { title: "Services", link: "/" },
    { title: "Vacances", link: "/" },
  ];

  return (
    <nav className="categories-navigation">
      {categories.map((ad) => (
        <Categories link={ad.link} title={ad.title} key={ad.title} />
      ))}
    </nav>
  );
};

export default AdCategories;
