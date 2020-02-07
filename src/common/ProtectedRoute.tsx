import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = {
    redirect: string,
    isAllowed: boolean
} & RouteProps

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirect, 
  isAllowed, 
  ...rest 
}: ProtectedRouteProps) => {
  return (
    <React.Fragment>
      {isAllowed ? 
        <Route {...rest} /> : 
        <Redirect to={{ pathname: redirect }} />
      }
    </React.Fragment>
  );
};

export default ProtectedRoute;