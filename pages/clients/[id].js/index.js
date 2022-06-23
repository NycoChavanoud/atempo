import Layout from "../../../components/Layout/Layout";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import GreyBurger from "../../../components/GreyBurger/GreyBurger0";
import { useRouter } from "next/router";

export default function Client() {
  const router = useRouter();
  const { clientId } = router.query;
  return (
    <Layout pageTitle={"Client"}>
      <GreyBurger />
      <ClientDetails id={clientId} />
      <p>Coucou</p>
    </Layout>
  );
}
