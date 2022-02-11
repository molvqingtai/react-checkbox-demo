import React from 'react';
import PropTypes from 'prop-types';

/**
 * 标签
 * @param {ReactNode} children [标签内容]
 * @param {Function} onClose [点击关闭按钮时触发]
 * @param {string} className [自定义 class]
 */

function Tag({ children, onClose, className }) {
  const handleClose = () => {
    onClose(children);
  };
  return (
    <div
      className={`py-1 px-3 m-2 bg-secondary rounded-2xl inline-flex items-center text-gray-600 leading-none select-none shadow-sm ${className}`}
    >
      <i onClick={handleClose} className="material-icons text-lg mr-2 cursor-pointer active:text-gray-400">
        cancel
      </i>
      <span className="text-base">{children}</span>
    </div>
  );
}

Tag.defaultProps = {
  onClose: () => {},
  className: ''
};
Tag.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Tag;
