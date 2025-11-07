"use client";

const ingredients = [
  {
    id: 1,
    title: "SALMON DNA",
    description: "El ADN de Sodio (PDRN) apoya la reparación, hidratación y elasticidad de la piel. Ayuda a aumentar el colágeno, suavizar líneas finas y promover la regeneración natural de la piel.",
    image: "/images/ingredients/Salmon DNA.webp",
  },
  {
    id: 2,
    title: "144HR JEJU OIL",
    description: "Los ingredientes puros de la Isla de Jeju se someten a una fermentación de 144 horas, mejorando la absorción, hidratación profunda y retención de humedad duradera.",
    image: "/images/ingredients/144HR Jeju Oil.webp",
  },
  {
    id: 3,
    title: "FILMEXEL",
    description: "La tecnología Filmexel™ crea una bio-película natural con algas Doty y Tara Spinosa, ayudando a suavizar líneas finas y refinar la textura de la piel. Patentado en FR y EE.UU.",
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

