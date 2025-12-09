"use client"
import { Spinner } from '@heroui/react';

export default function LoadingArticle() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 flex flex-col items-center">
      <Spinner size="lg" />
      <p className="mt-2 text-sm text-neutral-500">Загрузка статьи…</p>
    </div>
  );
}