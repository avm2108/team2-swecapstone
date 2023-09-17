/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dropdown({
  value = null,
  onSelect = () => {},
  data = [],
  open = false,
  setOpen = () => {},
  onChange = () => {},
  onSearch = () => {},
  placeholder = '',
  loading = false,
  listMessageTextStyle = {},
  dropdownStyle = {},
  placeholderStyle = {color: 'grey'},
  searchable = false,
}) {
  const [items, setItems] = useState(data || []);

  useEffect(() => {
    if (data && data.length > 0) {
      setItems(data);
    }
  }, [data]);

  return (
    <DropDownPicker
      style={{borderWidth: 0, borderRadius: 25, ...dropdownStyle}}
      placeholder={placeholder}
      placeholderStyle={{...placeholderStyle}}
      open={open}
      value={value}
      loading={loading}
      listMessageTextStyle={{...listMessageTextStyle}}
      dropDownContainerStyle={{borderWidth: 0, borderRadius: 25}}
      items={items}
      setOpen={setOpen}
      setValue={onChange}
      onSelectItem={onSelect}
      searchable={searchable}
      showTickIcon={true}
      onChangeSearchText={onSearch}
      dropDownDirection="BOTTOM"
    />
  );
}
