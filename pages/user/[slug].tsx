'use client';

import { Avatar, Button, Divider, Link, Tooltip, User } from '@heroui/react';
import { Mail, Verified } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { ArticleCard } from '@/features/article/article-card/article-card.ui';
import { userQueries } from '@/entities/user';
import DefaultLayout from '@/layouts/default';

type Article = { id: string; title: string; excerpt: string; createdAt: string };

type UserData = {
  role: string;
  photo?: string;
  firstName: string;
  username:string,
  lastName: string;
  email: string;
  articles: Article[];
  official?: boolean;
};

const useUserByUsername = (username?: string) => {
  // Пример статики
  const mock: UserData = {
    role: 'author',
    firstName: 'Иван',
    lastName: 'Иванов',
    username: 'ivan',
    email: 'ivan@example.com',
    official: true,
    photo: '',
    articles: [],
  };
  return { data: { data: mock }, isLoading: false, isError: false };
};

export default function Index() {
  const params = useParams() as { username: string };
  const { data: userResp, isLoading, isError } = useUserByUsername(params.username);

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto mt-32 flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-default-500">Загружаем профиль…</p>
      </div>
    );

  if (isError || !userResp) return notFound();

  const user = userResp.data;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <DefaultLayout>

      <section className="relative w-full max-w-[650px] mx-auto rounded-xl border border-default-200 overflow-hidden">
        {/* Cover */}
        <div className="h-36 bg-gradient-to-br from-primary-200 to-primary-400" />

        <div className="relative -mt-14 flex flex-col items-center px-4 pb-6">
          <Avatar
            src={user.photo}
            name={fullName}
            className="w-24 h-24 border-4 border-background"
          />
          <h1 className="mt-3 text-xl font-bold text-foreground flex items-center gap-2">
            {fullName}
            {user.official && (
              <Tooltip content="Официальный аккаунт">
                <Verified className="text-sky-500" size={20} />
              </Tooltip>
            )}
          </h1>
          <p className="text-sm text-default-500">@{params.username}</p>

          <div className="mt-2 text-sm text-default-600">
            Статьи: <span className="font-semibold">{user.articles.length}</span>
          </div>
          <Button
            as={Link}
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}`}
            target="_blank"
            color="primary"
            variant="flat"
            startContent={<Mail size={16} />}
            className="mt-4"
          >
            Написать
          </Button>
        </div>
      </section>

      <h2 className="mt-10 mb-4 text-center text-2xl font-bold text-primary">Статьи</h2>
      {user.articles.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {user.articles.map((a) => (
            <ArticleCard article={a} key={a.id} />
          ))} */}
        </div>
      ) : (
        <p className="text-center text-default-500">Пока нет статей от автора</p>
      )}
    </DefaultLayout>
  );
}