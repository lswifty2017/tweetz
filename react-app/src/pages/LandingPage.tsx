import Button from "../components/Button";

type LandingPageProps = {
  signupAction: () => void;
};

const LandingPage = ({ signupAction }: LandingPageProps) => {
  return (
    <>
      <h1>Tweetz</h1>
      <h2>A simple twitter management platform</h2>
      <Button
        onClick={signupAction}
        text="Continue with Google"
        color="darkBlue"
      />
    </>
  );
};

export default LandingPage;
