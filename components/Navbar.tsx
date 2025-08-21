'use client'

import React from 'react'
import Button from './Button'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isLoginPage = pathname === '/login'

  return (
    <div className="flex justify-between px-4 md:px-10 py-4 w-full items-center">
      <Link href="/">
        <h1 className="text-[#261d56] font-medium font-sans text-[18px] cursor-pointer">
          Mini Link
        </h1>
      </Link>

      <div className="flex items-center gap-4">
       
        {session?.user && (
          <Link
            href="/history"
            className="text-blue-600 hover:underline font-medium"
          >
            History
          </Link>
        )}

     
        {!session?.user && !isLoginPage && (
          <Button
            varient="SECONDARY"
            onClick={() => (window.location.href = '/login')}
            label="Login"
          />
        )}
        {session?.user && (
          <Button
            varient="SECONDARY"
            onClick={() => signOut({ callbackUrl: '/' })}
            label="Logout"
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
