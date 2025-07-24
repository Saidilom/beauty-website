"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Shield, Clock, Volume2, VolumeX } from "lucide-react"
import { FC, useRef, useState } from "react";

interface HeroProps {
  content: any;
}

export const Hero: FC<HeroProps> = ({ content }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const benefits = content?.benefits && Array.isArray(content.benefits) && content.benefits.length > 0
    ? content.benefits.map((text: string, i: number) => ({ icon: [Sparkles, Zap, Shield, Clock][i % 4], text }))
    : [];

  if (!content) return null;

  return (
    <section id="home" className="animate-fade-in pt-16 min-h-[60vh] bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div>
              {content?.badge && (
                <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 sm:px-4 sm:py-2">
                  {content.badge}
                </Badge>
              )}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                {content?.title && content.title.split("\n").map((line: string, idx: number) => (
                  <span key={idx} className={idx === 0 ? "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" : idx === 2 ? "text-gray-800" : undefined}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              {content?.description && (
                <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {content.description}
                </p>
              )}
            </div>
            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                {benefits.map((benefit: { icon: any; text: string }, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <benefit.icon className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{benefit.text}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {content?.buttonText && (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg"
                  onClick={() => {
                    const el = document.getElementById("order");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {content.buttonText}
                </Button>
              )}
              {content?.secondaryButtonText && (
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold border-2 border-pink-400 text-pink-600"
                  onClick={() => {
                    const el = document.getElementById("about-product");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {content.secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
          {/* Right Content - Device Video */}
          <div className="relative">
            <div className="relative h-[50vw] min-h-[220px] max-h-[350px] sm:h-[400px] md:h-[600px] bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-100/50 to-transparent z-10"></div>
              <video
                ref={videoRef}
                src={content?.video || "/images/recorder1.mp4"}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                controls={false}
                key={content?.video || "/images/recorder1.mp4"}
              />
              {/* Sound Control Button */}
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
            </div>
            {/* Floating Elements */}
            <div className="hidden sm:block absolute -top-4 -right-4 bg-white rounded-full p-2 sm:p-4 shadow-lg animate-bounce z-20">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
            </div>
            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full p-2 sm:p-4 shadow-lg z-20">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
