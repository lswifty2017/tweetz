import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const PermissionDenied = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>
        You do not have permission to access the tweet dashboard. Please contact
        support for further support.
      </h1>
      <Button onClick={() => navigate("/get-started")} text="Back to home" />
    </>
  );
};

export default PermissionDenied;
