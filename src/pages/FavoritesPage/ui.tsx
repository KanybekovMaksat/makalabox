import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { FavoriteArticlesList } from '~widgets/articles-list';

export function FavoritesPage() {
  return (
    <Container maxWidth="md" className="md:mx-auto">
      <Helmet prioritizeSeoTags>
        <title>Makalabox - Избранные</title>
        <meta
          name="description"
          content="Makalabox.com — платформа для публикации и обмена статьями на разнообразные темы. Присоединяйтесь к нашему сообществу, делитесь знаниями и читайте качественный контент от экспертов и энтузиастов."
        />

        <meta property="og:title" content="Makalabox - Избранные" />
        <meta
          property="og:description"
          content="Makalabox.com — платформа для публикации и обмена статьями на разнообразные темы. Присоединяйтесь к нашему сообществу, делитесь знаниями и читайте качественный контент от экспертов и энтузиастов."
        />
        <meta property="og:locale" content="ru_Ru" />
      </Helmet>
      <h2 className="mt-14 mb-5 text-2xl font-bold text-center">
        Ваши избранные статьи
      </h2>
      <FavoriteArticlesList />
    </Container>
  );
}
