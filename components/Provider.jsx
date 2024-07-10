"use client"

// Import the necessary dependencies
import { SessionProvider } from "next-auth/react"

/**
 * Provider component that wraps the children components with a session provider.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped.
 * @param {Object} props.session - The session object.
 * @returns {JSX.Element} The rendered Provider component.
 */
const Provider = ({ children, session }) => {
  // Render the SessionProvider component and pass the session prop
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

// Export the Provider component as the default export
export default Provider

// Pseudocode
// Define a Provider component that takes children and session as props

//   Return a SessionProvider component
//     Pass the session prop to the SessionProvider
//     Render the children inside the SessionProvider

// Export the Provider component as the default export