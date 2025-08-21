import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import URL from '@/models/URL'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 })

  await dbConnect()
  const urls = await URL.find({ userId: session.user.id }).sort({ createdAt: -1 })

  return NextResponse.json({ urls })
}