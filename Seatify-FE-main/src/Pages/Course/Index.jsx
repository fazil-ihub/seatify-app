import React, { useEffect, useState } from "react";
import CourseComponent from "../../Components/Courses/Index.jsx";
import { getCourses } from "../../api/courseApi.jsx";
import Loading from "../../Components/Common/Loading/index.jsx";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState([]);
  const [institutionList, setInstitutionList] = useState([]);
  const [commonInstitutionList, setCommonInstitutionList] = useState([]);

  const [error, setError] = useState(null);

  const fetchCourseInfo = async () => {
    try {
      const response = await getCourses();
      setCourseInfo(response?.data?.course_info || []);
      setInstitutionList(response?.data?.institution_list || []);
      setCommonInstitutionList(response?.data?.setCommonInstitutionList || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        {loading ? <Loading /> : <CourseComponent apiRes={courseInfo} />}
      </div>
    </>
  );
};

export default Index;
