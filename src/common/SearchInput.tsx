import React, { useCallback, useEffect, useState } from 'react';
import { Icon, Input, InputProps } from 'semantic-ui-react';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import { debounce } from 'lodash';

type SearchInputProps = {
  onSearch: (value: string) => void
} & InputProps;

const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch,
  ...rest
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedOnSearch = useCallback(debounce(onSearch, 500), [onSearch]);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setSearchValue(data.value);
  };
  
  useEffect(() => {
    debouncedOnSearch(searchValue);
  }, [searchValue, debouncedOnSearch]);
  
  return (
    <Input onChange={handleOnChange}
      icon={searchValue ? 
        (<Icon name='close'
          link
          onClick={() => setSearchValue('')}
        />) : 'search'}
      value={searchValue}
      {...rest}
    />
  );
};

export default SearchInput;