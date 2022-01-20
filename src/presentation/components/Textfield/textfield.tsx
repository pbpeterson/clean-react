import React from 'react'
import Styles from './textfield-styles.scss'

type TextfieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TextField: React.FC<TextfieldProps> = (props: TextfieldProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
  <div className={Styles.inputWrap}>
    <input {...props} readOnly onFocus={enableInput} />
    <span className={Styles.status}>🔴</span>
  </div>
  )
}

export default TextField
