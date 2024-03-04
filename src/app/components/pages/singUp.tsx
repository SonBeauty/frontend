"use client"

import { Modal, Button } from 'antd';
import { useState } from 'react';
import { ProFormCaptcha, ProFormText, } from '@ant-design/pro-components';
import { LockOutlined, MobileOutlined, UserOutlined, } from '@ant-design/icons';
import { theme } from 'antd'
import { signUpRequest } from '@/store/action/authAction';
import { useDispatch } from "react-redux";

interface RegisterModalProps {
  visible: boolean;
  onCancel: () => void;
}
const RegisterModal: React.FC<RegisterModalProps> = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    dob: ''
  });
  const handleChange = (data: any) => {
    const name = data?.target?.id
    const value = data?.target?.value
    setFormData(prevState => ({

      ...prevState,
      [name]: value
    }));
  };
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const handleOk = () => {
    dispatch(signUpRequest(formData))
    setLoading(true)
    setTimeout(() => {
      setLoading(false), onCancel()
    }, 3000);
  };

  return (
    <div>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <ProFormText
          name="username"
          placeholder={'username'}
          getValueFromEvent={value => handleChange(value)}
          fieldProps={{
            size: 'large',
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!',
            },
          ]}
        />
        <ProFormText
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]} // Thuộc tính required
          placeholder="your name"
          getValueFromEvent={value => handleChange(value)}
          fieldProps={{
            size: 'large',
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
        />
        <ProFormText
          name="dob"
          placeholder={'dob'}
          getValueFromEvent={value => handleChange(value)}
          fieldProps={{
            size: 'large',
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập ngày sinh',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          getValueFromEvent={value => handleChange(value)}
          fieldProps={{
            size: 'large',
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          placeholder={'password'}
          rules={[
            {
              required: true,
              message: 'vui lòng nhập mật khẩu',
            },
          ]}
        />
      </Modal>
    </div>
  );
}


export default RegisterModal