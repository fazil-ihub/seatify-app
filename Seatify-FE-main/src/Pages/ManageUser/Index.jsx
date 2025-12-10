import React, { useEffect, useState } from "react";
import UserComponent from "../../Components/Users/Index.jsx";
import { getUsers } from "../../api/authApi.jsx";
import Loading from "../../Components/Common/Loading/index.jsx";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [usersInfo, setUsersInfo] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsersInfo = async () => {
    try {
      const response = await getUsers();
      setUsersInfo(response?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <UserComponent apiRes={usersInfo} />
    </div>
  );
};

export default Index;
