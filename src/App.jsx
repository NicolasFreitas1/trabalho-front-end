import { useState, useEffect } from 'react'

import './App.css'
import ProductTable from './components/ProductTable'
import ProductForm from './components/ProductForm'
import LoginForm from './components/LoginForm';

// CRUD COM JSON SERVER

function App() {  
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);
  const [login, setLogin] = useState ("")
  const [userLogin, setUserLogin] = useState ("")
  const [password, setPassword] = useState ("")
  const [userPassword, setUserPassword] = useState ("")
  const [error, setError] = useState (null)


  const url = 'http://localhost:3000/products';
  const userUrl = 'http://localhost:3000/users'

  useEffect(() => {
    // Lista todos os produtos:
    const getProductsList = async() => {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }

    getProductsList();

  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
  }

  // Busca apenas um produto pelo seu id:
  const getProductById = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
    setName(data.name)
    setPrice(data.price);
    setStock(data.stock);
    setId(data.id);

    // Habilita edição:
    setEdit(true);
  }

  const getUserByLogin = async(login) => {
    try{
    // Faz a requisição http
    const res = await fetch(userUrl);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
console.log('usuarios',data);
      console.log('login',login);
    const userLogin = data.find((user) => {
      console.log('LOGIN DOS USUARIOS',user.login)
      console.log('teste ',String(user.login).toLowerCase() == login.toLowerCase() );
      return user.login == login
    })

console.log('achou usuario', userLogin);

      if(userLogin === undefined) {
        setError("Usuario não encontrado")
        return
      }

    setUserLogin(userLogin.login)
    setUserPassword(userLogin.password);
    setError(null)
    }catch(err){
      console.log('DEU ERRO', err);
      setError("Falha ao realizar o login")
    }

  }

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, price, stock })
    }

    // Cria url para buscar todos ou apenas um produto
    const save_url = edit ? url + `/${id}` : url;

    // Faz a requisição http
    const res = await fetch(save_url, saveRequestParams);

    // Se for cadastro de produto novo:
    if(!edit) { 
      const newProduct = await res.json();
      // Atualização da tabela:
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    // Se for edição/atualização de produto já cadastrado:
    if(edit) {       
      const editedProduct = await res.json();
      // Atualização da tabela:
      const editedProductIndex = products.findIndex(prod => prod.id === id);
      products[editedProductIndex] = editedProduct;
      setProducts(products);
   }

    clearForm();
    setEdit(false);
  }

  const deleteProduct = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    });

    const deletedProduct = await res.json();
    // Atualização da tabela:
    setProducts(products.filter(prod => prod.id !== deletedProduct.id));
  }

  // Mudança dos estados ao digitar no formulário:
  const handleName = (e) => {setName(e.target.value)};
  const handlePrice = (e) => {setPrice(e.target.value)};
  const handleStock = (e) => {setStaock(e.target.value)};

  const handleLogin = (e) => {setLogin(e.target.value)};
  const handlePassword = (e) => {setPassword(e.target.value)};

  const loginUser = async (e) => {
    e.preventDefault();

await getUserByLogin(login)
  
    console.log(userLogin);
    console.log(userPassword)

    console.log(e)
  }


  return (
    <>
     <h2>CRUD com JSON Server</h2>
     <div>
        {
          products.length > 0 ? <ProductTable products={products} deleteProduct={deleteProduct} editProduct={getProductById} /> : <h3 style={{marginBottom: '30px'}}>Nenhum produto cadastrado...</h3>
        }
      </div>

      <ProductForm name={name} price={price} stock={stock} handleName={handleName} handlePrice={handlePrice} handleStock={handleStock} saveProduct={saveProduct}/>
      <LoginForm login={login} password={password} handleLogin={handleLogin} handlePassword={handlePassword} loginUser={loginUser} error={error}/>
    </>
  )
}

export default App
