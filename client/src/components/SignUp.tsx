"use client"

import { SignUp, useUser } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes'
import { useSearchParams } from 'next/navigation'

const SignUpComponent = () => {
    const searchParams = useSearchParams()
    const {user} = useUser()
    const isCheckoutPage = searchParams.get("showSignUp") !== null
    const courseId = searchParams.get("id")
  
    const signInUrl = isCheckoutPage ? `/checkout?step=1&showSignUp=false&id=${courseId}` : `/sign-in`
  
    const getRedirectUrl = () => {
      if(isCheckoutPage) {
          return `/checkout?step=2&id=${courseId}`
      }
  
      const userType = user?.publicMetadata?.userType
      if(userType === "teacher") {
          return "/teacher/courses"
      }
  
      return "/user/courses"
    }
  return (
    <SignUp appearance={{
        baseTheme: dark,
        elements: {
            rootBox: "flex justify-center items-center py-5",
            formFieldLabel: "text-white-50 font-normal",
            card: "bg-customgreys-secondarybg w-full shadow-none",
            cardBox: "shadow-none",
            footer: {
                background: "#25262f",
                padding: "0rem 2.5rem",
                "& > div > div:nth-child(1)": {
                    background: "#25262f",
                }
            },
            formButtonPrimary: "bg-primary-700 text-white-100 hover:bg-primary-600 !shadow-none",
            formFieldInput: "bg-customgreys-primarybg text-white-50 !shadow-none",
            footerActionLink: "text-primary-750 hover:text-primary-600"
        }
    }}
    signInUrl={signInUrl}
    forceRedirectUrl={getRedirectUrl()}
    routing='hash'
    afterSignOutUrl={"/"} />
  )
}

export default SignUpComponent