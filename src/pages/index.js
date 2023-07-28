import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filterCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value.toLowerCase());
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.counts}>
        Found {filterCountries.length} countries.
      </div>
      <SearchInput
        placeholder="Filter by Name, Region or SubRegion "
        onChange={onInputChange}
      />

      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  return {
    props: { countries },
  };
};
