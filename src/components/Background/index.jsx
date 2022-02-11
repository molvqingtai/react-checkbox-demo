import React from 'react';
import PropTypes from 'prop-types';

import textureImage from '../../assets/images/texture.png';

/**
 * 全屏背景
 * @param {ReactNode} children [内容插槽]
 * @param {string} className [自定义 class]
 */
function Background({ children, className }) {
  return (
    <div className={`w-screen h-screen flex p-10 ${className}`} style={{ backgroundImage: `url('${textureImage}')` }}>
      {children}
    </div>
  );
}

Background.defaultProps = {
  children: '',
  className: ''
};
Background.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Background;
