import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * 搜索框
 * @param {string} value [绑定值]
 * @param {Function} onChange [失去焦点时触发]
 * @param {Function} onSearch [点击搜索或按下回车时触发]
 * @param {Function} onClear [点击清除按钮时触发]
 * @param {Function} onInput [在 input 值发生改变时触发]
 * @param {string} className [自定义 class]
 * @param {string} placeholder [输入框占位文本]
 */
function SearchBar({ value: _value, placeholder, onChange, onSearch, onClear, onInput, className }) {
  const inputRef = useRef(null);
  const [value, setValue] = useState(_value);

  useEffect(() => {
    setValue(_value);
  }, [_value]);

  const handleInput = (event) => {
    const value = event.target.value;
    setValue(value);
    onInput(value);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    onChange(value);
  };
  const handleKeyUp = ({ code }) => {
    if (code === 'Enter') {
      onSearch(value);
    }
  };
  const handleClear = () => {
    onChange('');
    onInput('');
    onClear('');
    setValue('');
    inputRef.current.focus();
  };
  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <div
      className={`py-1 border-b-2 border-gray-200 focus-within:border-theme flex transition duration-150 ${className}`}
    >
      <input
        ref={inputRef}
        value={value}
        onInput={handleInput}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        className="flex-1 outline-none bg-transparent"
        type="text"
      />
      {value && (
        <button type="button" className="mx-1 flex items-center" onClick={handleClear}>
          <i className="material-icons material-icons-outlined text-gray-300 hover:text-theme active:text-minor">
            close
          </i>
        </button>
      )}
      <button type="submit" className="mx-1 flex items-center" onClick={handleSearch}>
        <i className="material-icons material-icons-outlined text-gray-300 hover:text-theme active:text-minor">
          search
        </i>
      </button>
    </div>
  );
}

SearchBar.defaultProps = {
  className: '',
  value: '',
  onInput: () => {},
  onChange: () => {},
  onSearch: () => {},
  onClear: () => {},
  placeholder: 'Search...'
};

SearchBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string
};

export default SearchBar;
