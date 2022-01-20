import React, { memo } from 'react'
import Styles from './login-header-styles.scss'
import Logo from '@/presentation/components/Logo/logo'

const LoginHeader: React.FC = () => (
  <header className={Styles.header}>
    <Logo />
    <h3>4Devs - Enquentes para programadores</h3>
  </header>
)

export default memo(LoginHeader)
