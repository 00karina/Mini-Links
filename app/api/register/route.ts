import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  await dbConnect()
  const { email, password } = await req.json()
  const existing = await User.findOne({ email })

  if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashedPassword })

  return NextResponse.json({ id: user._id })
}