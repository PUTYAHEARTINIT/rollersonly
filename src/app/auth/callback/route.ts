import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Email verified successfully - redirect to loft setup or dashboard
      return NextResponse.redirect(`${origin}/auth/setup-profile`)
    }
  }

  // If there's an error, redirect to signin with error message
  return NextResponse.redirect(`${origin}/signin?error=verification_failed`)
}
