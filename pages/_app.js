import "../styles/globals.css";
import { AuthContextProvider } from "../context/authContext";
import ProtectedRoute from "../components/ProtectedRoute/protectedRoute";
import { useRouter } from "next/router";

const noAuthRequired = ["/", "/inscription", "/resetpwd"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div>
      <AuthContextProvider>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </AuthContextProvider>
    </div>
  );
}

export default MyApp;
