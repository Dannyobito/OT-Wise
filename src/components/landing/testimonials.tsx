import { Testimonial } from "./testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const Testimonials = () => {
  return (
    <section className="px-10">
      <div className="flex flex-col gap-12">
        <div>
          <h3 className="pb-3 text-xl leading-[1.875rem] text-secondaryYellow500 text-center font-bold">
            Testimonials
          </h3>
          <h2 className="text-center text-2xl sm:text-[2.5rem] sm:leading-[1.7025rem] font-bold text-black700">
            Hear from our Trusted Users
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="hidden lg:grid grid-cols-[repeat(auto-fit,_minmax(16.25rem,_1fr))] gap-4 w-full max-w-[76.125rem] justify-center">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
          <div className="block lg:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16} // Space between slides
              slidesPerView={1} // 1 slide per view on small screens
              pagination={{ clickable: true }} // Dots for pagination
            >
              <SwiperSlide className="!w-full flex justify-between">
                <Testimonial />
              </SwiperSlide>
              <SwiperSlide className="!w-full flex justify-between">
                <Testimonial />
              </SwiperSlide>
              <SwiperSlide className="!w-full flex justify-between">
                <Testimonial />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
