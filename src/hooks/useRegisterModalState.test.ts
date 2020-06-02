import { produce } from 'immer'
import { renderHook, act } from '@testing-library/react-hooks'
import useRegisterModalState, { registerModalInitialState } from './useRegisterModalState'

describe('the useRegisterModalState hook', () => {
  test('it should have an initial state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    
    expect(result.current.state).toEqual(registerModalInitialState)
  })
  
  test('it should be able to set loading state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    
    act(() => {
      result.current.actionCreators.setLoading(true)
    })
    
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.loading = true
    }))
  })
  
  test('it should be able to set name value state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    const newValue = 'John Walker'
    
    act(() => {
      result.current.actionCreators.setNameValue(newValue)
    })
  
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.form.name.value = newValue
    }))
  })
  
  test('it should be able to set name error state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    const newValue = 'Some error'
    
    act(() => {
      result.current.actionCreators.setNameError(newValue)
    })
    
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.form.name.error = newValue
    }))
  })
  
  test('it should be able to set email value state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    const newValue = 'john@example.com'
    
    act(() => {
      result.current.actionCreators.setEmailValue(newValue)
    })
    
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.form.email.value = newValue
    }))
  })
  
  test('it should be able to set email error state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    const newValue = 'Some error'
    
    act(() => {
      result.current.actionCreators.setEmailError(newValue)
    })
    
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.form.email.error = newValue
    }))
  })
  
  test('it should be able to set password value state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    const newValue = 'test123#'
    
    act(() => {
      result.current.actionCreators.setPasswordValue(newValue)
    })
    
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.form.password.value = newValue
    }))
  })
  
  test('it should be able to set password error state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    const newValue = 'Some error'
    
    act(() => {
      result.current.actionCreators.setPasswordError(newValue)
    })
    
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.form.password.error = newValue
    }))
  })
  
  test('it should be able to reset form state', async () => {
    const { result } = renderHook(() => useRegisterModalState())
    const newName = 'John Walker'
    const newEmail = 'john@example.com'
    const newPassword = 'test123#'
    const newError = 'Some error'
    
    act(() => {
      result.current.actionCreators.setNameValue(newName)
      result.current.actionCreators.setNameError(newError)
      result.current.actionCreators.setEmailValue(newEmail)
      result.current.actionCreators.setEmailError(newError)
      result.current.actionCreators.setPasswordValue(newPassword)
      result.current.actionCreators.setPasswordError(newError)
    })
    
    expect(result.current.state).toEqual(produce(registerModalInitialState, draft => {
      draft.form.name.value = newName
      draft.form.name.error = newError
      draft.form.email.value = newEmail
      draft.form.email.error = newError
      draft.form.password.value = newPassword
      draft.form.password.error = newError
    }))
  
    act(() => {
      result.current.actionCreators.resetForm()
    })
  
    expect(result.current.state.form).toEqual({ ...registerModalInitialState.form })
  })
})