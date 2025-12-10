import React, { useEffect, useState } from "react";
import OperationsComponent from "../../Components/Operation/index.jsx";
import Loading from "../../Components/Common/Loading/index.jsx";
import {
  getOperationsDetailsApi,
  getCourseDetailsApi,
  updateStatusApi,
  updateDocsStatusApi,
} from "../../api/operationsApi";

const Index = () => {
  const [OpenDocsModal, setOpenDocsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [operationsInfo, setOperationsInfo] = useState([]);
  const [courseInfo, setCourseInfo] = useState([]);
  const [institutionList, setInstitutionList] = useState([]);
  const [commonInstitutionList, setCommonInstitutionList] = useState([]);
  const [error, setError] = useState(null);

  const fetchOperationsInfo = async () => {
    try {
      const response = await getOperationsDetailsApi();
      setOperationsInfo(response?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseInfo = async () => {
    try {
      const response = await getCourseDetailsApi();
      setCourseInfo(response?.data?.course_info || []);
      setInstitutionList(response?.data?.institution_list || []);
      setCommonInstitutionList(response?.data?.total_institution || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperationsInfo();
    fetchCourseInfo();
  }, []);

  const transformData = (sourceArray) => {
    return sourceArray?.map((item, index) => {
      const {
        student_details,
        document_details,
        order_details,
        course_details,
        status_details,
      } = item;

      return {
        id: index + 1, // You can modify the ID logic as needed
        name: `${order_details.first_name} ${order_details.last_name}`,
        email: order_details.email,
        orderid: order_details.id,
        mobile: order_details.phone || "N/A", // Assuming phone key, default to N/A if missing
        dob: student_details.billing_dob,
        amount: parseFloat(order_details.total_amount),
        department: course_details.post_title,
        post_name: course_details.post_name,
        institution_name: course_details.institution_name,
        product_id: course_details.product_id,
        document_details: document_details,
        admission_userid: status_details[0].admission_userid,
        status: status_details[0]?.status || "Unknown Status",
      };
    });
  };

  const handleOkStatus = async (userId, newStatus) => {
    try {
      await updateStatusApi(userId, newStatus);
      fetchOperationsInfo();
    } catch (error) {
      setError(error.message);
    }
  };

  const updateVerifyStatus = async (values) => {
    try {
      const responseOne = await updateDocsStatusApi(values);
      if (responseOne) {
        // await fetchOperationsInfo();
        const response = await getOperationsDetailsApi();
        setOperationsInfo(response?.data || []);
        setOpenDocsModal(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const requiredArray = transformData(operationsInfo);

  return (
    <OperationsComponent
      courseApi={courseInfo}
      institutionApi={institutionList}
      commonInstitutionApi={commonInstitutionList}
      operationsApi={requiredArray}
      handleOkStatus={handleOkStatus}
      updateVerifyStatus={updateVerifyStatus}
      isOpenDocsModal={OpenDocsModal}
    />
  );
};

export default Index;
