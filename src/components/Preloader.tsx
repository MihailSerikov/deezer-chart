import React from 'react';
import cx from 'classnames';

interface PreloaderProps {
  type?: 'big' | 'small';
  isActive: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ type, isActive }) => {
  return (
    <div
      className={cx('preloader-wrapper', { active: isActive, type: !!type })}
    >
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};
