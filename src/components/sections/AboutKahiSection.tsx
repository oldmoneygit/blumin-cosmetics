"use client";

const ingredients = [
  {
    id: 1,
    title: "SALMON DNA",
    description: "Sodium DNA (PDRN) supports skin repair, hydration, and elasticity. It helps boost collagen, smooth fine lines, and promote natural skin regeneration.",
    image: "/images/ingredients/Salmon DNA.webp",
  },
  {
    id: 2,
    title: "144HR JEJU OIL",
    description: "Jeju Island's pure ingredients undergo 144-hour fermentation, enhancing absorption, deep hydration, and long-lasting moisture retention.",
    image: "/images/ingredients/144HR Jeju Oil.webp",
  },
  {
    id: 3,
    title: "FILMEXEL",
    description: "Filmexel™ technology creates a natural bio-film with Doty algae and Tara Spinosa, helping smooth fine lines and refine skin texture. Patented in FR & US.",
    image: "/images/ingredients/FILMEXEL.webp",
  },
];

export const AboutKahiSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ingredients Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="bg-white rounded-2xl overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 rounded-2xl mb-6">
                <img
                  src={ingredient.image}
                  alt={ingredient.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="px-0 pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {ingredient.title}
                </h3>
                <p className="text-sm text-gray-900 leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

