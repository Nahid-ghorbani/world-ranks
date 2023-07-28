import Layout from "@/src/components/Layout/Layout";

const Country = ({ country }) => {
  console.log(country);
  return <Layout title={country.name}>Country</Layout>;
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${params.id}`);

  const country = await res.json();
  return {
    props: { country },
  };
};
