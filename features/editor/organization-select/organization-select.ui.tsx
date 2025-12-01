import Select from 'react-select';
import { OrganizationQueries } from '~entities/organization';

type OrganizationSelectProps = {
  selectOrg: number | null;
  handleChange: (selectedOption: number | null) => void;
};

type ValueType<T> = T | T[] | null | undefined;

export function OrganizationSelect({ handleChange}: OrganizationSelectProps) {
  
  const {
    data: organizationOptions,
    isLoading,
    isError,
  } = OrganizationQueries.useGetOrganization();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !organizationOptions || !organizationOptions.data) {
    return <div>Error fetching user data.</div>;
  }

  const transformData = (organizations) => {
    const groupedOptions = [];

    organizations.forEach((category) => {
      const categoryOptions = {
        label: category.name,
        options: [],
      };

      if (category.children && category.children.length > 0) {
        category.children.forEach((subcategory) => {
          categoryOptions.options.push({
            value: subcategory.id,
            label: subcategory.name,
          });
        });
      } else {
        categoryOptions.options.push({
          value: category.id,
          label: category.name,
        });
      }

      groupedOptions.push(categoryOptions);
    });

    return groupedOptions;
  };

  const options = transformData(organizationOptions.data);

  const handleSelectChange = (selectedOption: ValueType<{ value: number; label: string }>) => {
    const selectedId: number | null = selectedOption ? (selectedOption as { value: number }).value : null;
    handleChange(selectedId);
  };

  
  return (
    <Select
      className="my-2 w-full"
      isClearable
      isSearchable
      placeholder="Организации"
      options={options}
      onChange={handleSelectChange}
    />
  );
}
