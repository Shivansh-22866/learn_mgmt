"use client"

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Bell, BookOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NonDashboardNavbar = () => {
  const {user} = useUser()
  const userRole = user?.publicMetadata?.userType as "student" | "teacher"
  console.log(userRole)

  return (
    <nav className='nondashboard-navbar'>
        <div className='nondashboard-navbar__container'>
            <div className='nondashboard-navbar__search'>
            <Link href={"/"} className='nondashboard-navbar__brand'>
                NEXT 15
            </Link>
            <div className='flex items-center gap-8'>
                <div className='relative group'>
                    <Link href="/search" className='nondashboard-navbar__search-input'>
                        <span className='hidden sm:inline'>
                            Search Courses
                        </span>
                        <span className='sm:hidden'>Search</span>
                    </Link>
                    <BookOpen className='nondashboard-navbar__search-icon' size={18} />
                </div>
            </div>
        </div>
        <div className='nondashboard-navbar__actions'>
            <button className='nondashboard-navbar__notifications-button'>
                <span className='nondashboard-navbar__notifications-indicator'>
                </span>
                <Bell className='nondashboard-navbar__notification-icon' size={18} />
            </button>

            <SignedIn>
                <UserButton
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                            userButtonBox: "scale-90 sm:scale-100"
                        }
                    }}
                    showName={true}
                    userProfileMode='navigation'
                    userProfileUrl={
                        userRole == "teacher" ? "/teacher/courses" : "/user/courses"
                    }
                />
            </SignedIn>

            <SignedOut>
                <Link href='/sign-in' className='nondashboard-navbar__auth-button--login'>
                    Login
                </Link>
                <Link href='/sign-up' className='nondashboard-navbar__auth-button--signup'>
                    Sign Up
                </Link>
            </SignedOut>
        </div>

        </div>
    </nav>
  )
}

export default NonDashboardNavbar