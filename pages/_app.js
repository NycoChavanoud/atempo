import "../styles/globals.css";
import { AuthContextProvider } from "../context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </div>
  );
}

export default MyApp;
