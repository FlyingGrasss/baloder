import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

/**
 * Call this at the top of any server component / page that requires the user
 * to be both authenticated AND have a completed Prisma profile.
 *
 * - No session       → redirects to /auth/login
 * - Session, no DB record → redirects to /auth/complete-profile
 * - Session + record  → returns { user, profile }
 */
export async function requireProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!profile) redirect('/auth/complete-profile')

  return { user, profile }
}

/**
 * Like requireProfile but returns null instead of redirecting.
 * Useful for pages that work for both guests and members (e.g. landing).
 */
export async function getOptionalProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { user: null, profile: null }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  })

  return { user, profile }
}
