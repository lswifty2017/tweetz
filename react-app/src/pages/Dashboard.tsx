import { FirebaseApp, initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore/lite";
import { getAuth, User } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

type DashboardProps = {
  firebaseApp: FirebaseApp;
  user: User | undefined;
};

const Dashboard = ({ firebaseApp, user }: DashboardProps) => {
  const [tweet, setTweet] = useState("");
  const [allTweets, setAllTweets] = useState();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "tweetz-collection"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    })();
  }, []);

  const submitTweet = async () => {
    const { displayName, email, emailVerified, isAnonymous, photoURL, uid } =
      user || {};

    console.log("email", email);

    try {
      const document = await setDoc(doc(db, "tweetz-collection", uuidv4()), {
        tweet: tweet,
        author: displayName,
        authorEmail: email,
        dateCreated: dayjs().format("YYYY-MM-DD HH:mm"),
        tweetStatus: "draft",
      });

      console.log("document", document);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <h1>Twitter Dashboard</h1>
      <textarea
        value={tweet}
        onChange={(event) => setTweet(event.target.value)}
      ></textarea>
      <button onClick={submitTweet}>Submit Tweet for Approval</button>
    </>
  );
};

export default Dashboard;
