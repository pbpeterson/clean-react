import React, { useContext } from 'react'
import Spinner from '@/presentation/components/Spinner/spinner'
import Styles from './form-status-styles.scss'
import formContext from '@/presentation/context/formContext'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(formContext)
  return (
    <div className={Styles.errorWrap} data-testid="erroWrap">
      { isLoading && <Spinner className={Styles.spinner} />}
      { errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
