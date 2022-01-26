import { FirebaseApp, initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  DocumentData,
} from "firebase/firestore/lite";
import { getAuth, User, signOut } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import styled from "styled-components";
import TweetBox from "../components/TweetBox";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import ClipLoader from "react-spinners/ClipLoader";

type DashboardProps = {
  firebaseApp: FirebaseApp;
  user: User | undefined;
};

const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  .user {
    font-size: 14px;
    padding-right: 12px;
  }
`;

const DashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tweets-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    flex-wrap: wrap;
  }

  .tweet-error {
    color: red;
    margin: 0;
    padding-bottom: 8px;
  }

  h2 {
    padding-top: 24px;
  }
`;

const Dashboard = ({ firebaseApp, user }: DashboardProps) => {
  const [tweet, setTweet] = useState("");
  const [tweetError, setTweetError] = useState("");
  const [allTweets, setAllTweets] = useState<DocumentData[]>([]);
  const [tweetsLoading, setTweetsLoading] = useState(true);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await getAllTweets())();
  }, []);

  const getAllTweets = async () => {
    const tweets: DocumentData[] = [];

    const querySnapshot = await getDocs(collection(db, "tweetz-collection"));
    querySnapshot.forEach((doc) => {
      tweets.push(doc.data());
    });

    const sortedTweets = tweets
      .sort(
        (b, a) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      )
      .slice(0, 10);

    setAllTweets(sortedTweets);
    setTweetsLoading(false);
  };

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

      await getAllTweets();
      setTweet("");

      console.log("document", document);
    } catch (err) {
      console.log("err", err);
      setTweetError(
        "Unable to send tweet for approval, please try again later."
      );
    }
  };

  const validateTweet = (event: any) => {
    if (event.target.value.length > 280) {
      setTweetError("Tweet exceeds max length of 280 characters.");
    } else if (event.target.value.length === 0) {
      console.log("here");
      setTweet(event.target.value);
      setTweetError("Tweet must have at least 1 character.");
    } else {
      setTweet(event.target.value);
      setTweetError("");
    }
  };

  const signout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        navigate("/get-started");
      })
      .catch((error) => {
        console.log("Unable to sign out", error);
      });
  };

  return (
    <div>
      <Header>
        {user?.displayName && <p className="user">Hello {user?.displayName}</p>}
        <Button
          onClick={signout}
          text="Logout"
          disabled={!!tweetError.length}
          color="purple"
        />
      </Header>
      <DashboardLayout>
        <h1>Twitter Dashboard</h1>

        <TextArea value={tweet} onChange={validateTweet}></TextArea>
        {tweetError.length > 0 && <p className="tweet-error">{tweetError}</p>}
        <Button
          onClick={submitTweet}
          text="Submit tweet for approval"
          disabled={!!tweetError.length}
        />

        <h2>Tweet History</h2>
        <div className="tweets-container">
          <ClipLoader color={"#000000"} loading={tweetsLoading} size={100} />
          {allTweets.map(({ tweet, author, dateCreated, tweetStatus }) => {
            return (
              <TweetBox
                tweet={tweet}
                author={author}
                dateCreated={dateCreated}
                tweetStatus={tweetStatus}
              />
            );
          })}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
