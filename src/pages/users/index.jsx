import { useState, useEffect } from "react";

import "../../App.css";
import UserTable from "../../components/UserTable";
import UserForm from "../../components/UserForm";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";

function Users() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [edit, setEdit] = useState(false);

  const url = "http://localhost:3000/users";

  useEffect(() => {
    // Lista todos os usuários:
    const getUsersList = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    };

    getUsersList();
  }, []);

  const clearForm = () => {
    setName("");
    setLogin("");
    setPassword("");
    setEmail("");
    setType("");
  };

  // Busca apenas um usuários pelo seu id:
  const getUserById = async (id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
    setName(data.name);
    setLogin(data.login);
    setPassword(data.password);
    setId(data.id);
    setEmail(data.email);
    setType(data.type);

    // Habilita edição:
    setEdit(true);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, login, password, email, type }),
    };

    // Cria url para buscar todos ou apenas um usuários
    const save_url = edit ? url + `/${id}` : url;

    // Faz a requisição http
    const res = await fetch(save_url, saveRequestParams);

    // Se for cadastro de usuários novo:
    if (!edit) {
      const newUser = await res.json();
      // Atualização da tabela:
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    // Se for edição/atualização de usuários já cadastrado:
    if (edit) {
      const editedUser = await res.json();
      // Atualização da tabela:
      const editedUserIndex = users.findIndex((user) => user.id === id);
      users[editedUserIndex] = editedUser;
      setUsers(users);
    }

    clearForm();
    setEdit(false);
  };

  const deleteUser = async (id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const deletedUser = await res.json();
    // Atualização da tabela:
    setUsers(users.filter((user) => user.id !== deletedUser.id));
  };

  // Mudança dos estados ao digitar no formulário:
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <NavbarComponent />
      <div>
        {users.length > 0 ? (
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editUser={getUserById}
          />
        ) : (
          <h3 style={{ marginBottom: "30px" }}>Nenhum usuário cadastrado...</h3>
        )}
      </div>

      <UserForm
        name={name}
        login={login}
        password={password}
        handleName={handleName}
        handleLogin={handleLogin}
        handlePassword={handlePassword}
        saveUser={saveUser}
      />

      <FooterComponent />
    </>
  );
}

export default Users;
