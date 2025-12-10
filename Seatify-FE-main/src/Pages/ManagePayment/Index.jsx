import React, { useEffect, useState } from "react";
import PaymentsComponent from "../../Components/Payments/Index.jsx";
import { getPaymentsList } from "../../api/paymentApi.jsx";
import Loading from "../../Components/Common/Loading/index.jsx";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [paymentsInfo, setPaymentsInfo] = useState([]);
  const [error, setError] = useState(null);

  const fetchPaymentsInfo = async () => {
    try {
      const response = await getPaymentsList();
      if (response?.data) {
        setPaymentsInfo(response?.data);
      } else {
        setPaymentsInfo([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {loading ? <Loading /> : <PaymentsComponent apiRes={paymentsInfo} />}
    </div>
  );
};

export default Index;
