/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
import {useAuth0} from '@auth0/auth0-react'
const Profile = () => {
  // TODO: Replace these with functionality from Auth0
 const {user, isLoading} = useAuth0()

  if (isLoading || !user) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  return (
      <div className='max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 text-center'>

        <img src={user.picture} className='py-pw-24 h-24 rounded-full mx-auto mb-4x' alt={`${user.name}'s profile`} />
        <h2 className='text-gratext-2xl font-semibold mb-2y-600'>Name: {user.name}</h2>
        <p className='text-gray-600-px'>Email: {user.email}</p>
        
        
      </div>
)
};

export default Profile;
