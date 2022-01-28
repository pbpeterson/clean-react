import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, FormStatus, LoginHeader } from '@/presentation/components'
import TextField from '@/presentation/components/Textfield/textfield'
import FormContext from '@/presentation/context/formContext'

import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<LoginProps> = ({ validation, authentication }: LoginProps) => {
  const history = useHistory()
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (formState.isLoading) {
        return
      }

      if (formState.emailError || formState.passwordError) {
        return
      }

      setFormState({
        ...formState,
        isLoading: true
      })
      const account = await authentication.auth({
        email: formState.email,
        password: formState.password
      })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setFormState({
        ...formState,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ formState, setFormState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <TextField type="email" name="email" placeholder="Digite seu email"/>
          <TextField type="password" name="password" placeholder="Digite sua senha"/>
          <button data-testid="submit" disabled={!!formState.emailError || !!formState.passwordError} className={Styles.submit} type="submit">Entrar</button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
