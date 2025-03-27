import {Navigate,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = () => {
    const {user} = useSelector((state)=>state.auth);
    if(!user){
      return <Navigate to="/login" replace={true} />
    }
    if(!user.isAdmin){
        return <Navigate to="/UserPage" replace={true} />  } 
  return <Outlet />
}

export default ProtectedRoute