import { Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Vids() {
  return(
    <main id="vids" className='myScroll'>
      <Swiper
        modules= {[Pagination, Navigation]}
        Pagination= {
          {
            clickable: true,
          }
        }
        spaceBetween= {60}
        navigation= {true}
        loop= {true}
        slidesPerView= {3}
        centeredSlides= {true}
      >
        <SwiperSlide>
          <div className="inner">1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">4</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">5</div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}

export default Vids;