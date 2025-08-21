'use client'
import URLForm from '@/components/URLForm'

export default function Home() {
  return (
    <main>
      <h1 className="text-[#261d56] font-medium text-[24px]  md:text-[40px] font-sans mb-8 md:mb-16 px-4 md:px-10">MiniLink - URL Shortener</h1>
      <URLForm />
    </main>
  )
}
