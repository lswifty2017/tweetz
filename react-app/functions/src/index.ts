import "dotenv/config";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import callableAction from "rowy-actions";
import { TwitterApi } from "twitter-api-v2";
import dayjs = require("dayjs");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    clientEmail: process.env.CLIENT_EMAIL!,
  }),
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY!,
  appSecret: process.env.TWITTER_CONSUMER_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
}).readWrite;

export const publishTweet = callableAction(
  async ({ row, callableData, context }) => {
    const { tweet } = row || {};

    functions.logger.info(`Callable data`, { callableData: callableData });
    functions.logger.info(`Rowy row`, { row: row });

    try {
      const { data: createdTweet } = await twitterClient.v2.tweet(tweet);
      functions.logger.info(`createdTweet`, { createdTweet });
    } catch (error) {
      functions.logger.error(`Error publishing tweet`, { error });

      return {
        success: false,
        message: "Error publishing tweet.",
        cellStatus: "Error publishing tweet",
        newState: "redo",
      };
    }

    try {
      const docPath = context?.rawRequest?.body?.data?.ref?.path;
      functions.logger.info(`Document id`, { docId: docPath.split("/")[1] });

      const updatedDocument = admin
        .firestore()
        .collection("tweetz-collection")
        .doc(docPath.split("/")[1])
        .update({
          datePublished: dayjs().format("YYYY-MM-DD HH:mm"),
          tweetStatus: "published",
        });
      functions.logger.info(`Document updated`, { updatedDocument });
    } catch (error) {
      functions.logger.error(`Error updating document`, { error });

      return {
        success: false,
        message: "Error updating the tweet status and published date of tweet",
        cellStatus: "Error updating tweet status",
        newState: "redo",
      };
    }

    return {
      success: true,
      message: "Tweet has been successfully published!",
      cellStatus: "Tweet Published",
      newState: "redo",
    };
  }
);
