import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

export function useActions(actions: any, deps: [] = []) {
  const dispatch = useDispatch()
  
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch))
      }
      
      return bindActionCreators(actions, dispatch)
    },
    // eslint-disable-next-line
    deps ? [dispatch, ...deps] : [dispatch]
  )
}

export default useActions