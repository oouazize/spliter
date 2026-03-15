'use client'

import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {AppStoreButton, GooglePlayButton} from 'react-mobile-app-button'
import Image from 'next/image'
import {baseConfig, defaultLandingConfig} from '@/lib/landing-config'
import {Smartphone} from 'lucide-react'

export function InvitePage() {
  const searchParams = useSearchParams()
  const invitedBy = searchParams.get('invitedBy')

  // Construct deep link
  // spliter://invite?code=...&invitedBy=...
  // We pass the entire query string to the app
  const deepLink = `spliter://invite?${searchParams.toString()}`

  const [os, setOs] = useState<'ios' | 'android' | 'other'>('other')

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setOs('ios')
    } else if (/android/i.test(userAgent)) {
      setOs('android')
    }
  }, [])

  const handleOpenApp = () => {
    window.location.href = deepLink

    // Optional: Auto-redirect fallback after a timeout could be implemented here
    // but we'll rely on the user clicking the store buttons if it fails.
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F4F1E9] text-slate-900 font-sans">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-8">
        {/* App Logo/Icon */}
        <div className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center overflow-hidden mb-4">
          {baseConfig.brand.logo ? (
            <Image
              src={baseConfig.brand.logo}
              alt={baseConfig.brand.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-[#F9C80E]">S</span>
          )}
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {invitedBy ? `Join ${invitedBy} on Spliter` : "You've been invited to join Spliter"}
          </h1>
          <p className="text-slate-600 text-lg">Split bills and track expenses easily.</p>
        </div>

        {/* Primary Action */}
        <div className="w-full pt-4">
          <Button
            onClick={handleOpenApp}
            className="w-full h-14 text-lg font-semibold bg-primary text-black shadow-lg rounded-xl transition-all active:scale-95"
          >
            Open App
          </Button>
          <p className="text-sm text-slate-500 mt-3">Already have the app? Tap above to join.</p>
        </div>

        {/* Divider */}
        <div className="relative w-full py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#F4F1E9] px-2 text-slate-500">Or download app</span>
          </div>
        </div>

        {/* Store Buttons */}
        <div className="flex flex-col gap-4 w-full items-center">
          {/* Show relevant store button first or both */}
          <div
            className={`flex flex-col gap-4 w-full items-center ${os === 'ios' || os === 'other' ? 'order-1' : 'order-2'}`}
          >
            <AppStoreButton
              url={
                defaultLandingConfig.hero.downloadButtons.find((b) => b.platform === 'App Store')
                  ?.href || '#'
              }
              theme="dark"
              className="w-full sm:w-auto"
            />
          </div>
          <div
            className={`flex flex-col gap-4 w-full items-center ${os === 'android' || os === 'other' ? 'order-1' : 'order-2'}`}
          >
            <GooglePlayButton
              url={
                defaultLandingConfig.hero.downloadButtons.find((b) => b.platform === 'Google Play')
                  ?.href || '#'
              }
              theme="dark"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto py-8 text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Spliter
      </div>
    </div>
  )
}
