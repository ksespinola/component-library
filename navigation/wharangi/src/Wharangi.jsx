import React, { PropTypes } from 'react';
import qs from 'qs';
import cx from 'classnames';
import baseStyles from './Wharangi.scss';
import defaultStyles from './WharangiDefault.scss';
import composeStyles from '../../../shared/stylesheetComposer';

let styles = {};

export default class Wharangi extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    perPage: PropTypes.number,
    pagesToShow: PropTypes.number,
    stylesheets: PropTypes.arrayOf(PropTypes.shape()),
    totalRecords: PropTypes.number,
    onMount: PropTypes.func,
    active: PropTypes.number
  };

  static defaultProps = {
    onSelect: null,
    perPage: 150,
    pagesToShow: 3,
    stylesheets: [],
    totalRecords: 0,
    onMount: () => {},
    active: 1
  };

  static updateUrl(newParams) {
    const url = window.location.href.split('?');
    const params = qs.parse(url[1]);
    const updatedParams = Object.assign(params, newParams);

    const tmp = qs.stringify(updatedParams, { arrayFormat: 'brackets' });
    history.pushState(history.state, '', `${url[0]}?${tmp}`);
  }

  constructor(props) {
    super(props);

    styles = composeStyles(baseStyles, [defaultStyles, ...props.stylesheets]);
  }

  componentDidMount() {
    const { onMount } = this.props;

    onMount();
  }

  handleSelect(page) {
    const { onSelect, active } = this.props;

    if (active === page) {
      return;
    }

    onSelect(page);
  }

  render() {
    const {
      pagesToShow,
      perPage,
      totalRecords,
      active
    } = this.props;

    const totalPages = Math.ceil(totalRecords / perPage);

    const recordRange = {
      start: ((active - 1) * perPage) + 1,
      end: Math.min(active * perPage, totalRecords)
    };

    const start = active > 2 ? active - 1 : 1;
    const pageRange = {
      start,
      end: Math.min(start + (pagesToShow - 1), totalPages)
    };


    const msg = (totalRecords === 0)
      ? 'Displaying 0'
      : `Displaying ${recordRange.start || 0} - ${recordRange.end || 0}`;

    const items = [];
    for (let i = pageRange.start; i <= pageRange.end; i++) {
      items.push(<button
        enzyme={`pagination_${i}`}
        key={`page-${i}`}
        className={cx(styles.item, { [styles.active]: i === active })}
        onClick={() => this.handleSelect(i)}
      >
        {i}
      </button>);
    }

    const firstitem = (active > 2)
      ? (<button
        className={styles.item}
        onClick={() => this.handleSelect(1)}
      >1</button>)
      : null;

    const prev = (active > 2)
      ? (<button
        onClick={() => this.handleSelect(active - 1)}
        className={cx('fa', 'fa-angle-left', styles.prev)}
      />)
      : null;

    const prevEllipsis = (active > 2)
      ? <span className={styles.ellipsis}>&hellip;</span>
      : null;

    const next = (active < totalPages - 1)
      ? (<button
        onClick={() => this.handleSelect(active + 1)}
        className={cx('fa', 'fa-angle-right', styles.prev)}
      />)
      : null;

    const nextEllipsis = (active < totalPages - 1)
      ? <span className={styles.ellipsis}>&hellip;</span>
      : null;

    const lastitem = (active < totalPages - 1)
      ? (<button
        className={styles.item}
        onClick={() => this.handleSelect(totalPages)}
      >
        {totalPages}
      </button>)
      : null;

    // TEST:
    // empty case
    // end ellipsis
    // start ellipsis
    // URL hack pages

    return (
      <div className={styles.paginator}>
        <div className={styles.meta}>{`${msg} of ${totalRecords || 0}`}</div>
        {prev}
        {firstitem}
        {prevEllipsis}
        {items}
        {nextEllipsis}
        {lastitem}
        {next}
      </div>
    );
  }
}
