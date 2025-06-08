'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // High-quality banner images (replace with your own)
  const images = [
    {
      src: 'https://cdn.barta24.com/news/2020/Oct/12/1602465842677.jpg',
      alt: 'Nature Landscape',
      caption: 'Discover the Beauty of Nature'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrsc-V8-Ane-6YBpA4HMuA_JA3WLkgXHsdIA&s',
      alt: 'City Skyline',
      caption: 'Begum Rokeya Campus'
    },
    {
      src: 'https://oldweb.brur.ac.bd/wp-content/uploads/2019/02/glance-5.jpg',
      alt: 'Tech Innovation',
      caption: 'Coumputer Science & Engineering Building'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKkJAs11u_PpYFrhsCCpczSvPThi_vhZ4svQ&s',
      alt: 'Adventure Time',
      caption: 'Campus view'
    }
  ];

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            quality={100}
            priority
          />
          
          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
          
          {/* Caption */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-1/4 left-0 right-0 text-center text-white px-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {images[currentIndex].caption}
            </h2>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md">
              Stunning visuals that tell your story
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous/Next Buttons */}
      <button
        onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={() => goToSlide((currentIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-all"
        aria-label="Next slide"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

// Simple arrow icons (replace with your own icon components)
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

export default Banner;