import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "@/graphql-queries/categories";
import { POST_NEW_ANNONCES } from "@/graphql-queries/annonces";

const NewAdd = () => {
  const { data: categorieResult, loading: categorieLoading, error: categorieError } = useQuery(GET_ALL_CATEGORIES);

  const [publishAd, { loading, data, error }] = useMutation(POST_NEW_ANNONCES);

  if (categorieLoading) {
    return <p>Loading ...</p>;
  }

  if (categorieError) {
    return <p>Error: {categorieError.message}</p>;
  }

  const categories = categorieResult.getAllCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    const categoryId = parseInt(formJson.categorie as string);

    try {
      await publishAd({
        variables: {
          title: formJson.title as string,
          description: formJson.description as string,
          price: parseInt(formJson.price, 10),
          ImgUrl: formJson.imgUrl as string,
          location: formJson.location as string,
          categorieId: categoryId,
        },
      });
      console.log("Ad published successfully!");
    } catch (err) {
      console.error("Error publishing ad:", err);
    }
    console.log(formJson.price);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Titre de l&apos;annonce: <br />
          <input type="text" name="title" required />
        </label>
        <br />
        <label>
          Description: <br />
          <input type="text" name="description" />
        </label>
        <br />
        <label>
          Location: <br />
          <input type="text" name="location" />
        </label>
        <br />
        <label>
          Prix: <br />
          <input type="number" name="price" />
        </label>
        <br />
        <label>
          Catégorie: <br />
          <select name="categorie" required>
            {categories.map((el) => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Image: <br />
          <input type="text" name="imgUrl" />
        </label>
        <br />
        <button className="buttonSubmit" type="submit" disabled={loading}>
          Submit
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </>
  );
};

export default NewAdd;
