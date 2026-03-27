import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  return (
    <button
      style={{ float: "right" }}
      onClick={() => navigate("/")}
    >
      Logout
    </button>
  );
}
