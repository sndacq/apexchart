import './App.css';
import React, { useMemo, useState } from 'react';

import Chart from "react-apexcharts";
import { seriesData } from './data';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Modal,
  Box,
  Stack,
  TextField
} from '@mui/material';

const App = () => {
  const [xLabels, setXLabels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [labelTextInput, setLabelTextInput] = useState('');
  const [annotationDate, setAnnotationDate] = useState('');

  const data = seriesData.map(item => ({
    x: new Date(item.date).getTime(),
    y: item.revenue.toFixed(2)
  }));

  const handleModalClose = () => {
    setModalOpen(false);
    setLabelTextInput('');
    setAnnotationDate('');
  };

  const createAnnotation = () => {
    setXLabels([
      ...xLabels,
      {
        x: new Date(annotationDate).getTime(),
        borderColor: '#775DD0',
        orientation: 'vertical',
        label: {
          style: {
            color: 'blue',
          },
          text: labelTextInput,
        }
      }
    ]);
    handleModalClose();
  };

  const handleOnChartClick = (e, chart, options) => {
    const { dataPointIndex } = options;
    const { date } = seriesData[dataPointIndex];
    setModalOpen(true);
    setAnnotationDate(date);
  };

  const getOptions = useMemo(() => {
    return ({
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        toolbar: {
          autoSelected: 'pan',
          show: false
        },
        events: {
          click: (e, chart, options) => handleOnChartClick(e, chart, options),
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
        xaxis: [...xLabels],
      },
    });
  }, [xLabels]);

  const series = [{
    name: 'test',
    data: data
  }];

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

  const seriesLine = [{
    name: 'test 2',
    data: data
  }];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleModalInputChange = (e) => {
    setLabelTextInput(e.target.value);
  };

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
        <Chart options={getOptions} series={series} type="line" height={230} />
      </div>
        <div id="chart-line">
          <Chart options={optionsLine} series={seriesLine} type="area" height={130} />
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What annotation would you like to add?
          </Typography>
          <TextField
            label="Annotation"
            variant="outlined"
            value={labelTextInput}
            onChange={(e) => handleModalInputChange(e)}
          />
          <Stack spacing={2} direction="row">
            <Button onClick={() => createAnnotation()}>OK</Button>
            <Button onClick={() => handleModalClose()}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
