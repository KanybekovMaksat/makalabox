'use client';

import { useEffect } from 'react';
import { Card, Button } from '@heroui/react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Article error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <Card className="p-6 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-danger-500" />
        <h2 className="mt-4 text-xl font-semibold">Ошибка при загрузке статьи</h2>
        <p className="text-neutral-500 mt-1">{error.message || 'Что-то пошло не так'}</p>
        <Button color="primary" variant="flat" className="mt-4" onPress={reset}>
          Попробовать снова
        </Button>
      </Card>
    </div>
  );
}