import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1'];

  const getData = () => {
    return genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        (event.summary || '').includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
  };

  useEffect(() => {
    setData(getData());
  }, [events]);

  // Step 11: custom label
  const renderCustomizedLabel = ({
    cx, cy, midAngle, outerRadius, percent, index,
  }) => {
    if (!percent) return null; // skip labels with 0%
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        fontSize={12}               // smaller font size
        fontWeight={600}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" align="center" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;