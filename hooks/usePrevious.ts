import * as React from 'react'

const usePrevious = function <T>(value: T): T | undefined {
  const ref = React.useRef<T>()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious