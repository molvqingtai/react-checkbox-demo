import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';

/**
 * 复选框
 * @param {string} value [绑定值]
 * @param {boolean} checked [是否选中]
 * @param {string} children [显示文字]
 * @param {Function} onChange [选中状态改变时触发]
 * @param {boolean} indeterminate [是否为全选样式]
 * @param {string} className [自定义 class]
 */
function Checkbox({ value: _value, indeterminate, checked: _checked, children, onChange, className }) {
  const { values, handleCheckboxGroupChange } = useContext(context);

  const [checked, setChecked] = useState(_checked);

  const inCheckboxGroup = typeof handleCheckboxGroupChange === 'function';

  useEffect(() => {
    setChecked(_checked);
  }, [_checked]);

  useEffect(() => {
    if (inCheckboxGroup) {
      const checked = values.includes(_value);
      setChecked(checked);
      onChange(checked);
    }
  }, [values]);

  const handleCheckboxChange = () => {
    if (inCheckboxGroup) {
      handleCheckboxGroupChange(_value);
    } else {
      onChange(!checked);
      setChecked(!checked);
    }
  };

  return (
    <div
      onClick={handleCheckboxChange}
      className={`flex items-center p-2 cursor-pointer select-none hover:bg-gray-50 rounded-md ${className}`}
    >
      <i className={`material-icons ${['text-gray-300', 'text-theme'][+checked]}`}>
        {checked ? 'check_box' : ['check_box_outline_blank', 'indeterminate_check_box'][+indeterminate]}
      </i>
      <span className="ml-3 text-gray-600">{children}</span>
    </div>
  );
}

Checkbox.defaultProps = {
  value: null,
  indeterminate: false,
  className: '',
  children: null,
  checked: false,
  onChange: () => {}
};

Checkbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool
};

export default Checkbox;
