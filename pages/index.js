import Layout from "../components/Layout/Layout";
import WhiteBurger from "../components/WhiteBurger/WhiteBurger";

export default function Home() {
  return (
    <Layout pageTitle="Accueil">
      <WhiteBurger />
      <h1>Dashboard</h1>
    </Layout>
  );
}
