import classNames from 'classnames'
import * as React from 'react'

export const IconLight = React.memo<JSX.IntrinsicElements['svg']>(({
  className,
  ...rest
}) => {
  return (
    <svg
      width="1.2em"
      height="1.2em"
      viewBox="0 0 32 32"
      className={classNames('icon', className)}
      {...rest}
    >
      <path
        fill="currentColor"
        d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
      ></path>
    </svg>
  )
})

IconLight.displayName = 'IconLight'
