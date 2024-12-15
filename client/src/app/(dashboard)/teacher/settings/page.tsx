import SharedNotificationSettings from '@/components/SharedNotificationSettings'
import React from 'react'

const TeacherSettings = () => {
  return (
    <div className='w-3/5'>
        <SharedNotificationSettings
            title="Teacher Settings"
            subtitle="Manage your teacher notification Settings"
        />
    </div>
  )
}

export default TeacherSettings