"use client"

import { LockOutlined, MobileOutlined, UserOutlined, } from '@ant-design/icons';
import { LoginFormPage, ProFormCaptcha, ProFormText, } from '@ant-design/pro-components';
import { Button, Divider, Tabs, message, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import RegisterModal from './singUp';
import { useDispatch } from 'react-redux';
import { signInRequest } from '@/store/action/authAction';
import { useAppSelector } from '@/store';

type LoginType = 'phone' | 'account';

const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();
  const [logged, setLogged] = useState(false)
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch()
  const userInfo = useAppSelector((state: any) => state?.auth?.user)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogin = async (value: any) => {
    await dispatch(signInRequest(value))
  }

  useEffect(() => {
    if (userInfo !== null) {
      setLogged(true)
      router?.push('/')
    } else { setLogged(false) };
  }, [userInfo])

  useEffect(() => {
    const spantElement = document.querySelector('.ant-btn > span')
    if (spantElement) {
      spantElement.textContent = 'Login'
    }
    setLogged(false)
  }, [])

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="blog.jpg"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Blog"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        onFinish={handleLogin}
        subTitle=""
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                Or Sign up now!
              </span>
            </Divider>
            <Button
              type="primary"
              style={{ width: '100%' }}
              onClick={showModal}
            >
              Sign Up
            </Button>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'username password'} />
          <Tabs.TabPane key={'phone'} tab={'phone number'} disabled />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
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
              placeholder={'username'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
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

          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
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
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
      </LoginFormPage>
      <RegisterModal visible={isModalVisible} onCancel={handleCancel} />
    </div>
  );
};

export default Login