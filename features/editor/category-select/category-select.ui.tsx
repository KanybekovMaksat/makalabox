import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { categoryQueries } from '@/entities/category';

const animatedComponents = makeAnimated();
const MAX_CATEGORIES = 3; 

type SelectOption = {
  value: number;
  label: string;
};


const colourStyles: StylesConfig<SelectOption, true> = {
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: '#0a85d1', 
      borderRadius: '4px',
      color: 'white',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: 'white',
    paddingRight: 6,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: '#003F99',
      color: 'white',
    },
  }),
  option: (styles, { isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled ? '#f4f4f4' : styles.backgroundColor,
      color: isDisabled ? '#ccc' : styles.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
  }),
};

type Category = {
  id: number;
  name: string;
  children: Category[];
};

type ValueType<T> = T | T[] | null | undefined;

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
export const colourOptions: readonly ColourOption[] = [
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
];

type CategorySelectProps = {
  selectCategory: Array<number>;
  handleChange: (selectedOptions: Array<number>) => void;
};

export function CategorySelect({
  selectCategory,
  handleChange,
}: CategorySelectProps) {
  const {
    data: organizationOptions,
    isLoading,
    isError,
  } = categoryQueries.useGetCategoryQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  const transformData = (organizations: Category[]): SelectOption[] => {
    const options: SelectOption[] = [];

    organizations.forEach((category) => {
      options.push({
        value: category.id,
        label: category.name,
      });
    });

    return options; 
  };

  const options = transformData(organizationOptions.data);

  const handleSelectChange = (selectedOptions: ValueType<SelectOption>) => {
    let optionsArray: SelectOption[] = [];
    
    if (Array.isArray(selectedOptions)) {
        optionsArray = selectedOptions;
    } else if (selectedOptions) {
        optionsArray = [selectedOptions];
    }
    if (optionsArray.length > MAX_CATEGORIES) {
        optionsArray = optionsArray.slice(0, MAX_CATEGORIES);
    }

    const selectedIds: number[] = optionsArray.map(option => option.value);

    handleChange(selectedIds);
  };
  
  const selectedValues = options.filter(option => 
      selectCategory.includes(option.value)
  );
  

  const isMaxReached = selectCategory.length >= MAX_CATEGORIES; // 👈

  return (
    <Select
      className="my-2 w-full"
      closeMenuOnSelect={false}
      isMulti
      isClearable
      isSearchable
      styles={colourStyles}
      placeholder="Темы"
      components={animatedComponents}
      options={options}
      onChange={handleSelectChange}
      value={selectedValues} 
      isOptionDisabled={(option) => isMaxReached && !selectCategory.includes(option.value)}
    />
  );
}