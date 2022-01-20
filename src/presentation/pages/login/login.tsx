import React from 'react'

import LoginHeader from '@/presentation/components/Login-header/login-header'
import Footer from '@/presentation/components/Footer/footer'
import Styles from './login-styles.scss'
import TextField from '@/presentation/components/Textfield/textfield'
import FormStatus from '@/presentation/components/Form-status/form-status'

const Login: React.FC = () => {
  return (
    <div className={Styles.login }>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <TextField type="email" name="email" placeholder="Digite seu email"/>
        <TextField type="password" name="password" placeholder="Digite sua senha"/>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
