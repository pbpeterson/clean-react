import formContext from '@/presentation/context/formContext'
import React, { useContext } from 'react'
import Styles from './textfield-styles.scss'

type TextfieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TextField: React.FC<TextfieldProps> = (props: TextfieldProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const { formState, setFormState } = useContext(formContext)

  const getTitle = (): string => {
    return formState[`${props.name}Error`] || 'Tudo certo!'
  }

  const getStatus = (): string => {
    return formState[`${props.name}Error`] ? '🔴' : '🟢'
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  return (
  <div className={Styles.inputWrap}>
    <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange}/>
    <span title={getTitle()} data-testid={`${props.name}-status`} className={Styles.status}>{getStatus()}</span>
  </div>
  )
}

export default TextField
