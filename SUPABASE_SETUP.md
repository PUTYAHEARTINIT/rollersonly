# Supabase Configuration Guide

## Part 1: Get Your Credentials (2 minutes)

1. Go to https://supabase.com/dashboard
2. Select your RollersOnly project
3. Click **Settings** (gear icon in left sidebar)
4. Click **API**
5. Copy these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

6. Create a file named `.env.local` in your project root with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=paste-your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-key-here
   ```

## Part 2: Create Profiles Table (1 minute)

1. In Supabase dashboard, click **SQL Editor** in left sidebar
2. Click **New query**
3. Copy the contents of `supabase/create-profiles-table.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

This creates:
- ✅ `profiles` table for user data
- ✅ Row Level Security policies
- ✅ Auto-trigger to create profile on signup

## Part 3: Enable Email Verification (2 minutes)

1. In Supabase dashboard, click **Authentication** in left sidebar
2. Click **Settings** tab
3. Scroll to **Email Auth** section
4. Toggle ON **"Enable email confirmations"**
5. In **"Confirm email" redirect URL**, enter:
   ```
   http://localhost:3000/auth/callback
   ```
   (Add your production URL later: `https://yourdomain.com/auth/callback`)

## Part 4: Configure Site URL (1 minute)

1. Still in **Authentication > Settings**
2. Scroll to **Site URL** section
3. Set **Site URL** to: `http://localhost:3000`
4. In **Redirect URLs**, add:
   ```
   http://localhost:3000/**
   ```

## Part 5: Customize Email Template (Optional, 2 minutes)

1. In **Authentication**, click **Email Templates**
2. Select **Confirm signup**
3. Customize the email to match RollersOnly branding
4. Make sure the button links to: `{{ .ConfirmationURL }}`

## Part 6: Test Everything

Once all configured:

```bash
npm run dev
```

Visit http://localhost:3000 and:
1. Click "Join Now"
2. Fill out signup form
3. Check your email for verification link
4. Click link → should redirect to loft setup
5. Complete setup → should see dashboard
6. Check that Nav shows your username
7. Test logout from dropdown

---

## Troubleshooting

**Build fails with "URL and API key required"**
- Make sure `.env.local` exists in project root (not in `supabase/` folder)
- Restart dev server after creating `.env.local`

**Email not sending**
- Check Supabase logs in Dashboard > Logs > Auth Logs
- Verify email confirmation is enabled in Auth settings
- Check spam folder

**"Please verify your email" error when signing in**
- This means email confirmation is working!
- Check your inbox for verification email
- Click the link before signing in

**Profile not created after verification**
- Check SQL Editor > run: `SELECT * FROM profiles;`
- Verify the trigger was created: run the create-profiles-table.sql again
- Check Supabase logs for errors

---

## Quick Reference

| Setting | Location | Value |
|---------|----------|-------|
| Email confirmations | Auth > Settings | ✅ Enabled |
| Confirm redirect | Auth > Settings | `http://localhost:3000/auth/callback` |
| Site URL | Auth > Settings | `http://localhost:3000` |
| Redirect URLs | Auth > Settings | `http://localhost:3000/**` |

---

Need help? The credentials go in `.env.local` (create this file in project root).
