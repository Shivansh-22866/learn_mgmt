"use client"

import Header from '@/components/Header'
import { UserProfile } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import React from 'react'

const TeacherProfilePage = () => {
  return (
    <>
        <Header title='Profile' subtitle='View Your Profile' />
        <UserProfile
        path='/teacher/profile'
        routing='path'
        appearance={{
            baseTheme: dark,
            elements: {
                scrollBox: "bg-customgreys-darkGrey",
                navbar: {
                    "& > div:nth-child(1)": {
                        background: "none"
                    }
                }
            }
        }} />
    </>
  )
}

export default TeacherProfilePage