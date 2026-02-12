import React from 'react';
import { CONCRETE_TEXTURE_URI } from '../constants';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-40"></div>
      <div
        className="fixed inset-0 pointer-events-none z-40 mix-blend-multiply opacity-[0.03]"
        style={{ backgroundImage: `url("${CONCRETE_TEXTURE_URI}")` }}
      ></div>
    </>
  );
};

export default BackgroundEffects;