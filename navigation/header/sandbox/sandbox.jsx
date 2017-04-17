import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line

import Header from '../src';

const headerImg = 'http://www.antolsun.com/wp-content/uploads/2014/08/ant-dota-2-takimi-kesl-300x130.jpg';

render(
  <Header headerImg={headerImg} />,
  window.document.getElementById('root'),
);
