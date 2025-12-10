import React, { useState, useEffect } from "react";
import StudentComponent from "../../Components/Students/Index.jsx";
import {
  getStudents,
  getOrderDetailsApi,
  getDeleteStudentDetailsApi,
} from "../../api/studentsApi.jsx";
import Loading from "../../Components/Common/Loading/index.jsx";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [error, setError] = useState(null);

  const fetchStudentsInfo = async () => {
    try {
      const response = await getStudents();
      setStudentsInfo(response?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetails = async (values) => {
    try {
      const response = await getOrderDetailsApi(values);
      return response?.data || [];
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudentApi = async (values) => {
    try {
      const response = await getDeleteStudentDetailsApi(values);
      return response?.data || [];
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <StudentComponent
          apiRes={studentsInfo}
          getOrderDetails={getOrderDetails}
          deleteStudentApi={deleteStudentApi}
        />
      )}
    </div>
  );
};

export default Index;
