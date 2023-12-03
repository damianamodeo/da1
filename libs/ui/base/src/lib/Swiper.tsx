import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import type { SwiperSlideProps, SwiperProps } from 'swiper/react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperProps,
        HTMLElement
      >;
      'swiper-slide': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
        HTMLElement
      >;
    }
  }
}

export function Swiper(props: any) {
  const swiperRef = useRef<any>(null);
  const { children, currentTab, style, ...rest } = props;

  useEffect(() => {
    // Register Swiper web component
    register();

    // pass component props to parameters
    const params = {
      ...rest,
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
    swiperRef.current.swiper.slideTo(currentTab);
  }, [currentTab]);

  return (
    <swiper-container init={false} ref={swiperRef} style={{ ...style }}>
      {children}
    </swiper-container>
  );
}

export function SwiperSlide(props: any) {
  const { children, ...rest } = props;

  return <swiper-slide {...rest}>{children}</swiper-slide>;
}
