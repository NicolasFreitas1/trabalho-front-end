import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);

  const userUrl = "http://localhost:3000/users";

  const getUserByLogin = async (login) => {
    try {
      // Faz a requisição http
      const res = await fetch(userUrl);
      const data = await res.json();
      // Carrega os dados no formulário para edição:
      const userLogin = data.find((user) => {
        return user.login == login;
      });

      if (userLogin === undefined) {
        setError("Usuário não encontrado");
        return;
      }

      setUserLogin(userLogin.login);
      setUserPassword(userLogin.password);
      setError(null);

      return userLogin;
    } catch (err) {
      console.log("DEU ERRO", err);
      setError("Falha ao realizar o login");
    }
  };

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    await getUserByLogin(login);

    if (userPassword !== password) {
      setError("Usuário não encontrado");
      return;
    }

    setError(null);
    navigate("/products");
  };

  return (
    <>
      <h2>Página de login</h2>
      <LoginForm
        login={login}
        password={password}
        handleLogin={handleLogin}
        handlePassword={handlePassword}
        loginUser={loginUser}
        error={error}
      />
    </>
  );
}

export default Login;
