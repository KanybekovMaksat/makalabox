import { ArticlesList } from '~widgets/articles-list';
import { Container } from '@mui/material';

export function HomePage() {
  return (
    <Container maxWidth="md">
      <div className="w-[100%] md:w-[650px] mx-auto bg-[white] my-5  p-5 rounded-md flex flex-col-reverse md:flex-row items-center md:justify-center gap-5 translate-y-5 md:translate-y-px border-2 border-[#eae8e885]">
        <img src="/typing.svg" alt="" className="h-[100px] translate-y-px" />
        <div>
          <h2 className="text-[35px] font-bold text-center leading-10 text-pc-500">
            Читай, пиши, обсуждай.
          </h2>
        </div>
      </div>
      <h2 className="mt-10 mb-5 text-center text-2xl font-bold text-pc-500">
        Лента статей
      </h2>
      <ArticlesList />
    </Container>
  );
}
