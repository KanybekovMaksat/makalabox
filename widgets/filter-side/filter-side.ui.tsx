import { styled } from '@mui/material/styles';
import { Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FilterSelect } from '~features/filter-bar/filter-select';
import { useSearchParams } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid #EFEFEF',
  width: '100%',
  background: 'white',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '40px',
  },
}));

export function FilterSide() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (event) => {
    searchParams.set('search', event.target.value);
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = () => {
    setSearchParams(searchParams);
  };

  const handleCategorySelect = (selectedCategoryIds) => {
    searchParams.delete('categories');
    selectedCategoryIds.forEach((catId) =>
      searchParams.append('categories', catId.toString())
    );
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-[650px] mx-auto ">
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon className="text-pc-500" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={searchParams.get('search') || ''}
            onChange={handleSearchChange}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </div>
      <div className="flex flex-col gap- items-center">
        <FilterSelect
          selectCategory={searchParams.getAll('categories').map(Number)}
          handleChange={handleCategorySelect}
        />
        <Button
          className="w-full bg-second-100 shadow-none"
          variant="contained"
          onClick={handleSearchSubmit}
        >
          Применить
        </Button>
      </div>
    </div>
  );
}

// const handleSearchChange = (event) => {
//   const query = event.target.value;
//   setSearchQuery(query);
//   getArticle(query);
// };
