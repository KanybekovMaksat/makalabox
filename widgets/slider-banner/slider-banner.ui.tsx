import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export function SliderBanner() {
  return (
    <div className="flex flex-col md:flex-row gap-5  md:min-h-[450px]">
      <div className="slider-banner md:max-w-[50%] md:min-w-[50%]">
        <Swiper
          modules={[Pagination, EffectFade, Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div
              className="swiper-card rounded "
              style={{
                backgroundSize: 'cover',
                height: '450px',
                backgroundImage: `url('https://i.pinimg.com/564x/a9/a2/f3/a9a2f3487118b187b72e410db0ed07c3.jpg')`,
              }}
            >
              <h3 className="text-pc-100 font-bold text-xl p-3 md:p-8">
                Как дизайнеру и любителю технологий жить после Apple Vision Pro
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="swiper-card rounded "
              style={{
                backgroundSize: 'cover',
                height: '450px',
                backgroundImage: `url('https://i.pinimg.com/564x/a9/a2/f3/a9a2f3487118b187b72e410db0ed07c3.jpg')`,
              }}
            >
              <h3 className="text-pc-100 font-bold text-xl p-3 md:p-8">
                Как дизайнеру и любителю технологий жить после Apple Vision Pro
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="swiper-card rounded "
              style={{
                backgroundSize: 'cover',
                height: '450px',
                backgroundImage: `url('https://i.pinimg.com/564x/a9/a2/f3/a9a2f3487118b187b72e410db0ed07c3.jpg')`,
              }}
            >
              <h3 className="text-pc-100 font-bold text-xl p-3 md:p-8">
                Как дизайнеру и любителю технологий жить после Apple Vision Pro
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="swiper-card bg-center bg-cover rounded"
              style={{
                height: '450px',
                backgroundImage: `url('https://habrastorage.org/r/w780/getpro/habr/upload_files/453/128/8f0/4531288f06638490cc72b5a387d92412.jpg')`,
              }}
            >
              <h3 className="text-pc-100 font-bold text-xl p-3 md:p-8">
                A JavaScript Interview Question That 90% of People Get Wrong
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="swiper-card bg-center bg-cover rounded"
              style={{
                height: '450px',
                backgroundImage: `url('https://habrastorage.org/r/w780/getpro/habr/upload_files/840/4b8/7ce/8404b87ced286d27eda1425c08e022ab.jpg')`,
              }}
            >
              <h3 className="text-pc-100 font-bold text-xl p-3 md:p-8">
                История геймдизайна от классических игр до современных
                технологий
              </h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-col min-w-[30%] max-w-[30%]  h-[450px]">
        <div
          className="h-[200px] md:h-full bg-center bg-cover rounded slider-card "
          style={{
            backgroundImage: `url('/public/maka.png')`,
          }}
        >
          <h3 className="text-pc-100 text-lg font-bold">
            Освоение инструментов редактора Makala Box.Практическое Руководство
          </h3>
        </div>

        <div
          className="h-[200px] md:h-full bg-center bg-cover rounded slider-card "
          style={{
            backgroundImage: `url('/public/maka.png')`,
          }}
        >
          <h3 className="text-pc-100 text-lg font-bold">
            Освоение инструментов редактора Makala Box.Практическое Руководство
          </h3>
        </div>
      </div>
    </div>
  );
}
