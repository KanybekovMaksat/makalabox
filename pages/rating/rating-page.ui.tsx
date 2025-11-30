import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

import Chart from 'react-apexcharts';
import { TableRating } from '~widgets/table-rating';
import { Helmet } from 'react-helmet-async';

export function RatingPage() {
  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://api.makalabox.com/api/articles/article-stats/count-by-organization/'
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        'https://api.makalabox.com/api/articles/article-stats/count-by-month/'
      )
      .then((response) => {
        setDataChart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const names = data.map((item) => item.name);
  const articleCounts = data.map((item) => item.articleCount);
  const articleCountsMonth = dataChart.map((item) => item.articleCount);
  const month = dataChart.map((item) =>
    dayjs(item.month).format('MMMM').toUpperCase()
  );
  const chartConfig = {
    type: 'bar',
    height: 350,
    series: [
      {
        name: 'Статьи',
        data: articleCounts,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: 'end',
          horizontal: false,
        },
      },
      title: {
        show: '',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#004F80'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#004F80',
            fontSize: '11px',
            fontFamily: 'inherit',
            fontWeight: 700,
          },
        },
        categories: [
          'КИТЭ',
          'КОМТЕХНО',
          'ИДАТ',
          'ИЭМK',
          'ИМКП',
          'ИСИТ',
          'ИЦТП',
          'ИЭМ',
          'ИЭТ',
          'РКИАУБ',
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: '#004F80',
            fontSize: '10px',
            fontFamily: 'inherit',
            fontWeight: 700,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 2,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'light',
      },
    },
  };

  const chartLineConfig = {
    type: 'line',
    height: 340,
    series: [
      {
        name: 'Публикаций',
        data: articleCountsMonth,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: 'Статистика по публикациям',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#004F80'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#004F80',
            fontSize: '10px',
            fontFamily: 'inherit',
            fontWeight: 700,
          },
        },
        categories: month,
      },
      yaxis: {
        labels: {
          style: {
            colors: '#004F80',
            fontSize: '10px',
            fontFamily: 'inherit',
            fontWeight: 700,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 2,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };

  return (
    <Container
      maxWidth="md"
      className="flex flex-col items-center mt-5 gap-8 mb-10"
    >
      <Helmet prioritizeSeoTags>
        <title>Makalabox - Рейтинг</title>
        <meta
          name="description"
          content="На сайте есть рейтинги публикаций и организаций, а также различные номинации."
        />
        <meta property="og:title" content="Makalabox - Рейтинг" />
        <meta
          property="og:description"
          content="На сайте есть рейтинги публикаций и организаций, а также различные номинации."
        />
        <meta property="og:locale" content="ru_Ru" />
      </Helmet>
      <div className="bg-[white] rounded-md border border-sc-100 pr-4 py-3 w-full overflow-x-auto">
        <h2 className="text-2xl font-bold text-center">
          Рейтинг по институтам
        </h2>
        <div className="min-w-[700px] max-w-full">
          <Chart width={'100%'} {...chartConfig} />
        </div>
      </div>
      <div className="bg-[white] rounded-md border border-sc-100 pr-4 py-3 overflow-x-auto w-full">
        <h2 className="text-2xl font-bold text-center">
          Статистика по публикациям
        </h2>
        <div className="min-w-[700px] max-w-full">
          <Chart width={'100%'} {...chartLineConfig} />
        </div>
      </div>

      <TableRating />

      {/* <PieChart
          height={300}
          width={300}
          className="flex  justify-center"
          series={[
            {
              data: [
                { id: 0, value: 20, label: 'series A' },
                { id: 1, value: 20, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
                { id: 3, value: 20, label: 'series A' },
                { id: 4, value: 60, label: 'series B' },
                { id: 5, value: 20, label: 'series C' },
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          // slotProps={{
          //   legend: {
          //     direction: 'column',
          //     position: { vertical: 'bottom', horizontal: 'left' },
          //     padding: 0,
          //   },
          // }}
          slotProps={{ legend: { hidden: true } }}
        /> */}
    </Container>
  );
}
