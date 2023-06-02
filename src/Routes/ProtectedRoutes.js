import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../Util/authHeader";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  let token = getAccessToken();
  useEffect(() => {
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [token]);

  return (
    <>
        {children}
    </>
  );
}
