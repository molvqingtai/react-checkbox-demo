import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';

/**
 * 复选框组
 * @param {string[]} values [绑定选中值列表]
 * @param {ReactNode} children [复选框组件]
 * @param {string} direction [排列方向，vertical：纵向，horizontal：横向]
 * @param {Function} onChange [选中状态改变时触发]
 * @param {boolean} indeterminate [是否为全选样式]
 * @param {string} className [自定义 class]
 */
function CheckboxGroup({ children, className, direction, onChange, values: _values }) {
  const [values, setValues] = useState(_values);

  useEffect(() => {
    setValues(_values);
  }, [_values]);

  const directionClass = {
    vertical: 'flex-col',
    horizontal: 'flex-wrap'
  }[direction];

  const handleCheckboxGroupChange = (value) => {
    const hasValue = values.includes(value);
    const newValues = hasValue ? values.filter((item) => item !== value) : [...values, value];
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <div className={`flex py-1 cursor-pointer ${directionClass} ${className}`}>
      <Provider value={{ values, handleCheckboxGroupChange }}>{children}</Provider>
    </div>
  );
}

CheckboxGroup.defaultProps = {
  className: '',
  direction: 'vertical',
  onChange: () => {}
};
CheckboxGroup.propTypes = {
  direction: PropTypes.PropTypes.oneOf(['vertical', 'horizontal']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CheckboxGroup;
