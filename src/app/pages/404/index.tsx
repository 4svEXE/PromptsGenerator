import { useNavigate } from "react-router-dom";
import "./index.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button className="not-found__button" onClick={goHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
