"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Award, Percent, ShoppingBag } from "lucide-react"
import { FC } from "react";

interface BundleItem { name: string; price: string; included?: boolean; }
interface Bonus { icon: any; title: string; description: string; }
interface PriceBundleContent {
  title?: string;
  subtitle?: string;
  description?: string;
  itemsTitle?: string;
  items?: { name: string; price: string }[];
  totalLabel?: string;
  totalValue?: string;
  bundleLabel?: string;
  bundleValue?: string;
  economyLabel?: string;
  economyValue?: string;
  bonusesTitle?: string;
  bonuses?: { title: string; description: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButton?: string;
  ctaBenefits?: string[];
  includedTitle?: string;
  includedList?: string[];
}

const BONUS_ICONS = [Gift, Award, Percent];

interface PriceBundleProps {
  content: PriceBundleContent;
}

export const PriceBundle: FC<PriceBundleProps> = ({ content }) => {
  const bundleItems = Array.isArray(content?.items) ? content.items : [];
  const bonuses = Array.isArray(content?.bonuses) ? content.bonuses : [];
  const ctaBenefits = Array.isArray(content?.ctaBenefits) ? content.ctaBenefits : [];

  return (
    <section id="price-bundle" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-2 text-base sm:text-lg">
            {content?.title || ""}
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {content?.subtitle || ""}
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {content?.description || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Bundle Contents */}
          <Card className="p-4 sm:p-8 bg-white shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
              {content?.itemsTitle || ""}
            </h3>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {bundleItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base font-medium flex-1 mr-2">{item.name}</span>
                  <span className="text-purple-600 text-sm sm:text-base font-bold flex-shrink-0">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 sm:pt-6">
              <div className="flex items-center justify-between text-base sm:text-lg mb-1 sm:mb-2">
                <span className="text-gray-600">{content?.totalLabel || ""}</span>
                <span className="text-gray-400 line-through">{content?.totalValue || ""}</span>
              </div>
              <div className="flex items-center justify-between text-lg sm:text-2xl font-bold">
                <span className="text-gray-800">{content?.bundleLabel || ""}</span>
                <span className="text-green-600">{content?.bundleValue || ""}</span>
              </div>
              <div className="text-center mt-3 sm:mt-4">
                <Badge className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg">
                  {content?.economyLabel || ""} {content?.economyValue || ""}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Bonuses and CTA */}
          <div className="space-y-4 sm:space-y-8">
            <Card className="p-4 sm:p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">{content?.bonusesTitle || ""}</h3>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {bonuses.map((bonus, index) => {
                  const Icon = BONUS_ICONS[index % BONUS_ICONS.length];
                  return (
                    <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white flex-shrink-0">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{bonus.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-base">{bonus.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {(content?.includedTitle || (content?.includedList && content.includedList.length > 0)) && (
              <Card className="p-4 sm:p-8 bg-gray-50 border-gray-200 mt-8">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800">{content?.includedTitle || ""}</h3>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700">
                  {(content?.includedList || []).map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-4 sm:p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">{content?.ctaTitle || ""}</h3>
              <p className="text-base sm:text-xl mb-4 sm:mb-6 opacity-90">{content?.ctaDescription || ""}</p>

              <div className="space-y-3 sm:space-y-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-xl font-bold w-full"
                  onClick={() => {}}
                >
                  {content?.ctaButton || ""}
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm opacity-90">
                  {ctaBenefits.map((b, i) => <span key={i}>{b}</span>)}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
