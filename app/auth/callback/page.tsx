'use client'

import {useEffect, Suspense} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {supabase} from '@/lib/supabase'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const inviteCode = searchParams.get('invite_code')

    if (!code) {
      router.replace('/')
      return
    }

    supabase.auth.exchangeCodeForSession(code).then(async ({error}) => {
      if (error) {
        console.error('OAuth callback error:', error)
        router.replace('/')
        return
      }

      if (inviteCode) {
        try {
          await (supabase as any).schema('expenses').rpc('accept_invitation', {
            invitation_code: inviteCode,
          })
        } catch {
          // Non-fatal — invitation may already be accepted
        }
        router.replace(`/i/${inviteCode}?accepted=true`)
      } else {
        router.replace('/')
      }
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500 text-sm">Completing sign in…</p>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-slate-500 text-sm">Completing sign in…</p>
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  )
}
