import { Link } from "react-router-dom";
import "./NavbarComponent.css";

function NavbarComponent() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Serviços</Link>
        </li>
        <li>
          <Link to="/users">Usuários</Link>
        </li>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        <li className="login-button">
          <Link to="/login" className="login-btn">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
