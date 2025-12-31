import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');
import Chart from 'react-apexcharts';
import { TableRating } from '~widgets/table-rating';

const API = 'https://api.makalabox.com/api/articles/article-stats';

export function RatingPage() {
  const [organizations, setOrganizations] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/count-by-organization/`),
      axios.get(`${API}/count-by-month/`),
    ])
      .then(([orgRes, monthRes]) => {
        setOrganizations(orgRes.data);
        setMonths(monthRes.data);
      })
      .catch(console.error);
  }, []);


  const orgCounts = useMemo(
    () => organizations.map((i) => i.articleCount),
    [organizations]
  );

  const monthLabels = useMemo(
    () => months.map((i) => dayjs(i.month).format('MMMM').toUpperCase()),
    [months]
  );

  const monthCounts = useMemo(
    () => months.map((i) => i.articleCount),
    [months]
  );

  const articleCounts = orgCounts;
  const articleCountsMonth = monthCounts;
  const month = monthLabels;


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
      chart: { toolbar: { show: true } },
      plotOptions: { bar: { borderRadius: 5, borderRadiusApplication: 'end', horizontal: false } },
      title: { show: '' },
      dataLabels: { enabled: false },
      colors: ['#004F80'],
      stroke: { lineCap: 'round', curve: 'smooth' },
      markers: { size: 0 },
      xaxis: {
        axisTicks: { show: false },
        axisBorder: { show: false },
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
        xaxis: { lines: { show: true } },
        padding: { top: 0, right: 2 },
      },
      fill: { opacity: 0.8 },
    },
  };

  const chartLineConfig = {
    type: 'line',
    height: 340,
    series: [{ name: 'Публикаций', data: articleCountsMonth }],
    options: {
      chart: { toolbar: { show: true } },
      title: { show: 'Статистика по публикациям' },
      dataLabels: { enabled: false },
      colors: ['#004F80'],
      stroke: { lineCap: 'round', curve: 'smooth' },
      markers: { size: 0 },
      xaxis: {
        axisTicks: { show: false },
        axisBorder: { show: false },
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
        xaxis: { lines: { show: true } },
        padding: { top: 0, right: 2 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: 'dark' },
    },
  };

  return (
    <Container maxWidth="md" className="flex flex-col items-center mt-5 gap-8 mb-10">
      <div className="bg-[white] rounded-md border border-sc-100 pr-4 py-3 w-full overflow-x-auto">
        <h2 className="text-2xl font-bold text-center">Рейтинг по институтам</h2>
        <div className="min-w-[700px] max-w-full">
          <Chart width="100%" {...chartConfig} />
        </div>
      </div>

      <div className="bg-[white] rounded-md border border-sc-100 pr-4 py-3 overflow-x-auto w-full">
        <h2 className="text-2xl font-bold text-center">Статистика по публикациям</h2>
        <div className="min-w-[700px] max-w-full">
          <Chart width="100%" {...chartLineConfig} />
        </div>
      </div>

      <TableRating />
    </Container>
  );
}
