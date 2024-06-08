/* eslint-disable react/prop-types */

import "./ServiceForm.css";

function ServiceForm({
  name,
  price,
  description,
  duration,
  handleName,
  handlePrice,
  handleDescription,
  handleDuration,
  saveService,
}) {
  return (
    <div className="container">
      <h2>Cadastro de Serviços</h2>
      <form onSubmit={(e) => saveService(e)}>
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
        <label className="form-label" htmlFor="price">
          Preço:
        </label>
        <input
          className="form-input"
          value={price}
          type="number"
          name="price"
          onChange={(e) => handlePrice(e)}
          required
        />
        <label className="form-label" htmlFor="description">
          Descrição:
        </label>
        <input
          className="form-input"
          value={description}
          type="text"
          name="description"
          onChange={(e) => handleDescription(e)}
          required
        />
        <label className="form-label" htmlFor="duration">
          Duração:
        </label>
        <input
          className="form-input"
          value={duration}
          type="number"
          name="duration"
          onChange={(e) => handleDuration(e)}
          required
        />
        <input className="form-submit" type="submit" value="Cadastrar" />
      </form>
    </div>
  );
}

export default ServiceForm;
