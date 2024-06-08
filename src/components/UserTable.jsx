/* eslint-disable react/prop-types */

import classes from "./UserTable.module.css";

export default function UserTable({ users, deleteUser, editUser }) {
  return (
    <div className={classes.table_container}>
      <h2>Lista de Usuários</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Cod.</th>
            <th>Nome</th>
            <th>Login</th>
            <th>E-mail</th>
            <th>Tipo</th>
            
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td className={classes.actions}>
                <button onClick={() => editUser(user.id)}>Editar</button>
                <button onClick={() => deleteUser(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
