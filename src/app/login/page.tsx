"use client"
import { ProConfigProvider } from '@ant-design/pro-components';
import Login from '../components/pages/login';

const LoginPage = () => {
  return (
    <ProConfigProvider dark>
      <Login />
    </ProConfigProvider>
  );
};

export default LoginPage