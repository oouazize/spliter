'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Card, CardContent} from '@/components/ui/card'
import {MobileMockup} from '@/components/mobile-mockup'
import {IconRenderer} from '@/components/icon-renderer'
import {defaultLandingConfig, type LandingPageConfig} from '@/lib/landing-config'
import Link from 'next/link'
import {AppStoreButton} from 'react-mobile-app-button'

export default function LandingPage() {
  const [config] = useState<LandingPageConfig>(defaultLandingConfig)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f1f0e6] to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-6 bg-primary/20">
          <IconRenderer name={config.hero.badge.icon} className="w-3 h-3 mr-1" />
          {config.hero.badge.text}
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {config.hero.headline.main}
          <br />
          <span className="text-[#171717] bg-primary px-2 rounded-sm">
            {config.hero.headline.highlight}
          </span>
        </h1>

        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          {config.hero.description}
        </p>

        {/* App Store Buttons */}
        <div id="download" className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {config.hero.downloadButtons.map((button, i) => (
            <AppStoreButton key={i} url={button.href} theme={'dark'} />
          ))}
        </div>

        {/* Mobile Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {config.mockups.map((screenshot, i) => (
            <MobileMockup key={i} screenshot={screenshot.image} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-4">
            Everything you need to split fairly
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From group trips to shared rent — Spliter handles every expense so you can focus on the
            moments that matter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.features.map((feature, i) => (
            <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <IconRenderer name={feature.icon} className="w-6 h-6 text-[#171717]" />
                </div>
                <h3 className="text-xl font-semibold text-[#171717] mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#171717] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{config.cta.headline}</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">{config.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {config.cta.buttons.map((button, i) => (
              <Button
                key={i}
                size="lg"
                className={
                  button.variant === 'primary'
                    ? 'bg-primary hover:bg-primary text-[#171717] font-semibold px-8 py-3'
                    : 'border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3'
                }
                variant={button.variant === 'primary' ? 'default' : 'outline'}
                asChild
              >
                <Link href={button.href}>{button.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
