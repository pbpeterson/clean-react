import React from 'react'
import Styles from './textfield-styles.scss'

type TextfieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TextField: React.FC<TextfieldProps> = (props: TextfieldProps) => (
  <div className={Styles.inputWrap}>
    <input {...props} />
    <span className={Styles.status}>🔴</span>
  </div>
)

export default TextField
