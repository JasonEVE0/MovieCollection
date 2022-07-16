import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(props){
    if (!props.isAllowed){
        return <Navigate to={props.path} replace={props.replace} />
    }

    return <Outlet />
}

export default ProtectedRoute;