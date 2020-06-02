import { useCallback } from 'react'
import { debounce } from 'lodash'

const useDebounce = (callback: (...args: any) => any, delay: number, dependencies: Array<any> = []) => {
  return useCallback(debounce(callback, delay), dependencies)
}

export default useDebounce