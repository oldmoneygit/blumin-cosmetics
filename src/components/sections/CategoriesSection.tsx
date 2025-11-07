"use client";

import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Ver Todo",
    count: 36,
    image: "/images/categories/01.webp",
    link: "/shop",
  },
  {
    id: 2,
    name: "BALM STICKS",
    count: 23,
    image: "/images/categories/02.webp",
    link: "/shop/balm-sticks",
  },
  {
    id: 3,
    name: "Cuidado de la Piel",
    count: 18,
    image: "/images/categories/03.webp",
    link: "/shop/skincare",
  },
  {
    id: 4,
    name: "Maquillaje",
    count: 3,
    image: "/images/categories/04.webp",
    link: "/shop/makeup",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="collection-card bg-white rounded-2xl overflow-hidden"
            >
              <Link
                href={category.link}
                className="group relative flex flex-col gap-6 focus-inset"
                aria-label={category.name}
              >
                {/* Image Container with Hover Effect */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-50 rounded-2xl">
                  <div className="hover-wrapper block w-full h-full overflow-hidden">
                    <div className="block w-full h-full motion-reduce group-hover:scale-110 transition-transform duration-700 ease-out">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Below Image */}
                <div className="flex flex-col gap-6 px-4">
                  <div className="flex items-center gap-3 w-full min-w-0">
                    {/* Category Info */}
                    <div className="flex-1 flex flex-col gap-1 text-left min-w-0 pr-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {category.name}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {category.count} artículos
                      </div>
                    </div>

                    {/* Arrow Button */}
                    <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 group-hover:bg-gray-300 transition-colors duration-300 pointer-events-none flex-shrink-0">
                      <svg
                        className="icon icon--medium"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 15L15 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.875 5H15V13.125"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900">
            TODO SOBRE: KAHI
          </h2>
        </div>
      </div>
    </section>
  );
};

