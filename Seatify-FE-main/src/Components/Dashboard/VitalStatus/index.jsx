import React from "react";
import { Card, CardContent } from "@mui/material";

const index = ({ metrics, handleMetricClick }) => {
  return (
    <>
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleMetricClick(metric.route, metric.param)}
            style={{ backgroundColor: metric?.bgcolor }}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ color: metric?.color, fontWeight: "bold" }}>
                    {metric.title}
                  </p>
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  {/* <p
                    className={`text-sm ${
                      metric.trend.startsWith("+")
                        ? "text-black-500"
                        : "text-black-500"
                    }`}
                  >
                    {metric.trend} from last week
                  </p> */}
                </div>
                <Icon size={24} color="black" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default index;
