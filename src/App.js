import './App.css';
import React from 'react';

import Chart from "react-apexcharts";
import { seriesData } from './data';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@mui/material';


const App = () => {
  const options = {
    chart: {
      id: 'chart2',
      type: 'line',
      height: 230,
      toolbar: {
        autoSelected: 'pan',
        show: false
      }
    },
    colors: ['#546E7A'],
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    annotations: {
      xaxis: [
        {
          x: new Date('09/01/2022').getTime(),
          borderColor: '#775DD0',
          label: {
            style: {
              color: 'blue',
            },
            text: 'This is a test'
          }
        },
        {
          x: new Date('10/01/2022').getTime(),
          borderColor: '#775DD0',
          orientation: 'vertical',
          label: {
            style: {
              color: 'blue',
            },
            text: 'This is a test 2'
          }
        }
      ],
      yaxis: [
        {
          y: 300,
          y2: 450,
          borderColor: '#000',
          fillColor: '#FEB019',
          label: {
            text: 'This is a test 3'
          }
        }
      ],
    },
  };


  const optionsLine = {
    chart: {
      id: 'chart1',
      height: 130,
      type: 'area',
      brush:{
        target: 'chart2',
        enabled: true
      },
      selection: {
        enabled: true,
        xaxis: {
          min: new Date('08/02/2022').getTime(),
          max: new Date('01/31/2023').getTime()
        }
      },
    },
    colors: ['#008FFB'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      }
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 2
    }
  };

  const data = seriesData.map(item => ({
    x: new Date(item.date).getTime(),
    y: item.revenue.toFixed(2)
  }));

  const series = [{
    name: 'test',
    data: data
  }];

  const seriesLine = [{
    name: 'test 2',
    data: data
  }];


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div id="wrapper">
        <div id="chart-line2">
        <Chart options={options} series={series} type="line" height={230} />
      </div>
        <div id="chart-line">
          <Chart options={optionsLine} series={seriesLine} type="area" height={130} />
        </div>
      </div>
    </div>
  );
}

export default App;
