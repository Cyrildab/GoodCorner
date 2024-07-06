import { gql } from "@apollo/client";

export const GET_ALL_ANNONCES = gql`
  query GetAllAnnonces {
    getAllAnnonces {
      id
      title
      imgUrl
      price
    }
  }
`;

export const POST_NEW_ANNONCES = gql`
  mutation publishAd($title: String!, $description: String, $price: Int, $ImgUrl: String, $location: String, $categorieId: Int!) {
    publishAd(adData: { title: $title, description: $description, price: $price, ImgUrl: $ImgUrl, location: $location, categorieId: $categorieId }) {
      id
      title
      description
      price
      imgUrl
      location
      categorie {
        id
      }
    }
  }
`;
