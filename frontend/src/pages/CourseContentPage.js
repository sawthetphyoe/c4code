import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../store';

function CourseContentPage() {
  const { id } = useParams();
  const {
    data: courseData,
    error: courseError,
    isLoading: courseLoading,
  } = useGetCourseQuery(id);

  let content;
  if (courseLoading) {
    content = <h1>Course is loading...</h1>;
  } else if (courseError) {
    content = <h1>{courseError.data.message}</h1>;
  } else {
    const course = courseData.data.data;
    content = (
      <>
        <h1>{course.name}</h1>
        <br />
        <h1>{course.category.name}</h1>
      </>
    );
  }

  return <h1>{content}</h1>;
}

export default CourseContentPage;
