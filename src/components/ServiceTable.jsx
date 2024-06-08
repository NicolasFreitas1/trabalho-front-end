/* eslint-disable react/prop-types */

import classes from "./ServiceTable.module.css";

export default function ServiceTable({ services, deleteService, editService }) {
  const currencyFormatter = (value) => {
    return parseFloat(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const numberFormatter = (value) => {
    return parseFloat(value).toFixed(2).replace(".", ",");
  };

  return (
    <div className={classes.table_container}>
      <h2>Lista de Serviços</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Cod.</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Duração (em dias)</th>
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{currencyFormatter(service.price)}</td>
              <td>{service.description}</td>
              <td>{numberFormatter(service.duration)}</td>
              <td className={classes.actions}>
                <button onClick={() => editService(service.id)}>Editar</button>
                <button onClick={() => deleteService(service.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
