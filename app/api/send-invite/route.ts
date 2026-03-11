import {createClient} from '@supabase/supabase-js'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const {to, inviteCode} = await req.json()

    if (!to || !inviteCode) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {autoRefreshToken: false, persistSession: false},
    })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'
    const redirectTo = `${appUrl}/i/${inviteCode}`

    const {error} = await adminClient.auth.admin.inviteUserByEmail(to, {redirectTo})

    if (error) {
      return NextResponse.json({error: error.message}, {status: 400})
    }

    return NextResponse.json({success: true})
  } catch (err: any) {
    return NextResponse.json({error: err.message ?? 'Failed to send invite'}, {status: 500})
  }
}
