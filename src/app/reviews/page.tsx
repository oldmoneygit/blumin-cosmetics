"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Star, CheckCircle2, ThumbsUp, X, Play } from "lucide-react";
import { reviews } from "@/data/reviews";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { getItemCount } = useCart();

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
      <Header cartItemCount={getItemCount()} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pink-50 to-white pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto text-center">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-600 sm:mb-6 sm:h-16 sm:w-16">
              <Star className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h1 className="mb-4 text-3xl font-black uppercase tracking-tight text-gray-900 sm:mb-5 sm:text-4xl md:text-5xl">
              Reseñas de Clientes
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              Descubrí lo que nuestros clientes dicen sobre nuestros productos KAHI
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-6">
              <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm sm:px-5 sm:py-4">
                <div className="mb-1 text-2xl font-black text-pink-500 sm:text-3xl md:text-4xl">{stats.average}</div>
                <div className="mb-2 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5",
                        star <= Math.round(Number(stats.average)) ? "fill-pink-500 text-pink-500" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 sm:text-sm">
                  Promedio de {stats.total} reseñas
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm sm:px-5 sm:py-4">
                <div className="mb-1 text-2xl font-black text-pink-500 sm:text-3xl md:text-4xl">{stats.fiveStar}</div>
                <p className="text-xs text-gray-500 sm:text-sm">5 estrellas</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm sm:px-5 sm:py-4">
                <div className="mb-1 text-2xl font-black text-pink-500 sm:text-3xl md:text-4xl">{stats.fourStar}</div>
                <p className="text-xs text-gray-500 sm:text-sm">4 estrellas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 sm:mb-10 sm:gap-4">
            <button
              onClick={() => setSelectedRating(null)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-3",
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
                "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-3",
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
                "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-3",
                selectedRating === 4
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              4 Estrellas ({stats.fourStar})
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900 sm:text-base">{review.author}</h3>
                      {review.verified && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" aria-label="Compra verificada" />
                      )}
                    </div>
                    <div className="mb-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-3.5 w-3.5 sm:h-4 sm:w-4",
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
                <h4 className="mb-2 text-base font-semibold text-gray-900 sm:mb-3">{review.title}</h4>

                {/* Comment */}
                <p className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base">{review.comment}</p>

                {/* Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {review.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                      className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-500 aspect-video"
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
                  <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:text-sm">
                    <ThumbsUp className="h-4 w-4" />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 md:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-12 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 hover:text-gray-300 md:bottom-12 md:right-12"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 md:w-10 md:h-10" />
          </button>
          <div className="relative flex h-full w-full max-w-4xl items-center justify-center p-2 md:p-4">
            <Image
              src={selectedImage}
              alt="Review image"
              width={1200}
              height={1200}
              className="h-auto w-full max-h-[calc(100vh-2rem)] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 md:p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute right-4 top-12 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 hover:text-gray-300 md:bottom-12 md:right-12"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 md:w-10 md:h-10" />
          </button>
          <div
            className="relative flex h-full w-full max-w-4xl items-center justify-center p-2 md:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo}
              className="h-auto w-full max-h-[calc(100vh-2rem)] rounded-lg"
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

