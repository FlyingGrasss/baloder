'use server'

import { createClient } from '@/lib/supabase/server'
import { isPasswordValid } from '@/lib/passwordValidation'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const tc = formData.get('tc') as string
  const schoolNumber = formData.get('schoolNumber') as string
  const graduationYear = formData.get('graduationYear') as string
  const phoneNumber = formData.get('phoneNumber') as string
  const birthDate = formData.get('birthDate') as string
  const isMember = formData.get('isMember') === 'on'
  const isSandikMember = formData.get('isSandikMember') === 'on' || formData.get('isSandikBoardMember') === 'on'

  // Validation
  if (!isPasswordValid(password)) return { error: "Şifre kriterlere uymuyor." }

  const supabase = await createClient()

  // 1. Supabase Signup
  const { data, error: sbError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        tc,
        school_number: schoolNumber,
        graduation_year: graduationYear ? parseInt(graduationYear) : null,
        phone_number: phoneNumber,
        birth_date: birthDate,
        is_member: isMember,
        is_sandik_member: isSandikMember,
      },
    },
  })

  if (sbError) return { error: sbError.message }

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: "Bu e-posta adresi zaten kullanımda." }
  }

  return { success: true }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const callbackUrl = formData.get('callbackUrl') as string || '/'

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: "E-posta veya şifre hatalı." }

  // Sync session state
  revalidatePath('/', 'layout')
  redirect(callbackUrl)
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout')
  redirect('/');
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) return { error: error.message }

  redirect(`/auth/reset-password?email=${encodeURIComponent(email)}`)
}

export async function verifyOtp(formData: FormData) {
  const email = formData.get('email') as string
  const code = formData.get('code') as string
  const callbackUrl = formData.get('callbackUrl') as string || '/'

  if (code.length !== 8) {
    return { error: "Doğrulama kodu 8 haneli olmalıdır." }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'signup',
  })

  if (error) {
    return { error: "Doğrulama kodu hatalı veya süresi dolmuş." }
  }

  // 2. Prisma Sync (after verification)
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const meta = user.user_metadata
    try {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {}, // Don't overwrite if it already exists for some reason
        create: {
          id: user.id,
          email: user.email!,
          name: meta.name || '',
          tc: meta.tc,
          schoolNumber: meta.school_number,
          graduationYear: meta.graduation_year ? parseInt(meta.graduation_year) : null,
          phoneNumber: meta.phone_number,
          birthDate: meta.birth_date ? new Date(meta.birth_date) : null,
          role: 'USER',
          verified: true,
          isMember: meta.is_member || false,
          isSandikMember: meta.is_sandik_member || false
        }
      })
    } catch (dbError) {
      console.error("Verification Sync Error:", dbError)
      // We don't return error here because they verified successfully on Supabase
    }
  }

  revalidatePath('/', 'layout')
  redirect(callbackUrl)
}

export async function resendOtp(email: string, type: 'signup' | 'recovery' | 'email_change') {
  const supabase = await createClient()
  const { error } = await supabase.auth.resend({
    type: type as any,
    email,
  })

  if (error) return { error: error.message }
  return { success: "Doğrulama kodu tekrar gönderildi." }
}
