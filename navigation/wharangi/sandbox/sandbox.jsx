import { render } from 'react-dom';
import React, { PropTypes } from 'react';
import qs from 'qs';

import Wharangi from '../src';

class PaginationExample extends React.Component {
  static propTypes = {
    pagesToShow: PropTypes.number,
    perPage: PropTypes.number,
    totalRecords: PropTypes.number
  }

  static defaultProps = {
    pagesToShow: 3,
    perPage: 10,
    totalRecords: 39
  };

  constructor(props) {
    super(props);

    this.state = { active: 1 };
  }

  onChange = (page) => {
    this.setState({ active: page }, () => {
      Wharangi.updateUrl({ page });
    });
  }

  onMount = () => {
    const { perPage, totalRecords } = this.props;

    const totalPages = Math.ceil(totalRecords / perPage);

    const url = window.location.href.split('?');
    const params = qs.parse(url[1]);
    const paramPage = parseInt(params.page, 10) || 1;
    const page = Math.max(1, Math.min(paramPage, totalPages));

    Wharangi.updateUrl({ per_page: perPage, page });
  }

  render() {
    const { totalRecords, pagesToShow, perPage } = this.props;
    const { active } = this.state;

    return (
      <Wharangi
        {...{
          onSelect: this.onChange,
          active,
          onMount: this.onMount,
          pagesToShow,
          perPage,
          totalRecords
        }}
      />
    );
  }
}

render(
  <PaginationExample />,
  window.document.getElementById('root')
);
