import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CompletionPage = () => {
  return (
    <div className='completion'>
        <div className='completion__content'>
            <div className='completion__icon'>
                <Check className='w-16 h-16' />
            </div>
            <h1 className='completion__title'>COMPLETED</h1>
            <p className='completion__message'>
                You have made a successful payment. You can now access the course.
            </p>
        </div>
        <div className='completion__support'>
            <p>
                Need Help? Contact out {" "}
                <Button variant={"link"} asChild className='p-0 m-0 text-primary-700'>
                    <a href='malto:I6HsK@example.com'>Customer Support</a>
                </Button>
                .
            </p>
        </div>
        <div className='completion__action'>
            <Link href={"user/courses"}>
                Go to Courses
            </Link>
        </div>
    </div>
  )
}

export default CompletionPage