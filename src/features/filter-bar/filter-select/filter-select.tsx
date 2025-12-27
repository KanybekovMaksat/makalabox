import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { categoryQueries } from '~entities/category';

const animatedComponents = makeAnimated();

type Category = {
  id: number;
  name: string;
  children: Category[];
};

type ValueType<T> = T | T[] | null | undefined;

type CategorySelectProps = {
  selectCategory: Array<number>;
  handleChange: (selectedOptions: Array<number>) => void;
};

export function FilterSelect({
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

  const transformData = (organizations: Category[]) => {
    const groupedOptions: {
      value: number;
      label: string;
      isParent: boolean;
    }[] = [];

    organizations.forEach((category) => {
      groupedOptions.push({
        value: category.id,
        label: category.name,
        isParent: true,
      });

      if (category.children && category.children.length > 0) {
        category.children.forEach((subcategory) => {
          groupedOptions.push({
            value: subcategory.id,
            label: subcategory.name,
            isParent: false,
          });
        });
      }
    });

    return groupedOptions;
  };

  const options = transformData(organizationOptions.data);

  const handleSelectChange = (
    selectedOptions: ValueType<{ value: number; label: string }>
  ) => {
    const selectedIds: number[] = (
      selectedOptions as { value: number; label: string }[]
    ).map((option) => option.value);
    handleChange(selectedIds);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.data.isParent ? 'bold' : 'normal',
      color: state.data.isParent ? 'black' : 'inherit',
      paddingLeft: state.data.isParent ? '' : '40px',
    }),
  };

  return (
    <Select
      className="my-2 w-full"
      closeMenuOnSelect={false}
      isMulti
      isClearable
      isSearchable
      placeholder="Категории"
      components={animatedComponents}
      options={options}
      styles={customStyles}
      onChange={handleSelectChange}
      value={options.filter((option) => selectCategory.includes(option.value))}
    />
  );
}



// export function FilterSelect({ selectedCategoryIds, setSelectedCategoryIds }) {
//   const {
//     data: categories,
//     isLoading,
//     isError,
//   } = categoryQueries.useGetCategoryQuery();

//   const [expanded, setExpanded] = useState<string | false>(false);

//   const handleChange = (panel: string) => (_, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const handleCategorySelect = (id: number) => {
//     const newSelectedCategoryIds: number[] = selectedCategoryIds.includes(id)
//       ? selectedCategoryIds.filter((categoryId) => categoryId !== id)
//       : [...selectedCategoryIds, id];
//     setSelectedCategoryIds(newSelectedCategoryIds);
//   };

//   const isCategorySelected = (id: number) => {
//     return selectedCategoryIds.includes(id);
//   };

//   return (
//     <Accordion
//       expanded={expanded === 'panel2'}
//       onChange={handleChange('panel2')}
//       className="my-5 shadow-none border-2 border-sc-100 "
//     >
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel2bh-content"
//         id="panel2bh-header"
//         className="text-pc-400"
//       >
//         Категории
//       </AccordionSummary>
//       <AccordionDetails className="max-h-[300px] overflow-y-auto p-0 break-words">
//         {categories?.data?.map((category) => (
//           <div key={category.id}>
//             <MenuItem
//               onClick={() => handleCategorySelect(category.id)}
//               className={`overflow-hidden md:max-w-[300px] duration-300 flex justify-between p-4 border-b border-solid ${
//                 isCategorySelected(category.id)
//                   ? 'bg-second-100/80 text-pc-100'
//                   : 'bg-white text-pc-400'
//               }`}
//             >
//               <p className="truncate font-bold text-[black]">
//                 {' '}
//                 {category.name}
//               </p>
//               {isCategorySelected(category.id) ? (
//                 <TaskAltIcon />
//               ) : (
//                 <RadioButtonUncheckedIcon />
//               )}
//             </MenuItem>
//             {category.children && category.children.length > 0 && (
//               <div className="">
//                 {category.children.map((child) => (
//                   <MenuItem
//                     key={child.id}
//                     onClick={() => handleCategorySelect(child.id)}
//                     className={`overflow-hidden md:max-w-[300px] duration-300 flex justify-between p-4 border-b border-solid  ${
//                       isCategorySelected(child.id)
//                         ? 'bg-second-100/80 text-pc-100'
//                         : 'bg-white text-pc-400'
//                     }`}
//                   >
//                     {child.name.length >= 23 ? (
//                       <Tooltip title={child.name}>
//                         <p className="truncate"> {child.name}</p>
//                       </Tooltip>
//                     ) : (
//                       <p className="truncate"> {child.name}</p>
//                     )}

//                     {isCategorySelected(child.id) ? (
//                       <TaskAltIcon />
//                     ) : (
//                       <RadioButtonUncheckedIcon />
//                     )}
//                   </MenuItem>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </AccordionDetails>
//     </Accordion>
//   );
// }
// export function FilterSelect({ selectedCategoryIds, setSelectedCategoryIds }) {
//   const {
//     data: categories,
//     isLoading,
//     isError,
//   } = categoryQueries.useGetCategoryQuery();

//   const [expanded, setExpanded] = useState<string | false>(false);

//   const handleChange = (panel: string) => (_, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const isCategorySelected = (id: number) => {
//     return selectedCategoryIds.includes(id);
//   };

//   return (
//     <Accordion
//       expanded={expanded === 'panel2'}
//       onChange={handleChange('panel2')}
//       className="my-5 shadow-none border-2 border-sc-100 "
//     >
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel2bh-content"
//         id="panel2bh-header"
//         className="text-pc-400"
//       >
//         Категории
//       </AccordionSummary>
//       <AccordionDetails className="max-h-[300px] overflow-y-auto p-0 break-words">
//         {categories?.data?.map((category) => (
//           <div key={category.id}>
//             <MenuItem
//               onClick={() => setSelectedCategoryIds(category.id)}
//               className={`overflow-hidden md:max-w-[300px] duration-300 flex justify-between p-4 border-b border-solid ${
//                 isCategorySelected(category.id)
//                   ? 'bg-second-100/80 text-pc-100'
//                   : 'bg-white text-pc-400'
//               }`}
//             >
//               <p className="truncate font-bold text-[black]">
//                 {category.name}
//               </p>
//               {isCategorySelected(category.id) ? (
//                 <TaskAltIcon />
//               ) : (
//                 <RadioButtonUncheckedIcon />
//               )}
//             </MenuItem>
//             {category.children && category.children.length > 0 && (
//               <div className="">
//                 {category.children.map((child) => (
//                   <MenuItem
//                     key={child.id}
//                     onClick={() => setSelectedCategoryIds(child.id)}
//                     className={`overflow-hidden md:max-w-[300px] duration-300 flex justify-between p-4 border-b border-solid  ${
//                       isCategorySelected(child.id)
//                         ? 'bg-second-100/80 text-pc-100'
//                         : 'bg-white text-pc-400'
//                     }`}
//                   >
//                     {child.name.length >= 23 ? (
//                       <Tooltip title={child.name}>
//                         <p className="truncate"> {child.name}</p>
//                       </Tooltip>
//                     ) : (
//                       <p className="truncate"> {child.name}</p>
//                     )}
//                     {isCategorySelected(child.id) ? (
//                       <TaskAltIcon />
//                     ) : (
//                       <RadioButtonUncheckedIcon />
//                     )}
//                   </MenuItem>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </AccordionDetails>
//     </Accordion>
//   );
// }