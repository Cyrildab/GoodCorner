import axios from "axios";

const newCategorie = () => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target;
          const formData = new FormData(form as HTMLFormElement);

          const formJson = Object.fromEntries(formData.entries());
          axios.post("http://localhost:4000/postcategorie", formJson);
        }}
      >
        <label>
          Titre de la catégorie: <br />
          <input type="text-field" name="name" />
        </label>
        <br />
        <br />
        <button className="buttonSubmit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default newCategorie;
