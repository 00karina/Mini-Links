import { dbConnect } from '@/lib/db'
import URL from '@/models/URL'
import { redirect } from 'next/navigation'

export default async function RedirectAlias({ params }: { params: { alias: string } }) {
  await dbConnect()
  const found = await URL.findOne({ shortId: params.alias })
  if (!found) return <div>Not found</div>
  redirect(found.originalUrl)
}