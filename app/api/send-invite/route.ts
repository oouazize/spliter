import {NextRequest, NextResponse} from 'next/server'

// NOTE: We intentionally do NOT use adminClient.auth.admin.inviteUserByEmail() here.
// That Supabase call creates a row in auth.users before the friend has signed up,
// which blocks them from registering later via Google, Apple, or email — they
// get "User already registered" even though they never created an account.
//
// Instead: the invite link (spliter-website/i/<code>) is fully self-contained.
// The recipient opens it, authenticates normally (sign up or log in), and the
// page calls accept_invitation(code). No ghost auth.users entry is needed.
//
// Email delivery is handled by the app's native sharing (WhatsApp, SMS, or the
// device's mail app via Linking.openURL('mailto:...')). This route now just
// validates the request and returns the invite link so the client can use it.

export async function POST(req: NextRequest) {
  try {
    const {to, inviteCode, inviterName} = await req.json()

    if (!to || !inviteCode) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'
    const inviteLink = `${appUrl}/i/${inviteCode}`

    // Return the invite link so the calling client can open the device mail app
    // or copy it to clipboard. No Supabase admin calls are made.
    return NextResponse.json({success: true, inviteLink, inviterName})
  } catch (err: any) {
    return NextResponse.json({error: err.message ?? 'Failed to process invite'}, {status: 500})
  }
}
