import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        type="back"
        OnClick={(e) => {
          e.preventDefault();
          navigate(-1); //go on page back when clicked
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default ButtonBack;
