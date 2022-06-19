import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return router.push("/");
  }
  return { children };
};

export default ProtectedRoute;
