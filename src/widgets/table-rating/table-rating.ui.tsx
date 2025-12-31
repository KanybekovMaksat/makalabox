import {
  Avatar,
  Pagination,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const TABLE_HEAD = ['№', 'Пользователь', 'Email', 'Публикации'];

const PAGE_SIZE = 10;
const API =
  'https://api.makalabox.com/api/articles/article-stats/count-by-user/';

export function TableRating() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(API).then((res) => setData(res.data)).catch(console.error);
  }, []);


  const pageCount = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);


  return (
    <div className="w-full bg-white rounded-md border border-sc-100 bg-[white] py-3 overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Рейтинг авторов</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-sc-100 ">
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-3 text-center">
                <Typography className="font-medium opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map(
            (
              { photo, fullName, email, articleCount, username, official },
              index
            ) => {
              const globalIndex = (page - 1) * PAGE_SIZE + index + 1;

              return (
                <tr key={username} className="border-b border-sc-100 last:border-none">
                  <td className="p-2 text-center">{globalIndex}</td>

                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={`https://api.makalabox.com/${photo}`}
                        alt={fullName}
                        sx={{ width: 34, height: 34 }}
                      />

                      <div className="flex flex-col">
                        <Typography className="text-sm flex items-center gap-1">
                          {fullName}
                          {official && (
                            <Tooltip title="Официальный аккаунт">
                              <img
                                src="/official.svg"
                                alt=""
                                className="h-[18px]"
                              />
                            </Tooltip>
                          )}
                        </Typography>

                        <Link
                          to={`/${username}`}
                          className="text-xs opacity-70"
                        >
                          @{username}
                        </Link>
                      </div>
                    </div>
                  </td>

                  <td className="p-2 text-center">
                    <Typography className="text-sm opacity-70">
                      {email}
                    </Typography>
                  </td>

                  <td className="p-2 text-center font-medium">
                    {articleCount}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 mt-4">
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
}
