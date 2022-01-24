type LandingPageProps = {
  signupAction: () => void;
};

const LandingPage = ({ signupAction }: LandingPageProps) => {
  return (
    <>
      <h1>Tweetz</h1>
      <h2>A simple twitter management platform</h2>
      <button onClick={signupAction}>Continue with Google</button>
    </>
  );
};

export default LandingPage;
