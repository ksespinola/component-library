import { render } from 'react-dom';
import React from 'react';

import ColumnOrganizer from '../src';

import sandboxStyles from './sandbox.scss';

const def = {
  configurable: true,
  editable: false,
  hidden: false,
  label: '',
  key: '',
  sortable: false,
  sortKey: ''
};

const renderCell = (rowData, i) => <td key={`cell-${rowData.key}-${i}`}>{rowData.text}</td>;

const columnDefinitions = [
  Object.assign({ def, renderer: renderCell }, { label: 'Col A', key: 'colA' }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col B', key: 'colB', configurable: false }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col C', key: 'colC' }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col D', key: 'colD' }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col E', key: 'colE' }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col F', key: 'colF' }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col G with a very long name that will probably wrap if given the chance', key: 'colG' }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col H', key: 'colH' }),
  Object.assign({ def, renderer: renderCell }, { label: 'Col I', key: 'colI' })
];

const onChange = (newColumnDefinitions) => {
  console.warn(newColumnDefinitions); // eslint-disable-line
};

const stylesheets = [sandboxStyles];

const lockLimit = 3;

render(
  <ColumnOrganizer
    {...{
      lockLimit,
      onChange,
      options: columnDefinitions,
      stylesheets
    }}
  />,
  window.document.getElementById('root')
);
