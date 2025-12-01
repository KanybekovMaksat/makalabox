import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TABLE_HEAD = ['№', 'Пользователи', 'Email', 'Публикации'];
const TABLE_HEAD_CSV = [
  '№',
  'ФИО',
  'Псевдоним',
  'Электронная почта',
  'Количество статей',
];

const TABLE_ROWS = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'John Michael',
    email: 'john@creative-tim.com',
    username: 'ohn Michael',
    articleCount: 4,
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com',
    username: 'alexa',
    articleCount: 2,
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com',
    username: 'laurent@',
    articleCount: 6,
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
    name: 'Michael Levi',
    email: 'michael@creative-tim.com',
    username: 'michaell',
    articleCount: 8,
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    email: 'richard@creative-tim.com',
    username: 'richard',
    articleCount: 2,
  },
];

export function TableRating() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://api.makalabox.com/api/articles/article-stats/count-by-user/'
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function convertToCSV(data) {
    const header = TABLE_HEAD_CSV.join(',');
    const rows = data.map(
      ({ fullName, email, articleCount, username, official }, index) =>
        `${
          index + 1
        },${fullName},https://makalabox.com/${username},${email},${articleCount}`
    );
    return [header, ...rows].join('\n');
  }

  function downloadCSV() {
    const csv = convertToCSV(data);
    const blob = new Blob(['\ufeff', csv], {
      type: 'data:text/csv; charset=utf-8,',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rating_makalabox.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full flex flex-col bg-[white] rounded-md border border-sc-100 py-3 overflow-x-auto">
      <h2 className="text-2xl font-bold text-center">Рейтинг</h2>
      <table className="mt-4 w-[100%] text-left overflow-x-auto">
        <thead>
          <tr className="border-b border-blue-gray-100 bg-blue-gray-50/50">
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-3">
                <Typography
                  color="blue-gray"
                  className="font-medium leading-none opacity-70 text-center"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              { photo, fullName, email, articleCount, username, official },
              index
            ) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? 'p-2 text-center'
                : 'p-2 border-b border-blue-gray-50 text-center';

              return (
                <tr key={fullName}>
                  <td className={classes}>{index + 1}</td>
                  <td className={classes}>
                    <div className="flex items-center gap-3 ">
                      <Avatar
                        src={`https://api.makalabox.com/${photo}`}
                        alt={fullName}
                        className="w-[34px] h-[34px]"
                      />
                      <div className="flex flex-col text-left">
                        <Typography color="blue-gray" className="text-sm flex items-center gap-1">
                          {fullName}
                          {official ? (
                            <Tooltip
                              title="Официальный аккаунт"
                              className="hover:cursor-pointer"
                            >
                              <img
                                src="/official.svg"
                                alt=""
                                className="h-[20px]"
                              />
                            </Tooltip>
                          ) : null}
                        </Typography>
                        <Link
                          to={`/${username}`}
                          className="font-normal opacity-70 text-xs"
                        >
                          @{username}

                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      color="blue-gray"
                      className="font-normal opacity-70 text-sm"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography color="blue-gray" className="text-center">
                      {articleCount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max"></div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <Button
        className="shadow-none self-end bg-second-100"
        size="small"
        variant="contained"
        onClick={downloadCSV}
      >
        Скачать CSV
      </Button>
    </div>
  );
}
