"use client";

import Loading from "@/components/Loading";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/CourseCardSearch";
import SelectedCourse from "./SelectedCourse";

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({}) as {
    data: Course[];
    isLoading: boolean;
    isError: boolean;
  };
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`);
  };

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step=1&courseId=${courseId}&showSignUp=false`);
  };

  useEffect(() => {
    if (Array.isArray(courses) && id) {
      const course = courses.find((c: any) => c.courseId === id);
      setSelectedCourse(course || courses[0]);
    } else if (!id) {
      setSelectedCourse(courses ? courses[0] : null);
    }
  }, [courses, id]);

  if (isLoading) return <Loading />;
  if (isError || !courses)
    return <div>There was an error fetching the courses</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available courses</h1>
      <h2 className="search__subtitle">{courses.length} courses available</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__courses-grid"
        >
          {courses.map((course) => (
            <CourseCardSearch
              key={course.courseId}
              isSelected={selectedCourse?.courseId === course.courseId}
              course={course}
              onClick={() => handleCourseSelect(course)}
            />
          ))}
        </motion.div>
        {selectedCourse && (
                <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="search__selected-course"
              >
                <SelectedCourse course={selectedCourse} handleEnrollNow={handleEnrollNow} />
              </motion.div>
      )}
      </div>
    </motion.div>
  );
};

export default Search;
