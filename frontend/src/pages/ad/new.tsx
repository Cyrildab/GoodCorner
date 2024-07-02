import axios from "axios";
import { useEffect, useState } from "react";

type categorieType = {
  name: string;
  id: number;
};

const NewAdd = () => {
  const [categories, setCategories] = useState<categorieType[]>([]);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const result = await axios.get<categorieType[]>("http://localhost:4000/categories");
        setCategories(result.data);
        console.log(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchCategorie();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target;
          const formData = new FormData(form as HTMLFormElement);

          const formJson = Object.fromEntries(formData.entries());
          axios.post("http://localhost:4000/postannonce", formJson);
        }}
      >
        <label>
          Titre de l&apos;annonce: <br />
          <input type="text-field" name="title" />
        </label>
        <br />
        <label>
          Description: <br />
          <input type="text-field" name="description" />
        </label>
        <br />
        <label>
          Location: <br />
          <input type="text-field" name="location" />
        </label>
        <br />
        <label>
          <br />
          Prix: <br />
          <input type="number" className="text-field" name="price" />
        </label>
        <br />
        <select name="categorie">
          {categories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        <br />
        <label>
          Image: <br />
          <input type="text-field" name="imgUrl" />
        </label>
        <br />
        <button className="buttonSubmit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewAdd;
