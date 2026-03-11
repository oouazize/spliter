import {supabase} from '@/lib/supabase'
import {InviteAuthForm} from '@/components/invite-auth-form'
import {notFound} from 'next/navigation'
import {Metadata} from 'next'

type Props = {
  params: Promise<{code: string}>
}

type InvitationDetails = {
  inviterName: string
  inviterId?: string
  inviteeName?: string
  inviteeEmail?: string
}

async function getInvitationDetails(code: string): Promise<InvitationDetails> {
  let inviterName = 'a friend'
  let inviterId: string | undefined
  let inviteeName: string | undefined
  let inviteeEmail: string | undefined

  try {
    const {data: invitation, error} = await supabase
      .schema('expenses')
      .from('invitations')
      .select('*')
      .eq('code', code)
      .single()

    if (invitation) {
      // Get invitee details from correct columns
      if (invitation.invited_name) inviteeName = invitation.invited_name
      if (invitation.invited_email) inviteeEmail = invitation.invited_email

      // Get inviter details
      if (invitation.inviter_id) {
        inviterId = invitation.inviter_id
        // Fetch profile from public schema
        const {data: profile} = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', invitation.inviter_id)
          .single()

        if (profile?.full_name) {
          inviterName = profile.full_name
        }
      }
    }
  } catch (e) {
    console.error('Error fetching invitation details:', e)
  }

  return {inviterName, inviterId, inviteeName, inviteeEmail}
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {code} = await params
  const {inviterName} = await getInvitationDetails(code)

  return {
    title: `Join ${inviterName} on Spliter`,
    description: `You've been invited to join Spliter by ${inviterName}.`,
    openGraph: {
      title: `Join ${inviterName} on Spliter`,
      description: `You've been invited to join Spliter by ${inviterName}.`,
    },
  }
}

export default async function InvitePage({params}: Props) {
  const {code} = await params

  if (!code) return notFound()

  const {inviterName, inviterId, inviteeName, inviteeEmail} = await getInvitationDetails(code)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <InviteAuthForm
        inviterName={inviterName}
        inviterId={inviterId || ''}
        code={code}
        defaultFullName={inviteeName}
        defaultEmail={inviteeEmail}
      />
    </div>
  )
}
