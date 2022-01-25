import { Footer, FormStatus, LoginHeader } from '@/presentation/components'
import TextField from '@/presentation/components/Textfield/textfield'
import React, { useEffect, useState } from 'react'
import FormContext from '@/presentation/context/formContext'

import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'

type LoginProps = {
  validation: Validation
}

const Login: React.FC<LoginProps> = ({ validation }: LoginProps) => {
  const [formState, setFormState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setFormState({
      ...formState,
      emailError: validation.validate('email', formState.email),
      passwordError: validation.validate('password', formState.password)

    })
  }, [formState.email, formState.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setFormState({
      ...formState,
      isLoading: true
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ formState, setFormState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <TextField type="email" name="email" placeholder="Digite seu email"/>
          <TextField type="password" name="password" placeholder="Digite sua senha"/>
          <button disabled={!!formState.emailError || !!formState.password} className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
