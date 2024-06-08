import LoginForm from '../../components/LoginForm';
import { useState, useEffect } from 'react'

function Login() {  
    const [login, setLogin] = useState ("")
    const [userLogin, setUserLogin] = useState ("")
    const [password, setPassword] = useState ("")
    const [userPassword, setUserPassword] = useState ("")
    const [error, setError] = useState (null)

    const userUrl = 'http://localhost:3000/users'

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
     <h2>Página de login</h2>
      <LoginForm login={login} password={password} handleLogin={handleLogin} handlePassword={handlePassword} loginUser={loginUser} error={error}/>
    </>
  )
}

export default Login
