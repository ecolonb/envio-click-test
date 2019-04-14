import React from 'react';
import { Redirect } from 'react-router-dom';
export default function({ component: Component, ...propsRcv }) {
  const { loggedUser } = propsRcv;
  return loggedUser ? <Component {...propsRcv} /> : <Redirect to="/login" />;
}
