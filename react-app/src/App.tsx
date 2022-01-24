import { useEffect, useState, createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import AuthContext from "./auth/AuthContext";
import firebaseConfig from "./config/firebase";

type Inputs = {
  email: string;
  password: string;
};

const Layout = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  padding: 20px;

  h1 {
  }
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        setUser(user);
      } else {
        localStorage.removeItem("token");
      }
    });
  }, []);

  const signupWithGoogle = () => {
    setLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        setUser(user);
        localStorage.setItem("token", token!);
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setLoading(false);
      });
  };

  return (
    <Layout>
      {loading ? (
        <ClipLoader color={"#000000"} loading={loading} size={150} />
      ) : (
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route
              path="/dashboard"
              element={<Dashboard user={user} firebaseApp={firebaseApp} />}
            />
            <Route path="/error" element={<ErrorPage />} />
          </Route>
          <Route
            path="/get-started"
            element={<LandingPage signupAction={signupWithGoogle} />}
          />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      )}
    </Layout>
  );
}

export default App;
