'use client'

import {useState, useEffect, Suspense} from 'react'
import {useSearchParams} from 'next/navigation'
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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.42.07 2.41.77 3.23.8 1.24-.24 2.42-.97 3.71-.87 1.56.14 2.75.79 3.51 2.01-3.26 1.88-2.49 5.97.76 7.22-.58 1.52-1.35 3.04-3.21 4.72zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function InviteAuthFormInner({
  inviterName,
  inviterId,
  code,
  defaultFullName,
  defaultEmail,
}: InviteAuthFormProps) {
  const searchParams = useSearchParams()
  const fromOAuth = searchParams.get('accepted') === 'true'

  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [accepted, setAccepted] = useState(false)
  const [existingUser, setExistingUser] = useState<{email?: string} | null>(null)

  // Redirect to app, with store fallback after 2.5s
  function redirectToApp() {
    // Pass the invite code so the app skips onboarding/paywall for invited users
    window.location.href = `spliter://accept-invite?code=${code}`
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

  // On mount: check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      if (session?.user) {
        if (fromOAuth) {
          // Invite was accepted server-side during OAuth callback — just open the app
          setAccepted(true)
          redirectToApp()
        } else {
          setExistingUser({email: session.user.email})
        }
      }
      setIsCheckingAuth(false)
    })
  }, [])

  async function handleOAuthSignIn(provider: 'google' | 'apple') {
    const redirectTo = `${window.location.origin}/auth/callback?invite_code=${code}`
    const {error} = await supabase.auth.signInWithOAuth({
      provider,
      options: {redirectTo},
    })
    if (error) toast.error(error.message)
  }

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

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3 mb-4">
          <Button
            variant="outline"
            className="w-full h-11 flex items-center gap-3 border-slate-200"
            onClick={() => handleOAuthSignIn('google')}
            type="button"
            disabled={isLoading}
          >
            <GoogleIcon />
            <span className="text-sm font-medium text-slate-700">Continue with Google</span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-11 flex items-center gap-3 border-slate-200"
            onClick={() => handleOAuthSignIn('apple')}
            type="button"
            disabled={isLoading}
          >
            <AppleIcon />
            <span className="text-sm font-medium text-slate-700">Continue with Apple</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400">or continue with email</span>
          </div>
        </div>

        {/* Login Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4">
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
              <a
                href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula"
                className="text-emerald-600 hover:underline font-medium"
              >
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

export function InviteAuthForm(props: InviteAuthFormProps) {
  return (
    <Suspense
      fallback={
        <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
          <CardContent className="flex items-center justify-center py-20">
            <p className="text-slate-500 text-sm">Loading…</p>
          </CardContent>
        </Card>
      }
    >
      <InviteAuthFormInner {...props} />
    </Suspense>
  )
}
