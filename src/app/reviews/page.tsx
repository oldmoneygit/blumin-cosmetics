"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Star, CheckCircle2, ThumbsUp, X, Play } from "lucide-react";
import { reviews } from "@/data/reviews";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Filtrar apenas reviews de 4 e 5 estrelas
  const filteredReviews = selectedRating
    ? reviews.filter((review) => review.rating === selectedRating)
    : reviews.filter((review) => review.rating >= 4);

  // Calcular estatísticas
  const stats = {
    total: reviews.filter((r) => r.rating >= 4).length,
    fiveStar: reviews.filter((r) => r.rating === 5).length,
    fourStar: reviews.filter((r) => r.rating === 4).length,
    average: (
      reviews.filter((r) => r.rating >= 4).reduce((sum, r) => sum + r.rating, 0) /
      reviews.filter((r) => r.rating >= 4).length
    ).toFixed(1),
  };

  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
              <Star className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Reseñas de Clientes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Descubrí lo que nuestros clientes dicen sobre nuestros productos KAHI
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-pink-600 mb-1">{stats.average}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-5 h-5",
                        star <= Math.round(Number(stats.average)) ? "fill-pink-500 text-pink-500" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Promedio de {stats.total} reseñas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-pink-600 mb-1">{stats.fiveStar}</div>
                <p className="text-sm text-gray-600">5 estrellas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-pink-600 mb-1">{stats.fourStar}</div>
                <p className="text-sm text-gray-600">4 estrellas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <button
              onClick={() => setSelectedRating(null)}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300",
                selectedRating === null
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              Todas ({stats.total})
            </button>
            <button
              onClick={() => setSelectedRating(5)}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300",
                selectedRating === 5
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              5 Estrellas ({stats.fiveStar})
            </button>
            <button
              onClick={() => setSelectedRating(4)}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300",
                selectedRating === 4
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              4 Estrellas ({stats.fourStar})
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{review.author}</h3>
                      {review.verified && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" aria-label="Compra verificada" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-4 h-4",
                            star <= review.rating ? "fill-pink-500 text-pink-500" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      {review.date.toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-semibold text-gray-900 mb-3">{review.title}</h4>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                {/* Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mb-4">
                    <div className="flex gap-2 flex-wrap">
                      {review.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <Image
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video */}
                {review.video && (
                  <div className="mb-4">
                    <button
                      onClick={() => setSelectedVideo(review.video || null)}
                      className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <video
                        src={review.video}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      >
                        Tu navegador no soporta videos.
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-8 h-8 text-pink-600 ml-1" />
                        </div>
                      </div>
                    </button>
                  </div>
                )}

                {/* Helpful */}
                {review.helpful !== undefined && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-100">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} personas encontraron útil esta reseña</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReviews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">No se encontraron reseñas con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-12 right-4 md:bottom-12 md:right-12 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 md:w-10 md:h-10" />
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[100vh] flex items-center justify-center p-2 md:p-4">
            <Image
              src={selectedImage}
              alt="Review image"
              width={1200}
              height={1200}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: 'calc(100vh - 2rem)' }}
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-12 right-4 md:bottom-12 md:right-12 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 md:w-10 md:h-10" />
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[100vh] flex items-center justify-center p-2 md:p-4" onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedVideo}
              className="w-full h-auto max-h-[calc(100vh-2rem)] rounded-lg"
              controls
              autoPlay
              playsInline
            >
              Tu navegador no soporta videos.
            </video>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

