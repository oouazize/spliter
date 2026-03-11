'use client'

import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {baseConfig, defaultLandingConfig} from '@/lib/landing-config'
import Image from 'next/image'
import {supabase} from '@/lib/supabase'
import {toast} from 'sonner'

interface InviteAuthFormProps {
  inviterName: string
  inviterId: string
  code: string
  defaultFullName?: string
  defaultEmail?: string
}

export function InviteAuthForm({
  inviterName,
  inviterId,
  code,
  defaultFullName,
  defaultEmail,
}: InviteAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [accepted, setAccepted] = useState(false)
  const [existingUser, setExistingUser] = useState<{email?: string} | null>(null)

  // Redirect to app, with store fallback after 2.5s
  function redirectToApp() {
    window.location.href = 'spliter://'
    setTimeout(() => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
      const isAndroid = /android/i.test(userAgent)
      let storeUrl = '#'
      if (isIOS)
        storeUrl =
          defaultLandingConfig.hero.downloadButtons.find((b) => b.platform === 'App Store')?.href ||
          '#'
      else if (isAndroid)
        storeUrl =
          defaultLandingConfig.hero.downloadButtons.find((b) => b.platform === 'Google Play')
            ?.href || '#'
      if (storeUrl && storeUrl !== '#') window.location.href = storeUrl
    }, 2500)
  }

  async function acceptInvitation() {
    setIsLoading(true)
    try {
      await (supabase as any).schema('expenses').rpc('accept_invitation', {invitation_code: code})
      toast.success('Invitation accepted! Opening app…')
      setAccepted(true)
      redirectToApp()
    } catch (e: any) {
      toast.error(e?.message || 'Failed to accept invitation')
    } finally {
      setIsLoading(false)
    }
  }

  // On mount: check if already logged in — if so, show accept button instead of signup form
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      if (session?.user) {
        setExistingUser({email: session.user.email})
      }
      setIsCheckingAuth(false)
    })
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    try {
      if (isLogin) {
        const {error} = await supabase.auth.signInWithPassword({email, password})
        if (error) throw error
      } else {
        const {error} = await supabase.auth.signUp({
          email,
          password,
          options: {data: {full_name: fullName}},
        })
        if (error) throw error
      }

      // Accept invitation now that the user is authenticated
      await acceptInvitation()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
        <CardContent className="flex items-center justify-center py-20">
          <p className="text-slate-500 text-sm">Loading…</p>
        </CardContent>
      </Card>
    )
  }

  if (accepted) {
    return (
      <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center py-20 space-y-3">
          <p className="text-xl font-semibold text-slate-800">Invitation accepted!</p>
          <p className="text-slate-500 text-sm text-center">Opening Spliter for you…</p>
        </CardContent>
      </Card>
    )
  }

  if (existingUser) {
    return (
      <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
        <CardHeader className="flex flex-col items-center pt-8 pb-2 space-y-4">
          <div className="w-12 h-12 relative mb-2">
            {baseConfig.brand.logo ? (
              <Image
                src={baseConfig.brand.logo}
                alt={baseConfig.brand.name}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
            {baseConfig.brand.name}
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8 flex flex-col items-center space-y-4">
          <p className="text-xl font-semibold text-slate-800 text-center">
            Join {inviterName} on {baseConfig.brand.name}
          </p>
          {existingUser.email && (
            <p className="text-sm text-slate-500 text-center">
              Logged in as <strong>{existingUser.email}</strong>
            </p>
          )}
          <Button
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base"
            disabled={isLoading}
            onClick={acceptInvitation}
          >
            {isLoading ? 'Processing…' : 'Accept invitation'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
      <CardHeader className="flex flex-col items-center pt-8 pb-2 space-y-4">
        {/* Logo */}
        <div className="w-12 h-12 relative mb-2">
          {baseConfig.brand.logo ? (
            <Image
              src={baseConfig.brand.logo}
              alt={baseConfig.brand.name}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Join {inviterName} on {baseConfig.brand.name}
          </h2>
        </div>

        {/* Login Toggle */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-sm text-slate-600">Already have an account?</span>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              onClick={() => setIsLogin(!isLogin)}
              type="button"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">or</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-xs font-bold text-slate-500 uppercase tracking-wide"
              >
                Full name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Redouane lam"
                defaultValue={defaultFullName}
                required
                className="h-10 text-base"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-bold text-slate-500 uppercase tracking-wide"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              defaultValue={defaultEmail}
              required
              className="h-10 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-bold text-slate-500 uppercase tracking-wide"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="h-10 text-base"
            />
            {!isLogin && <p className="text-xs text-slate-400">Minimum 8 characters</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Log in' : 'Sign up'}
          </Button>

          {!isLogin && (
            <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed">
              By signing up, you accept the {baseConfig.brand.name}{' '}
              <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula" className="text-emerald-600 hover:underline font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-emerald-600 hover:underline font-medium">
                Privacy Policy
              </a>
              .
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
