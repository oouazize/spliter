import type {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Spliter',
  description: 'Learn how Spliter collects, uses, and protects your personal information.',
}

const LAST_UPDATED = 'March 11, 2026'
const CONTACT_EMAIL = 'privacy@spliter.app'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="prose prose-slate max-w-none space-y-10">

          <Section title="1. Introduction">
            <p>
              Welcome to <strong>Spliter</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
              &ldquo;us&rdquo;). We build tools to help friends, roommates, and groups track and
              split shared expenses. This Privacy Policy explains what personal information we
              collect, how we use it, and your rights regarding that information.
            </p>
            <p>
              By using the Spliter mobile app or this website (&ldquo;Services&rdquo;), you agree
              to the practices described here. If you do not agree, please stop using our Services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <Subsection title="2.1 Information you provide">
              <ul>
                <li>
                  <strong>Account information</strong> — name, email address, and password when you
                  create an account.
                </li>
                <li>
                  <strong>Expense data</strong> — amounts, descriptions, currencies, categories,
                  and participant lists for expenses you create or are added to.
                </li>
                <li>
                  <strong>Group data</strong> — group names and the members you invite.
                </li>
                <li>
                  <strong>Invitation data</strong> — email addresses you use to invite friends.
                </li>
                <li>
                  <strong>Receipt images</strong> — photos you upload for OCR receipt scanning.
                  Images are processed and not stored beyond the duration of the scan.
                </li>
              </ul>
            </Subsection>

            <Subsection title="2.2 Information collected automatically">
              <ul>
                <li>
                  <strong>Device information</strong> — device type, operating system version, and
                  unique device identifiers.
                </li>
                <li>
                  <strong>Usage data</strong> — features used, screens visited, actions taken, and
                  session durations.
                </li>
                <li>
                  <strong>Crash and error reports</strong> — diagnostic data to help us identify
                  and fix bugs.
                </li>
                <li>
                  <strong>Push notification tokens</strong> — to deliver in-app notifications about
                  expense activity.
                </li>
              </ul>
            </Subsection>

            <Subsection title="2.3 Information from third parties">
              <ul>
                <li>
                  <strong>Authentication providers</strong> — if you sign in via a third-party
                  provider, we receive basic profile information (name, email) from that provider.
                </li>
              </ul>
            </Subsection>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use your information to:</p>
            <ul>
              <li>Provide, operate, and improve the Services.</li>
              <li>Authenticate your identity and secure your account.</li>
              <li>Process and display expenses, settlements, and group activity.</li>
              <li>Send notifications about expense updates, settlements, and invitations.</li>
              <li>Respond to support requests and communications.</li>
              <li>Analyze usage patterns to improve features and fix bugs.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal information to third parties. We do not
              use your expense data for advertising purposes.
            </p>
          </Section>

          <Section title="4. Data Sharing">
            <p>We share your information only in the following circumstances:</p>
            <ul>
              <li>
                <strong>With other users</strong> — expense amounts, participant names, and
                settlement details are visible to other members of a shared expense or group, as
                that is the core functionality of the app.
              </li>
              <li>
                <strong>Service providers</strong> — we use third-party vendors to operate our
                infrastructure (database hosting, push notifications, analytics, error tracking).
                These vendors process data on our behalf and are bound by confidentiality
                agreements.
              </li>
              <li>
                <strong>Legal requirements</strong> — we may disclose information if required by
                law, regulation, legal process, or enforceable governmental request.
              </li>
              <li>
                <strong>Business transfers</strong> — if Spliter is acquired or merges with another
                company, your information may be transferred as part of that transaction.
              </li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We retain your account and expense data for as long as your account is active. If you
              delete your account, we will delete or anonymize your personal information within
              30 days, except where we are required to retain it for legal or compliance purposes.
            </p>
            <p>
              Receipt images submitted for OCR scanning are processed in real time and are not
              stored after the scan completes.
            </p>
          </Section>

          <Section title="6. Security">
            <p>
              We take reasonable technical and organizational measures to protect your information,
              including:
            </p>
            <ul>
              <li>Encryption of data in transit (TLS) and at rest.</li>
              <li>Row-level security policies on our database so users can only access their own data.</li>
              <li>API keys and secrets stored server-side, never exposed to client apps.</li>
              <li>Regular security reviews and dependency updates.</li>
            </ul>
            <p>
              No system is completely secure. If you believe your account has been compromised,
              please contact us immediately at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li>
                <strong>Access</strong> — request a copy of the personal information we hold about
                you.
              </li>
              <li>
                <strong>Correction</strong> — request correction of inaccurate or incomplete data.
              </li>
              <li>
                <strong>Deletion</strong> — request deletion of your account and associated data.
              </li>
              <li>
                <strong>Portability</strong> — request your data in a machine-readable format.
              </li>
              <li>
                <strong>Objection</strong> — object to certain processing of your data.
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Spliter is not directed at children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal
              information, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="9. Third-Party Services">
            <p>We use the following third-party services, each with their own privacy policies:</p>
            <ul>
              <li>
                <strong>Supabase</strong> — database and authentication infrastructure.
              </li>
              <li>
                <strong>OneSignal</strong> — push notification delivery.
              </li>
              <li>
                <strong>OpenAI</strong> — receipt OCR processing (images sent for analysis are not
                retained by us beyond the API call).
              </li>
              <li>
                <strong>Firebase / Google Analytics</strong> — app usage analytics.
              </li>
              <li>
                <strong>Sentry</strong> — error and crash reporting.
              </li>
            </ul>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date at the top of this page. For significant changes, we
              will notify you via email or an in-app notice. Continued use of the Services after
              changes take effect constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have questions or concerns about this Privacy Policy or how we handle your
              data, please contact us:
            </p>
            <div className="bg-muted rounded-2xl p-6 mt-4">
              <p className="font-semibold text-foreground">Spliter</p>
              <p className="text-muted-foreground mt-1">
                Email:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </Section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline font-medium">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      <div className="space-y-4 text-foreground/80 leading-relaxed">{children}</div>
    </section>
  )
}

function Subsection({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
