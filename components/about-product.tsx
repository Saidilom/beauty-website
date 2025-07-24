'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Shield, Clock, Star, Heart, Volume2, VolumeX } from "lucide-react"
import { FC, useRef, useState } from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface AboutProductContent {
  badge?: string;
  title?: string;
  description?: string;
  features?: Feature[];
  resultsTitle?: string;
  resultsDescription?: string;
  results?: string[];
}

const ICONS: Record<string, any> = {
  Zap,
  Star,
  Shield,
  Heart,
  Clock,
  CheckCircle,
};

interface AboutProductProps {
  content: AboutProductContent;
}

export const AboutProduct: FC<AboutProductProps> = ({ content }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Миграция features: поддержка старого формата (строки)
  const features = Array.isArray(content?.features)
    ? content.features.map((f: any) => {
        if (typeof f === 'string') {
          const [title, ...desc] = f.split('—');
          return { title: title.trim(), description: desc.join('—').trim() };
        }
        return f;
      })
    : [];

  return (
    <section id="about-product" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          {content?.badge && (
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 text-base sm:text-lg">
              {content.badge}
            </Badge>
          )}
          {content?.title && (
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {content.title}
            </h2>
          )}
          {content?.description && (
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-10 sm:mb-20">
          {/* Device Info Video */}
          <div className="relative w-full max-w-[98vw] aspect-[9/16] sm:h-[700px] md:h-[900px] mx-auto rounded-[32px] sm:rounded-3xl overflow-hidden bg-white shadow-2xl">
            {!showVideo ? (
              <button
                className="w-full h-full flex items-center justify-center relative"
                onClick={() => setShowVideo(true)}
                aria-label="Смотреть видео"
              >
                <img
                  src="/images/device-info.png"
                  alt="Превью видео"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <span className="relative z-10 flex items-center justify-center w-14 h-14 bg-white/90 rounded-full shadow-md border border-gray-300">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <polygon points="8,6 22,14 8,22" fill="#222" />
                  </svg>
                </span>
              </button>
            ) : (
              <video
                ref={videoRef}
                src={"/images/instruction.mp4"}
                autoPlay
                muted={true}
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-contain sm:object-cover"
                controls={false}
                key={"/images/instruction.mp4"}
              />
            )}
            {/* Sound Control Button */}
            {showVideo && (
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 z-30 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200"
                aria-label={isMuted ? "Включить звук" : "Выключить звук"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                )}
              </button>
            )}
          </div>

          {/* Features */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              {features.length > 0 && (
                <div className="grid gap-4 sm:gap-6">
                  {features.map((feature, index) => {
                    const Icon = ICONS[feature.icon] || Zap;
                    return (
                      <Card
                        key={index}
                        className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">{feature.title}</h4>
                            <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <Card className="p-4 sm:p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-none">
          <div className="text-center mb-6 sm:mb-8">
            {content?.resultsTitle && (
              <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-gray-800">{content.resultsTitle}</h3>
            )}
            {content?.resultsDescription && (
              <p className="text-base sm:text-lg text-gray-600">
                {content.resultsDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {content?.results && content.results.map((result, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium text-xs sm:text-base">{result}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Галерея фото из public/gur */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["IntelliDermSolutionsRFLEDMultifunctionDevice-Ecard.jpg", "IntelliDermSolutionsRFLEDMultifunctionDevice-Ecard2.jpg", "IntelliDermSolutionsRFLEDMultifunctionDevice-Ecard4.jpg", "7_(1)(3).jpg", "8_(1).jpg", "10_(1)(1).jpg"].map((img, i) => {
            // Для первых трёх фото — оригинальный размер
            const isOriginal = i < 3;
            return (
            <div key={img} className="w-full h-auto bg-white rounded-2xl shadow overflow-hidden flex items-center justify-center">
              <Image
                src={`/gur/${img}`}
                alt={`Фото ${i+1}`}
                  width={isOriginal ? 1000 : 400}
                  height={isOriginal ? 1000 : 533}
                className="w-full h-full object-cover rounded-2xl"
                  style={isOriginal ? { maxWidth: 1000, maxHeight: 1000 } : { aspectRatio: '3/4', maxHeight: 420 }}
                  placeholder="blur"
                  quality={70}
                  priority={i === 0}
                  blurDataURL="/gur/IntelliDermSolutionsRFLEDMultifunctionDevice-Ecard.jpg"
                  {...(i !== 0 ? { loading: "lazy" } : {})}
              />
            </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};
