'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

import { ImageSliderControl } from './Control';
import { ImageSliderPagination } from './Pagination';

export type ImageSliderProps = DefineProps<
  {
    imageUrls: string[];
    paginationDotClass?: string;
    controlClass?: string;
    paginationClass?: string;
  },
  HTMLDivElement
>;

export const ImageSlider = ({
  imageUrls,
  className,
  controlClass = '',
  paginationClass = '',
  paginationDotClass = '',
  ...attrs
}: ImageSliderProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slidesCount = imageUrls.length;

  const isLastSlide = currentSlideIndex === slidesCount - 1;
  const isFirstSlide = currentSlideIndex === 0;

  function switchToSlide(slideIndex = 0) {
    setCurrentSlideIndex(slideIndex);
  }

  function toNextSlide() {
    if (isLastSlide) return;

    setCurrentSlideIndex((currentSlide) => currentSlide + 1);
  }

  function toPrevSlide() {
    if (isFirstSlide) return;

    setCurrentSlideIndex((currentSlide) => currentSlide - 1);
  }

  const viewStyle = {
    transform: `translateX(-${currentSlideIndex * 100}%)`,
  };

  return (
    <div
      {...attrs}
      className={cn(
        'group relative select-none overflow-hidden rounded-2xl',
        className,
      )}
    >
      <div className='flex size-full transition-transform' style={viewStyle}>
        {imageUrls.map((imageUrl, index) => {
          return (
            <div
              key={`${imageUrl}${index}`}
              className='size-full flex-[0_0_100%]'
            >
              <Image
                src={imageUrl}
                alt=''
                width={1e3}
                height={1e3}
                className='size-full object-cover'
              />
            </div>
          );
        })}
      </div>

      <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 items-center px-3'>
        {!isFirstSlide && (
          <ImageSliderControl
            isRight={false}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toPrevSlide();
            }}
            className={cn(
              'mr-auto transition-all hover:scale-110 group-hover:opacity-100 sm:opacity-0',
              controlClass,
            )}
          />
        )}

        {!isLastSlide && (
          <ImageSliderControl
            isRight
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toNextSlide();
            }}
            className={cn(
              'ml-auto transition-all hover:scale-110 group-hover:opacity-100 sm:opacity-0',
              controlClass,
            )}
          />
        )}
      </div>

      <ImageSliderPagination
        className={cn(
          'absolute bottom-4 left-1/2 w-full -translate-x-1/2 justify-center',
          paginationClass,
        )}
        dotClass={paginationDotClass}
        slidesCount={slidesCount}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={switchToSlide}
      />
    </div>
  );
};
