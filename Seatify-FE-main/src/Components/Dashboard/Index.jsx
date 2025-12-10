import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronRight,
  FileCheck2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VitalStatus from "./VitalStatus";
import { getDashboardInfo } from "../../api/dashboardApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metricsInfo, setMetricsInfo] = useState([]);
  const [error, setError] = useState(null);

  const fetchDashboardMetrics = async () => {
    try {
      const response = await getDashboardInfo();
      if (response?.data) {
        setMetricsInfo(response?.data);
      } else {
        setMetricsInfo([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const aprilPayment = metricsInfo?.monthly_payment?.april || 0;

  const mayPayment = metricsInfo?.monthly_payment?.may || 0;

  const junePayment = metricsInfo?.monthly_payment?.june || 0;

  // Sample data for different charts
  const monthlyPaymentData = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 0 },
    { month: "Apr", amount: Number(aprilPayment)?.toFixed(2) },
    { month: "May", amount: Number(mayPayment)?.toFixed(2) },
    { month: "Jun", amount: Number(junePayment)?.toFixed(2) },
    { month: "Jul", amount: 0 },
    { month: "Aug", amount: 0 },
    { month: "Sep", amount: 0 },
    { month: "Oct", amount: 0 },
    { month: "Nov", amount: 0 },
    { month: "Dec", amount: 0 },
  ];

  const studentStatusData = [
    {
      status: "Invoice Generated",
      value: Number(metricsInfo?.vital_status?.invoice_generated?.count),
      color: "#4CAF50",
    },
    {
      status: "Payment Paid",
      value: Number(metricsInfo?.vital_status?.payment_paid?.count),
      color: "#FFEDBB",
    },
    {
      status: "Document Upload Pending",
      value: Number(metricsInfo?.vital_status?.document_upload_pending?.count),
      color: "#B0DDF2",
    },
    {
      status: "Document Uploaded",
      value: Number(metricsInfo?.vital_status?.document_uploaded?.count),
      color: "#E8FFC6",
    },
    {
      status: "Document Verified",
      value: Number(metricsInfo?.vital_status?.document_verified?.count),
      color: "#FC9402",
    },
    {
      status: "Onboarded",
      value: Number(metricsInfo?.vital_status?.onboarded?.count),
      color: "#0A8ABD",
    },
  ];

  const verificationTrendData = [
    { date: "Mon", verified: 8, pending: 5 },
    { date: "Tue", verified: 12, pending: 6 },
    { date: "Wed", verified: 15, pending: 4 },
    { date: "Thu", verified: 10, pending: 7 },
    { date: "Fri", verified: 18, pending: 3 },
  ];

  const metrics = [
    {
      title: "Invoice Generated",
      value: metricsInfo?.vital_status?.invoice_generated?.count,
      trend: "+5",
      icon: Clock,
      color: "black",
      bgcolor: "#B0DDF2",
      route: "/operation",
      param: "Invoice Generated",
    },
    {
      title: "Payment Paid",
      value: metricsInfo?.vital_status?.payment_paid?.count,
      trend: "+5",
      icon: FileCheck2,
      color: "#black",
      bgcolor: "#FFEDBB",
      route: "/operation",
      param: "Payment Paid",
    },
    {
      title: "Document Upload Pending",
      value: metricsInfo?.vital_status?.document_upload_pending?.count,
      trend: "+12",
      icon: CheckCircle,
      color: "#black",
      bgcolor: "#F7C69B",
      route: "/operation",
      param: "Document Upload Pending",
    },
    {
      title: "Document Uploaded",
      value: metricsInfo?.vital_status?.document_uploaded?.count,
      trend: "-2",
      icon: AlertCircle,
      color: "#black",
      bgcolor: "#E8FFC6",
      route: "/operation",
      param: "Document Uploaded",
    },
    {
      title: "Document Verified",
      value: metricsInfo?.vital_status?.document_verified?.count,
      trend: "+3",
      icon: XCircle,
      color: "#black",
      bgcolor: "#FC9402",
      route: "/operation",
      param: "Document Verified",
    },
    {
      title: "Onboarded",
      value: metricsInfo?.vital_status?.onboarded?.count,
      trend: "+3",
      icon: XCircle,
      color: "#ffffff",
      bgcolor: "#0A8ABD",
      route: "/operation",
      param: "Onboarded",
    },
  ];

  const handleMetricClick = (route, param) => {
    navigate(route, { state: { status: param } });
  };

  return (
    <div className="p-6 bg-[#F7F8FA]">
      <h1 className="mb-6 text-4xl font-bold">Dashboard Overview</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-5">
        <VitalStatus metrics={metrics} handleMetricClick={handleMetricClick} />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* Monthly Payment Trend */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Monthly Payment Trend</h2>
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPaymentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#2196F3"
                    fill="#2196F3"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status Distribution */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Student Status Distribution
              </h2>
              <Users className="text-blue-500" size={20} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentStatusData}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {studentStatusData?.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Verification Trend */}
        <Card className="md:col-span-2">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Weekly Verification Trend
              </h2>
              <ChevronRight
                className="cursor-pointer text-blue-500"
                size={20}
                onClick={() => navigate("/operation")}
              />
            </div>
            <div className="h-64" hidden>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={verificationTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="onboarded" name="Onboarded" fill="#0A8ABD" />
                  <Bar
                    dataKey="pending"
                    name="Document Verification Pending"
                    fill="#FC9402"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
