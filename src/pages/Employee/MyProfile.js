import React from 'react';
import { useAuth } from '../../lib/auth';


const MyProfile = () => {
  const {user} = useAuth
  return (
    <div>MyProfile</div>
  )
}

export default MyProfile