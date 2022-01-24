import { FirebaseApp, initializeApp } from "firebase/app";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

type DashboardProps = {
  firebaseApp: FirebaseApp;
};

const Dashboard = ({ firebaseApp }: DashboardProps) => {
  useEffect(() => {
    const db = getFirestore(firebaseApp);

    (async () => {
      const querySnapshot = await getDocs(collection(db, "tweetz-collection"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    })();
  }, []);

  return <h1>Twitter Dashboard</h1>;
};

export default Dashboard;
