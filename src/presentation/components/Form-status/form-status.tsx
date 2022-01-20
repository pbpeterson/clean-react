import React, { useContext } from 'react'
import Spinner from '@/presentation/components/Spinner/spinner'
import Styles from './form-status-styles.scss'
import formContext from '@/presentation/context/formContext'

const FormStatus: React.FC = () => {
  const { formState, errorState } = useContext(formContext)
  const {isLoading, errorMessage} = formState
  return (
    <div className={Styles.errorWrap} data-testid="erroWrap">
      { isLoading && <Spinner className={Styles.spinner} />}
      { errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}

export default FormStatus
