import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import RecentAds from "@/components/RecentAds";
import AdCategories from "@/components/AdCategories";

export default function Home() {
  return (
    <>
      <AdCategories />
      <RecentAds />
    </>
  );
}
