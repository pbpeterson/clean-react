import React, { useContext } from 'react'
import Spinner from '@/presentation/components/Spinner/spinner'
import Styles from './form-status-styles.scss'
import formContext from '@/presentation/context/formContext'

const FormStatus: React.FC = () => {
  const { formState } = useContext(formContext)
  const { isLoading, mainError } = formState
  return (
    <div className={Styles.errorWrap} data-testid="erroWrap">
      { isLoading && <Spinner className={Styles.spinner} />}
      { mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
