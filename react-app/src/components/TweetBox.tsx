import styled from "styled-components";

type TweetBoxProps = {
  tweet: string;
  author: string;
  dateCreated: string;
  tweetStatus: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 200px;
  border: 1px solid ${({ color }) => color};
  border-radius: 5px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 16px;

  p {
    margin: 0;
    font-size: 14px;
  }

  .tweet {
    padding-bottom: 16px;
  }

  .tweet-info-text {
    margin: 0;
  }
`;

const TweetBox = ({
  tweet,
  author,
  dateCreated,
  tweetStatus,
}: TweetBoxProps) => {
  return (
    <Wrapper color={tweetStatus === "published" ? "green" : "orange"}>
      <p className="tweet">{tweet}</p>
      <div className="tweet-info">
        <p className="tweet-info-text">Created by: {author}</p>
        <p className="tweet-info-text">Date created: {dateCreated}</p>
        <p className="tweet-info-text">Status: {tweetStatus}</p>
      </div>
    </Wrapper>
  );
};

export default TweetBox;
