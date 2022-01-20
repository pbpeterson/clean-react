import formContext from '@/presentation/context/formContext'
import React, { useContext, useState } from 'react'
import Styles from './textfield-styles.scss'

type TextfieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TextField: React.FC<TextfieldProps> = (props: TextfieldProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const { errorState } = useContext(formContext)

  const getTitle = () => {
    return errorState[props.name]
  }

  const getStatus = (): string => {
    return '🔴'
  }

  return (
  <div className={Styles.inputWrap}>
    <input {...props} readOnly onFocus={enableInput} />
    <span title={getTitle()} data-testid={`${props.name}-status`} className={Styles.status}>{getStatus()}</span>
  </div>
  )
}

export default TextField
