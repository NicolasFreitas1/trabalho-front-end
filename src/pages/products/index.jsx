import { useEffect, useState } from "react";
import "../../App.css";
import ProductForm from "../../components/ProductForm";
import ProductTable from "..//../components/ProductTable";

function Products() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const url = "http://localhost:3000/products";

  useEffect(() => {
    const getProductsList = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };

    getProductsList();
  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
  };

  const getProductById = async (id) => {
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    setName(data.name);
    setPrice(data.price);
    setStock(data.stock);
    setId(data.id);
    setEdit(true);
    setShowForm(true); // Mostrar formulário ao buscar produto
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, price, stock }),
    };

    const save_url = edit ? url + `/${id}` : url;

    const res = await fetch(save_url, saveRequestParams);

    if (!edit) {
      const newProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    if (edit) {
      const editedProduct = await res.json();
      const editedProductIndex = products.findIndex((prod) => prod.id === id);
      products[editedProductIndex] = editedProduct;
      setProducts(products);
    }

    clearForm();
    setEdit(false);
    setShowForm(false); // Esconder formulário após salvar
  };

  const deleteProduct = async (id) => {
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const deletedProduct = await res.json();
    setProducts(products.filter((prod) => prod.id !== deletedProduct.id));
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleStock = (e) => {
    setStock(e.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      clearForm(); // Limpa o formulário ao alternar para exibir
    }
  };

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
          onClick={toggleForm}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          {showForm ? "Mostrar apenas a tabela" : "Adicionar/Editar"}
        </button>
      </div>

      {showForm ? (
        <ProductForm
          name={name}
          price={price}
          stock={stock}
          handleName={handleName}
          handlePrice={handlePrice}
          handleStock={handleStock}
          saveProduct={saveProduct}
        />
      ) : (
        <div>
          {products.length > 0 ? (
            <ProductTable
              products={products}
              deleteProduct={deleteProduct}
              editProduct={getProductById}
            />
          ) : (
            <h3 style={{ marginBottom: "30px" }}>
              Nenhum produto cadastrado...
            </h3>
          )}
        </div>
      )}
    </>
  );
}

export default Products;
