import {
  SET_EMAIL_VALUE,
  SET_LOADING,
  SET_NAME_ERROR,
  SET_NAME_VALUE,
  SET_EMAIL_ERROR,
  SET_PASSWORD_VALUE,
  SET_PASSWORD_ERROR,
  RESET_FORM
} from '../types/actionTypes'
import {
  SetNameValueAction,
  SetLoadingAction,
  SetNameErrorAction,
  SetEmailValueAction,
  SetEmailErrorAction,
  SetPasswordValueAction,
  SetPasswordErrorAction,
  ResetFormAction
} from '../types/actions'
import { useCallback, useReducer } from 'react'

type RegisterModalState = {
  loading: boolean
  form: {
    name: {
      value: string
      error: string
    }
    email: {
      value: string
      error: string
    }
    password: {
      value: string
      error: string
    }
  }
}

type RegisterModalAction = SetLoadingAction |
SetNameValueAction |
SetNameErrorAction |
SetEmailValueAction |
SetEmailErrorAction |
SetPasswordValueAction |
SetPasswordErrorAction |
ResetFormAction


export const registerModalInitialState: RegisterModalState = {
  loading: false,
  form: {
    name: {
      value: '',
      error: ''
    },
    email: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    }
  }
}

const registerModalReducer = (state: RegisterModalState, action: RegisterModalAction): RegisterModalState => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case SET_NAME_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          name: {
            ...state.form.name,
            value: action.value
          }
        }
      }
    case SET_NAME_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          name: {
            ...state.form.name,
            error: action.error
          }
        }
      }
    case SET_EMAIL_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          email: {
            ...state.form.email,
            value: action.value
          }
        }
      }
    case SET_EMAIL_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          email: {
            ...state.form.email,
            error: action.error
          }
        }
      }
    case SET_PASSWORD_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          password: {
            ...state.form.password,
            value: action.value
          }
        }
      }
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          password: {
            ...state.form.password,
            error: action.error
          }
        }
      }
    case RESET_FORM:
      return {
        ...state,
        form: { ...registerModalInitialState.form }
      }
    default:
      throw new Error('Unknown action type')
  }
}

const useRegisterModalState = () => {
  const [state, dispatch] = useReducer(registerModalReducer, { ...registerModalInitialState })
  
  const setLoading = useCallback((loading: boolean) => {
    dispatch({
      type: SET_LOADING,
      loading
    })
  }, [dispatch])
  const setNameValue = useCallback((value: string) => {
    dispatch({
      type: SET_NAME_VALUE,
      value
    })
  }, [dispatch])
  const setNameError = useCallback((error: string) => {
    dispatch({
      type: SET_NAME_ERROR,
      error
    })
  }, [dispatch])
  const setEmailValue = useCallback((value: string) => {
    dispatch({
      type: SET_EMAIL_VALUE,
      value
    })
  }, [dispatch])
  const setEmailError = useCallback((error: string) => {
    dispatch({
      type: SET_EMAIL_ERROR,
      error
    })
  }, [dispatch])
  const setPasswordValue = useCallback((value: string) => {
    dispatch({
      type: SET_PASSWORD_VALUE,
      value
    })
  }, [dispatch])
  const setPasswordError = useCallback((error: string) => {
    dispatch({
      type: SET_PASSWORD_ERROR,
      error
    })
  }, [dispatch])
  const resetForm = useCallback(() => {
    dispatch({
      type: RESET_FORM
    })
  }, [dispatch])
  
  const actionCreators = {
    setLoading,
    setNameValue,
    setNameError,
    setEmailValue,
    setEmailError,
    setPasswordValue,
    setPasswordError,
    resetForm
  }
  
  return {
    state,
    actionCreators
  }
}

export default useRegisterModalState