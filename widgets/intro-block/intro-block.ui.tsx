import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ICard {
  image: string;
  title: string;
  description: string;
}

const cards: ICard[] = [
  {
    image: '/Reading.svg',
    title: 'Знания',
    description: 'База проверенных и достоверных статей',
  },
  {
    image: '/knowledge.svg',
    title: 'Разнообразие',
    description: 'Читай то что интересно. Статьи на самые разные темы.',
  },
  {
    image: '/oc-project-development.svg',
    title: 'Авторство',
    description: 'Публикация своих исследований и опыта',
  },
  {
    image: '/Teamworks.svg',
    title: 'Сообщество',
    description: 'Обсуждение и обмен мнениями с другими.',
  },
  {
    image: '/oc-puzzle.svg',
    title: 'Удобство',
    description: 'Удобный и понятный дизайн',
  },
];

function CardItem({ image, title, description }) {
  return (
    <div className="min-w-[200px] max-w-[100%] md:max-w-[230px] min-h-[200px] max-h-[200px] p-3 py-4 hover:text-second-100 bg-[white] border-2 border-[#ccccccbc]  duration-300 hover:border-pc-200 rounded-md">
      <img src={image} alt="" className="h-20 mx-auto" />
      <h3 className="text-lg font-semibold my-1 text-center">{title}</h3>
      <p className="text-sm md:text-xs text-pc-500 font-medium text-center md:text-left">
        {description}
      </p>
    </div>
  );
}

export function IntroBlock() {
  return (
    <div className="my-10 w-[95%] md:w-[90%] mx-auto">
      <div className="flex slider-banner">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          breakpoints={{
            420: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
        >
          {cards.map((card, index) => (
            <SwiperSlide>
              <CardItem key={index} {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
