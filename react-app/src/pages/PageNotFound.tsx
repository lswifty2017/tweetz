import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>404 Page not found</h1>
      <Button onClick={() => navigate("/get-started")} text="Back to home" />
    </>
  );
};

export default PageNotFound;
