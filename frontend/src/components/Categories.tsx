export type categorieProps = {
  name: string;
  title: string;
  link: string;
};

const Categories = ({ title, link }: categorieProps) => {
  return (
    <a href={link} className="category-navigation-link">
      {title}
    </a>
  );
};

export default Categories;
