import React, { useContext } from 'react'
import { Spinner } from '@/presentation/components'
import Styles from './form-status-styles.scss'
import formContext from '@/presentation/context/formContext'

const FormStatus: React.FC = () => {
  const { formState } = useContext(formContext)
  const { isLoading, mainError } = formState
  return (
    <div className={Styles.errorWrap} data-testid='erroWrap'>
      { isLoading && <Spinner className={Styles.spinner} />}
      { mainError && <span data-testid='main-error' className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
