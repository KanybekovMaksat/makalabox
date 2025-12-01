import React, { useState } from 'react';
import {
  Edit2,
  Camera,
  CheckCircle2,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Mail,
  User,
  Briefcase,
  Users,
  TrendingUp,
  Globe,
  Phone,
  Save,
  X,
  Upload,
  Loader2,
  Box,
  Heart,
} from 'lucide-react';
import { userQueries, userTypes } from '@/entities/user';
import { ModalPopup } from '@/widgets/modal-popup';
import {
  Field,
  Form,
  Formik,
  ErrorMessage,
  useFormikContext,
  FormikValues,
} from 'formik';
import DefaultLayout from '@/layouts/default';

export default function ProfilePage() {
  const [editModalActive, setEditModalActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState(false);

  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const {
    mutate: editUser,
    isPending,
    isError: isEditError,
    isSuccess: isEditSuccess,
  } = userQueries.useEditUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold  mb-2">
            Ошибка загрузки профиля
          </h3>
          <p className="text-gray-500">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  const { email, firstName, lastName, username, photo } = userData?.data;
  const fullName = `${firstName} ${lastName}`;

  const stats = [
    { label: 'Статьи', value: '24', icon: Briefcase },
    { label: 'Боксы', value: '2', icon: Box },
    { label: 'Лайки', value: '348', icon: Heart },
  ];

  const skills = ['React', 'TypeScript', 'UI/UX', 'Node.js', 'Figma'];

  return (
    <DefaultLayout>

        <div className="rounded-2xl  overflow-hidden mb-8 border border-gray-200">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <button
              onClick={() => setEditModalActive(true)}
              className="absolute top-4 right-4  text-gray-700 rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
          <div className="px-8 pb-8 pt-0">
            <div className="flex flex-col md:flex-row items-start  gap-6 -mt-16">
              <div className="relative group">
                <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                  {preview || photo ? (
                    <img
                      src={preview || photo}
                      alt={fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <User className="w-16 h-16 text-blue-600" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <Camera className="text-white w-6 h-6" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                      setFileSelected(true);
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold ">{fullName}</h1>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Москва, Россия</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>На платформе с 2023</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold  mb-4">
                        Контактная информация
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium ">{email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="p-2 rounded-lg bg-green-100">
                            <User className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="font-medium ">{username}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className=" rounded-2xl  ">
                    <h3 className="text-lg font-semibold  mb-6">Статистика</h3>
                    <div className="space-y-6">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <div key={stat.label}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-50">
                                  <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-gray-600">
                                  {stat.label}
                                </span>
                              </div>
                              <span className="text-2xl font-bold ">
                                {stat.value}
                              </span>
                            </div>
                            {index < stats.length - 1 && (
                              <hr className="my-6 border-gray-200" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-6">
          <div className="lg:col-span-2  rounded-2xl  p-6 border border-gray-200">
            <h3 className="text-lg font-semibold  mb-6">
              Последняя активность
            </h3>
            <div className="space-y-4">
              {[
                {
                  action: 'Завершил проект "Dashboard Design"',
                  time: '2 часа назад',
                  color: 'blue',
                },
                {
                  action: 'Добавил новый компонент в библиотеку',
                  time: '5 часов назад',
                  color: 'green',
                },
                {
                  action: 'Обновил профильную информацию',
                  time: 'Вчера',
                  color: 'purple',
                },
                {
                  action: 'Получил сертификат React Advanced',
                  time: '3 дня назад',
                  color: 'amber',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div
                    className={`h-2 w-2 rounded-full mt-2 bg-${activity.color}-500`}
                  >
                    <Box />
                  </div>
                  <div className="flex-1">
                    <p className=" group-hover:text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ModalPopup active={editModalActive} setActive={setEditModalActive}>
          <div className="bg-white rounded-2xl p-6 max-w-md mx-auto w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold ">Редактировать профиль</h3>
              <button
                onClick={() => setEditModalActive(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <Formik
              initialValues={{
                email,
                firstName,
                lastName,
                photo: null,
              }}
              validate={validateForm}
              onSubmit={(values) => {
                const formData = new FormData();
                formData.append('email', values.email);
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                if (selectedFile) {
                  formData.append('photo', selectedFile);
                }
                editUser({ user: formData });
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <fieldset disabled={isPending} className="space-y-4">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center mb-4">
                      <label className="relative group cursor-pointer">
                        <div className="h-24 w-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                          {preview || photo ? (
                            <img
                              src={preview || photo}
                              alt={fullName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <User className="w-12 h-12 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="text-white w-6 h-6" />
                        </div>
                        <input
                          id="photo"
                          name="photo"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            if (file) {
                              setSelectedFile(file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                              setFileSelected(true);
                              setFieldValue('photo', file);
                            }
                          }}
                        />
                      </label>
                      {fileSelected && selectedFile && (
                        <p className="text-sm text-gray-500 mt-2">
                          Выбрано: {selectedFile.name}
                        </p>
                      )}
                    </div>

                    {/* Form Fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Имя
                      </label>
                      <Field
                        name="firstName"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Введите имя"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Фамилия
                      </label>
                      <Field
                        name="lastName"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Введите фамилию"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Введите email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    {/* Submit Button */}
                    {isPending ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      </div>
                    ) : (
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setEditModalActive(false)}
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                          Отмена
                        </button>
                        <SubmitButton />
                      </div>
                    )}
                  </fieldset>
                </Form>
              )}
            </Formik>
          </div>
        </ModalPopup>
  
    </DefaultLayout>
  );
}

function SubmitButton() {
  const { isValid, isSubmitting } = useFormikContext();
  return (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
    >
      <Save className="w-5 h-5" />
      Сохранить изменения
    </button>
  );
}

const validateForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Неправильный формат email';
  }

  if (!values.firstName) {
    errors.firstName = 'Обязательное поле';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'Имя должно содержать минимум 2 символа';
  }

  if (!values.lastName) {
    errors.lastName = 'Обязательное поле';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'Фамилия должна содержать минимум 2 символа';
  }

  return errors;
};
