import heroImage from "../../img/herobander.png";

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  { id: 1, src: heroImage },
  { id: 2, src: heroImage },
  { id: 3, src: heroImage  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <section className="relative max-w-full h-[20rem] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 h-full">
            <img
              src={slide.src}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-main/40 p-2 rounded-full text-white hover:bg-gray-main/60"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-main/40 p-2 rounded-full text-white hover:bg-gray-main/60"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white-main" : "bg-blue-main"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
