/* eslint-disable react/prop-types */

import './LoginForm.css'

function LoginForm({login, password, handleLogin, handlePassword, loginUser, error}) {
    return (
        <div className='container'>
        <h2>Realize seu login</h2>
        <form onSubmit={(e) => loginUser(e)}>
            <label className='form-label' htmlFor="login">Login:</label>
            <input className='form-input' value={login} type="text" name="login" onChange={(e) => handleLogin(e)} required/>
            <label className='form-label' htmlFor="password">Senha:</label>
            <input className='form-input' value={password} type="password" name="password" onChange={(e) => handlePassword(e)} required/>
            <input className='form-submit' type="submit" value="Cadastrar" />
        </form>
        {error && (
            <div style={{color: 'red', marginTop: '10px'}}>
                {error}
            </div>
        )}
      </div>
    )
}

export default LoginForm
