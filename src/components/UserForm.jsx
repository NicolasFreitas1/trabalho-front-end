/* eslint-disable react/prop-types */

import "./UserForm.css";

function UserForm({
  name,
  login,
  password,
  email,
  type,
  handleName,
  handleLogin,
  handlePassword,
  handleEmail,
  handleType,
  saveUser,
  error,
}) {
  return (
    <div className="container">
      <h2>Cadastre o usuário</h2>
      <form onSubmit={(e) => saveUser(e)}>
      <label className="form-label" htmlFor="name">
          Nome:
        </label>
        <input
          className="form-input"
          value={name}
          type="text"
          name="name"
          onChange={(e) => handleName(e)}
          required
        />

        <label className="form-label" htmlFor="login">
          Login:
        </label>
        <input
          className="form-input"
          value={login}
          type="text"
          name="login"
          onChange={(e) => handleLogin(e)}
          required
        />
        <label className="form-label" htmlFor="password">
          Senha:
        </label>
        <input
          className="form-input"
          value={password}
          type="password"
          name="password"
          onChange={(e) => handlePassword(e)}
          required
        />
                <label className="form-label" htmlFor="email">
          Email:
        </label>
        <input
          className="form-input"
          value={email}
          type="email"
          name="email"
          onChange={(e) => handleEmail(e)}
          required
        />
                <label className="form-label" htmlFor="type">
          Tipo:
        </label>
        <input
          className="form-input"
          value={type}
          type="type"
          name="type"
          onChange={(e) => handleType(e)}
          required
        />
        <input className="form-submit" type="submit" value="Cadastrar" />
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
}

export default UserForm;
