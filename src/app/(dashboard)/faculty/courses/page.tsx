
import ProtectedRoute from '@/app/components/layouts/ProtectedRoute'
import MyCourses from '@/pages/faculty/MyCourse'
import React from 'react'

const MyCoursesPage = () => {
  return (
    <ProtectedRoute>

      <MyCourses></MyCourses>

    </ProtectedRoute>
  )
}

export default MyCoursesPage