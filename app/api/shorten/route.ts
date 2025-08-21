import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import URL from '@/models/URL'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateRandomString } from '@/lib/utils'

export async function POST(req: NextRequest) {
  await dbConnect()
  const session = await getServerSession(authOptions)
  const { originalUrl, customAlias } = await req.json()

  if (!originalUrl) return NextResponse.json({ error: 'Missing URL' }, { status: 400 })

  const existing = await URL.findOne({ shortId: customAlias })
  if (existing) return NextResponse.json({ error: 'Alias exists' }, { status: 400 })

  const newUrl = await URL.create({
    originalUrl,
    shortId: customAlias || generateRandomString(),
    userId: session?.user?.id || null
  })

  return NextResponse.json({ shortId: newUrl.shortId })
}