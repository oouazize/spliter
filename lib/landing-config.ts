import logo from '@/public/icon.png'

export interface LandingPageConfig {
  navigation: {
    links: Array<{
      label: string
      href: string
    }>
  }
  hero: {
    badge: {
      icon: string
      text: string
    }
    headline: {
      main: string
      highlight: string
    }
    description: string
    downloadButtons: Array<{
      platform: string
      store: string
      href: string
    }>
  }
  mockups: Array<{
    image: string
  }>
  features: Array<{
    icon: string
    title: string
    description: string
  }>
  cta: {
    headline: string
    description: string
    buttons: Array<{
      text: string
      variant: 'primary' | 'secondary'
      href: string
    }>
  }
  footer: {
    links: Array<{
      label: string
      href: string
    }>
    copyright: string
  }
}

export const baseConfig = {
  brand: {
    name: 'Spliter',
    description:
      "Split bills, track group expenses & settle debts with friends, trips & roommates. Stop the awkward 'who owes what' conversation.",
    logo: logo,
    tagline: 'Split Expenses Easy',
  },
}

export const defaultLandingConfig: LandingPageConfig = {
  navigation: {
    links: [
      {label: 'Features', href: '/#features'},
      {label: 'Download', href: '/#download'},
    ],
  },
  hero: {
    badge: {
      icon: 'Sparkles',
      text: 'Available on iOS',
    },
    headline: {
      main: 'Split Bills,',
      highlight: 'Not Friendships.',
    },
    description:
      "Stop the awkward 'who owes what' conversation. Spliter makes splitting expenses with friends, roommates, and groups effortless — track debts, settle up, and stay on the same page.",
    downloadButtons: [
      {platform: 'App Store', store: 'Download on the', href: '#'},
    ],
  },
  mockups: [
    {image: '/screenshots/1.png'},
    {image: '/screenshots/2.png'},
    {image: '/screenshots/3.png'},
    {image: '/screenshots/4.png'},
    {image: '/screenshots/5.png'},
  ],
  features: [
    {
      icon: 'Receipt',
      title: 'Expense Tracking',
      description:
        'Log any expense in seconds — from dinner bills to shared rent. Keep a clear record of who paid what and when.',
    },
    {
      icon: 'Zap',
      title: 'Smart Splitting',
      description:
        'Split equally or customize amounts per person. Handles any scenario — unequal splits, percentages, or exact amounts.',
    },
    {
      icon: 'Users',
      title: 'Group Management',
      description:
        'Create groups for trips, housemates, or any occasion. Keep all shared expenses organized in one place.',
    },
    {
      icon: 'Globe',
      title: 'Multi-Currency',
      description:
        'Travel without worry. Spliter supports multiple currencies with real-time conversion so everyone pays fairly.',
    },
    {
      icon: 'WifiOff',
      title: 'Works Offline',
      description:
        "Full functionality even without internet. Log expenses anywhere and Spliter syncs automatically when you're back online.",
    },
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description:
        'Your financial data stays yours. Backed by Supabase with end-to-end security so you can share expenses, not your data.',
    },
  ],
  cta: {
    headline: 'No More IOUs',
    description:
      'Join friends, roommates, and travel groups already using Spliter to keep finances fair and friendships intact.',
    buttons: [
      {text: 'Download for Free', variant: 'primary', href: '#'},
      {text: 'See Features', variant: 'secondary', href: '/#features'},
    ],
  },
  footer: {
    links: [
      {label: 'Privacy', href: '/privacy'},
      {label: 'Terms', href: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula'},
      {label: 'Support', href: '/support'},
    ],
    copyright: `${new Date().getFullYear()} ${baseConfig.brand.name}. All rights reserved.`,
  },
}
