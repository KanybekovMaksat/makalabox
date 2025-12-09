import DefaultLayout from '@/layouts/default';
import { IntroBlock } from '@/pages/about/ui/intro-block';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 ">
        <div className="w-full px-4 py-6  rounded-lg">
          <h1 className="mb-4 text-2xl font-bold sm:text-left">О Makalabox</h1>
          <p className="mb-4 text-justify">
            <strong>Makalabox (Коробка Статей)</strong> — это университетский
            веб-сайт, организованный в формате системы тематических блогов,
            называемых боксами(коробками). Платформа предназначена для
            публикации новостей, аналитических статей и размышлений на темы,
            связанные с информационными технологиями, бизнесом, интернетом и
            другими дисциплинами, представленными в Международном Университете
            Инновационных Технологий в Кыргызстане.
          </p>
          <IntroBlock />
          <p className="mb-4 text-justify">
            Контент сайта создается пользователями-добровольцами, которые ведут
            персональные блоги. Эта инновационная платформа позволяет
            публиковать и обмениваться статьями на самые разнообразные темы. Все
            статьи перед публикацией проходят обязательную модерацию экспертами.
          </p>
          <div className="mt-8 w-full">
            <h5 className="mb-2 text-center sm:text-left">
              Руководство по текстовому редактору Makala Box
            </h5>
            <a href="https://makalabox.com/article/6/" className="no-underline">
              <Card className="flex flex-col sm:flex-row mb-4 border border-pc-200 shadow-none hover:shadow-lg hover:shadow-second-100/30">
                <img
                  alt="Makala Box Editor Guide"
                  height="140"
                  src="/image.png"
                  className="w-full sm:w-[100px] object-cover"
                />
                <CardBody className="w-full sm:w-2/3">
                  <h2 className="text-base">
                    Руководство по текстовому редактору Makala Box
                  </h2>
                  <p className="mb-2">
                    Узнайте, как использовать текстовый редактор Makala Box для
                    создания и редактирования статей.
                  </p>
                  <a
                    href="https://makalabox.com/article/6/"
                    className="text-blue-500"
                  >
                    https://makalabox.com/article/6/
                  </a>
                </CardBody>
              </Card>
            </a>
          </div>
          <p className="mt-4 text-center sm:text-left">
            Присоединяйтесь в Makalabox и станьте частью нашего динамичного и
            творческого сообщества! Публикуйте свои статьи, делитесь знаниями и
            узнавайте новое каждый день. <br /> Создайте свою коробку статей😀!
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
