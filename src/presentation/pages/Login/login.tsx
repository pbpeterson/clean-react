import { Footer, FormStatus, LoginHeader } from '@/presentation/components'
import TextField from '@/presentation/components/Textfield/textfield'
import React, { useState } from 'react'
import FormContext from '@/presentation/context/formContext'

import Styles from './login-styles.scss'

type FormStateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [formState] = useState<FormStateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login }>
      <LoginHeader />
      <FormContext.Provider value={formState}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <TextField type="email" name="email" placeholder="Digite seu email"/>
          <TextField type="password" name="password" placeholder="Digite sua senha"/>
          <button className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
