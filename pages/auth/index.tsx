'use client';

import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Tabs, Tab } from '@heroui/tabs';
import { Box, Eye, EyeOff } from 'lucide-react';
import { formikContract } from '@/shared/lib/zod';
import NextLink from "next/link";
import { userContracts, userQueries, userTypes } from '@/entities/user';

export default function Auth() {
  const [loginVisibility, setLoginVisibility] = useState(false);
  const [registerVisibility, setRegisterVisibility] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  // Состояния для форм
  const [loginData, setLoginData] = useState<userTypes.LoginUserDto>({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState<userTypes.CreateUserSchema & { confirmPassword: string }>({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  // Ошибки валидации
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  // Мутации из React Query
  const {
    mutate: loginToken,
    isPending: isLoginPending,
    isError: isLoginError,
  } = userQueries.useGetTokenMutation();

  const {
    mutate: registerUser,
    isPending: isRegisterPending,
    isSuccess: isRegisterSuccess,
    isError: isRegisterError,
  } = userQueries.useRegisterMutation();

  // Валидация форм (взято из старого кода)
  const validateLoginForm = formikContract(userContracts.LoginUserDtoSchema);
  const validateRegisterForm = (values: typeof registerData) => {
    const errors: Record<string, string> = {};

    if (!values.email) {
      errors.email = 'Обязательное поле';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Неправильный формат email';
    }

    if (!values.username) {
      errors.username = 'Обязательное поле';
    } else if (!/^[a-z0-9_.]+$/.test(values.username)) {
      errors.username = 'Можно использовать символы a-z, 0-9 и _.';
    }

    if (!values.firstName) {
      errors.firstName = 'Обязательное поле';
    }

    if (!values.lastName) {
      errors.lastName = 'Обязательное поле';
    }

    if (!values.password) {
      errors.password = 'Обязательное поле';
    } else if (values.password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Обязательное поле';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }

    return errors;
  };

  // Обработчики сабмита
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLoginForm(loginData);
    
    if (Object.keys(errors).length === 0) {
      setLoginErrors({});
      loginToken({ user: loginData });
    } else {
      setLoginErrors(errors);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateRegisterForm(registerData);
    
    if (Object.keys(errors).length === 0) {
      setRegisterErrors({});
      
      // Убираем confirmPassword перед отправкой
      const { confirmPassword, ...userData } = registerData;
      registerUser({ user: userData });
      
      // Сохраняем в localStorage (если нужно)
      localStorage.setItem('email', registerData.email);
      localStorage.setItem('password', registerData.password);
    } else {
      setRegisterErrors(errors);
    }
  };

  // Обработчики изменения полей
  const handleLoginChange = (field: keyof typeof loginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    // Очищаем ошибку при изменении
    if (loginErrors[field]) {
      setLoginErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegisterChange = (field: keyof typeof registerData, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
    // Очищаем ошибку при изменении
    if (registerErrors[field]) {
      setRegisterErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Если регистрация успешна - показываем сообщение
  if (isRegisterSuccess && activeTab === 'register') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <h1 className="text-2xl flex items-center gap-1 mb-3 font-bold text-center">
          <Box />
          Makalabox
        </h1>
        <Card className="w-full max-w-md">
          <CardBody className="text-center p-8">
            <h2 className="text-xl font-bold mb-4">Почти готово!</h2>
            <p className="mb-6">
              На вашу почту <strong>{registerData.email}</strong> отправлено письмо 
              для подтверждения регистрации.
            </p>
            <Button
              onPress={() => {
                setActiveTab('login');
                // Сброс состояния регистрации
                setRegisterData({
                  email: '',
                  username: '',
                  firstName: '',
                  lastName: '',
                  password: '',
                  confirmPassword: '',
                });
              }}
              className="w-full bg-black text-white"
            >
              Перейти к входу
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <h1 className="text-2xl flex items-center gap-1 mb-3 font-bold text-center">
        <Box />
        Makalabox
      </h1>
      <Card className="w-full max-w-md shadow-none">
        <CardHeader className="flex-col py-4">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key.toString())}
            aria-label="Auth tabs"
            className="w-full px-4"
            classNames={{
              tabList: 'grid grid-cols-2 w-full',
              cursor: 'w-full',
              tab: 'max-w-full'
            }}
          >
            <Tab key="login" title="Вход" className="p-4">
              <CardBody className="space-y-6 p-2 min-h-[550px]">
                {isLoginError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">
                    Ошибка при выполнении запроса. Проверьте данные.
                  </div>
                )}
                
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Псевдоним или email
                    </label>
                    <Input
                      type="text"
                      placeholder="name@example.com или username"
                      value={loginData.email}
                      onChange={(e) =>
                        handleLoginChange('email', e.target.value)
                      }
                      required
                      className="w-full"
                      isInvalid={!!loginErrors.email}
                      errorMessage={loginErrors.email}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Пароль</label>
                      <NextLink
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Забыли пароль?
                      </NextLink>
                    </div>
                    <Input
                      type={loginVisibility ? 'text' : 'password'}
                      placeholder="*********"
                      value={loginData.password}
                      onChange={(e) =>
                        handleLoginChange('password', e.target.value)
                      }
                      required
                      className="w-full"
                      isInvalid={!!loginErrors.password}
                      errorMessage={loginErrors.password}
                      endContent={
                        <button
                          type="button"
                          onClick={() => setLoginVisibility(!loginVisibility)}
                          className="focus:outline-none"
                        >
                          {loginVisibility ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    isLoading={isLoginPending}
                    className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    {isLoginPending ? 'Выполняется вход...' : 'Войти'}
                  </Button>
                </form>

                <Divider className="my-4" />

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="bordered"
                    className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Google
                  </Button>

                  <Button
                    variant="bordered"
                    className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Bilimtrack ID
                  </Button>
                </div>
                
                <div className="text-center text-xs text-gray-500 w-full">
                  <p>
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a
                      href="#"
                      className="underline hover:text-gray-700 transition-colors"
                    >
                      Условиями обслуживания
                    </a>{' '}
                    и{' '}
                    <a
                      href="#"
                      className="underline hover:text-gray-700 transition-colors"
                    >
                      Политикой конфиденциальности
                    </a>
                    .
                  </p>
                </div>
              </CardBody>
            </Tab>

            <Tab key="register" title="Регистрация" className="p-4">
              <CardBody className="space-y-6 p-1 min-h-[480px]">
                {isRegisterError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">
                    Ошибка при выполнении запроса
                  </div>
                )}
                
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email*</label>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={registerData.email}
                      onChange={(e) =>
                        handleRegisterChange('email', e.target.value)
                      }
                      required
                      className="w-full"
                      isInvalid={!!registerErrors.email}
                      errorMessage={registerErrors.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Имя*</label>
                      <Input
                        type="text"
                        placeholder="Иван"
                        value={registerData.firstName}
                        onChange={(e) =>
                          handleRegisterChange('firstName', e.target.value)
                        }
                        required
                        className="w-full"
                        isInvalid={!!registerErrors.firstName}
                        errorMessage={registerErrors.firstName}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Фамилия*</label>
                      <Input
                        type="text"
                        placeholder="Иванов"
                        value={registerData.lastName}
                        onChange={(e) =>
                          handleRegisterChange('lastName', e.target.value)
                        }
                        required
                        className="w-full"
                        isInvalid={!!registerErrors.lastName}
                        errorMessage={registerErrors.lastName}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Псевдоним*</label>
                    <Input
                      type="text"
                      placeholder="username"
                      value={registerData.username}
                      onChange={(e) =>
                        handleRegisterChange('username', e.target.value)
                      }
                      required
                      className="w-full"
                      isInvalid={!!registerErrors.username}
                      errorMessage={registerErrors.username}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Пароль*</label>
                      <Input
                        type={registerVisibility ? 'text' : 'password'}
                        placeholder="*********"
                        value={registerData.password}
                        onChange={(e) =>
                          handleRegisterChange('password', e.target.value)
                        }
                        required
                        className="w-full"
                        isInvalid={!!registerErrors.password}
                        errorMessage={registerErrors.password}
                        endContent={
                          <button
                            type="button"
                            onClick={() => setRegisterVisibility(!registerVisibility)}
                            className="focus:outline-none"
                          >
                            {registerVisibility ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Подтверждение пароля*
                      </label>
                      <Input
                        type={registerVisibility ? 'text' : 'password'}
                        placeholder="*********"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          handleRegisterChange('confirmPassword', e.target.value)
                        }
                        required
                        className="w-full"
                        isInvalid={!!registerErrors.confirmPassword}
                        errorMessage={registerErrors.confirmPassword}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    isLoading={isRegisterPending}
                    className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    {isRegisterPending ? 'Регистрация...' : 'Зарегистрироваться'}
                  </Button>
                </form>

                <Divider className="my-4" />

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="bordered"
                    className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Google
                  </Button>

                  <Button
                    variant="bordered"
                    className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Bilimtrack ID
                  </Button>
                </div>
                
                <div className="text-center text-xs text-gray-500 w-full">
                  <p>
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a
                      href="#"
                      className="underline hover:text-gray-700 transition-colors"
                    >
                      Условиями обслуживания
                    </a>{' '}
                    и{' '}
                    <a
                      href="#"
                      className="underline hover:text-gray-700 transition-colors"
                    >
                      Политикой конфиденциальности
                    </a>
                    .
                  </p>
                </div>
              </CardBody>
            </Tab>
          </Tabs>
        </CardHeader>
      </Card>
      
      <p className="text-sm mt-4 text-center">
        {activeTab === 'login' ? (
          <>
            Нет аккаунта?{' '}
            <button
              onClick={() => setActiveTab('register')}
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Зарегистрируйтесь
            </button>
          </>
        ) : (
          <>
            Уже есть аккаунт?{' '}
            <button
              onClick={() => setActiveTab('login')}
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Войдите
            </button>
          </>
        )}
      </p>
    </div>
  );
}