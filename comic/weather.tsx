import React, { useState } from 'react';
import { Select, Card } from 'antd';
import { Line } from '@antv/g2plot';

const { Option } = Select;

const cities = [
  { name: '北京', data: [{ time: '00:00', max: 28, min: 18 }, { time: '01:00', max: 27, min: 17 }, ...] },
  { name: '上海', data: [{ time: '00:00', max: 30, min: 22 }, { time: '01:00', max: 29, min: 21 }, ...] },
  { name: '广州', data: [{ time: '00:00', max: 32, min: 24 }, { time: '01:00', max: 31, min: 23 }, ...] },
  { name: '深圳', data: [{ time: '00:00', max: 33, min: 25 }, { time: '01:00', max: 32, min: 24 }, ...] },
];

const WeatherChart = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [chart, setChart] = useState(null);

  const handleCitySelect = (values) => {
    setSelectedCities(values);
  };

  const renderChart = () => {
    if (chart) {
      chart.destroy();
    }

    const data = selectedCities.reduce((acc, city) => {
      const cityData = cities.find(c => c.name === city).data;
      return [...acc, ...cityData.map(d => ({ ...d, city }))];
    }, []);

    const chartInstance = new Line('chart', {
      data,
      xField: 'time',
      yField: ['max', 'min'],
      seriesField: 'city',
    });

    chartInstance.render();
    setChart(chartInstance);
  };

  return (
    <div>
      <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择城市" onChange={handleCitySelect}>
        {cities.map(city => <Option value={city.name} key={city.name}>{city.name}</Option>)}
      </Select>
      <Card style={{ marginTop: '16px' }}>
        <div id="chart" />
      </Card>
      <button onClick={renderChart}>生成图表</button>
    </div>
  );
};

export default WeatherChart;
