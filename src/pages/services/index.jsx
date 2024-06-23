import { useEffect, useState } from "react";

import "../../App.css";
import ServiceForm from "../../components/ServiceForm";
import ServiceTable from "..//../components/ServiceTable";

function Services() {
  const [services, setServices] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [edit, setEdit] = useState(false);

  const url = "http://localhost:3000/services";

  useEffect(() => {
    // Lista todos os produtos:
    const getServicesList = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setServices(data);
    };

    getServicesList();
  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setDuration("");
  };

  // Busca apenas um produto pelo seu id:
  const getServiceById = async (id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
    setName(data.name);
    setPrice(data.price);
    setDescription(data.description);
    setDuration(data.duration);
    setId(data.id);

    // Habilita edição:
    setEdit(true);
  };

  const saveService = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, price, description, duration }),
    };

    // Cria url para buscar todos ou apenas um produto
    const save_url = edit ? url + `/${id}` : url;

    // Faz a requisição http
    const res = await fetch(save_url, saveRequestParams);

    // Se for cadastro de produto novo:
    if (!edit) {
      const newService = await res.json();
      // Atualização da tabela:
      setServices((prevServices) => [...prevServices, newService]);
    }

    // Se for edição/atualização de produto já cadastrado:
    if (edit) {
      const editedService = await res.json();
      // Atualização da tabela:
      const editedServiceIndex = services.findIndex(
        (service) => service.id === id
      );
      services[editedServiceIndex] = editedService;
      setServices(services);
    }

    clearForm();
    setEdit(false);
  };

  const deleteService = async (id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const deletedService = await res.json();
    // Atualização da tabela:
    setServices(services.filter((service) => service.id !== deletedService.id));
  };

  // Mudança dos estados ao digitar no formulário:
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <>
      <div>
        {services.length > 0 ? (
          <ServiceTable
            services={services}
            deleteService={deleteService}
            editService={getServiceById}
          />
        ) : (
          <h3 style={{ marginBottom: "30px" }}>Nenhum produto cadastrado...</h3>
        )}
      </div>

      <ServiceForm
        name={name}
        price={price}
        description={description}
        duration={duration}
        handleName={handleName}
        handlePrice={handlePrice}
        handleDescription={handleDescription}
        handleDuration={handleDuration}
        saveService={saveService}
      />
    </>
  );
}

export default Services;
