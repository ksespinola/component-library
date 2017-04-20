/* eslint-disable react/no-string-refs */
import React, { PropTypes } from 'react';
import Range from 'react-range';
import qs from 'qs';

import RipangaHeadRow from './RipangaHeadRow';
import RipangaBodyRows from './RipangaBodyRows';
import RipangaStickyCells from './RipangaStickyCells';
import RipangaInterface from './RipangaInterface';
import S from './Ripanga.scss';

const i18n = {
  NO_RESULTS: 'No results found',
};

@RipangaInterface
export default class Ripanga extends React.Component {
  static propTypes = {
    actions: PropTypes.shape(),
    globalKey: PropTypes.bool,
    panelPosition: PropTypes.oneOf(['left', 'right', 'none']),
    sliderValue: PropTypes.number,
    sorting: PropTypes.shape({ direction: PropTypes.func, change: PropTypes.func }),
    tableData: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    idKey: 'id',
    panelPosition: 'right',
    showCheckboxes: false,
    sorting: {
      change: ({ sortable, sortKey }) => {
        const url = window.location.href.split('?');
        const params = qs.parse(url[1]);

        if (sortable === false) {
          return;
        }

        const attribute = sortKey;
        const direction = (params.sort.attribute === attribute
          && params.sort.direction === DIRECTION.ASC
          ? DIRECTION.DESC
          : DIRECTION.ASC);

        params.sort = { attribute, direction };
        params.page = 1;

        sessionStorage.setItem(`${globalKey}/SORT`, JSON.stringify(params.sort));

        history.pushState(
          history.state,
          '',
          `${url[0]}?${qs.stringify(params, { arrayFormat: 'brackets' })}`,
        );
      },
      direction: ({ sortable, sortKey }) => {
        const url = window.location.href.split('?');
        const params = qs.parse(url[1]);

        return sortable && params.sort.attribute === sortKey && params.sort.direction;
      }
    }
  }

  constructor(props) {
    super(props);

    this.scrollListener = null;
    this.resizeListener = null;

    window.addEventListener('scroll', this.scrollWindow);
    window.addEventListener('resize', this.resize);
  }

  componentDidMount() {
    const {
      actions: {
        setChecked,
      },
      globalKey,
    } = this.props;

    const storedRecords = localStorage.getItem(`${globalKey}/CHECKED`);
    const obj = (storedRecords ? JSON.parse(storedRecords) : {});
    const ids = [];

    // eslint-disable-next-line
    for (let i in obj) {
      ids.push(parseInt(i, 10));
    }

    setChecked({ ids, globalKey });
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.tableData)
    !== JSON.stringify(nextProps.tableData)) {
      this.props.actions.clearCollapsedGroups();
    }
  }

  componentDidUpdate() {
    if (this.props.tableData.length === 0) {
      return;
    }

    this.refs.bodyContainer
      .removeEventListener('scroll', this.scrollListener);
    this.scrollListener =
      this.refs.bodyContainer.addEventListener('scroll', this.scrollBody);

    this.resize();
  }

  setHeadPosition = (value) => {
    this.refs.stickyHead.style.position = value;
    this.refs.headContainer.style.position = value;
  };

  applyStaticBounds = (side) => {
    this.setHeadPosition('absolute');
    this.placePanelStatic(side);
  };

  applyStickyBounds = (side) => {
    this.setHeadPosition('fixed');
    this.placePanelSticky(side);
  };

  hideSticky = () => {
    this.refs.stickyHead.style.display = 'none';
    this.refs.stickyContainer.style.display = 'none';
  }

  placePanelStatic = (side) => {
    const {
      headContainer,
      stickyContainer,
      stickyHead,
      ripangaContainer,
    } = this.refs;

    const ripangaBounds = ripangaContainer.getBoundingClientRect();
    const stickyBounds = stickyContainer.getBoundingClientRect();

    switch (side) {
      case 'right':
        stickyHead.style.left = `${ripangaBounds.width - stickyBounds.width}px`;
        stickyContainer.style.right = 0;
        headContainer.style.left = 0;
        break;
      case 'left':
        stickyHead.style.left = 0;
        stickyContainer.style.left = 0;
        headContainer.style.left = `${stickyBounds.width}px`;
        break;
      case 'none':
        this.hideSticky();
        this.refs.headContainer.style.left = 0;
        break;
      default:
        console.error(`placePanelStatic does not accept side: ${side}`);
    }
  };

  placePanelSticky = (side) => {
    const {
      headContainer,
      stickyContainer,
      stickyHead,
      ripangaContainer,
    } = this.refs;

    const ripangaBounds = ripangaContainer.getBoundingClientRect();
    const stickyBounds = stickyContainer.getBoundingClientRect();

    switch (side) {
      case 'right':
        stickyHead.style.left = `${ripangaBounds.right - stickyBounds.width}px`;
        headContainer.style.left = `${ripangaBounds.left}px`;
        stickyContainer.style.right = 0;
        break;
      case 'left':
        stickyHead.style.left = `${ripangaBounds.left}px`;
        headContainer.style.left =
          `${ripangaBounds.left + stickyBounds.width}px`;
        stickyContainer.style.left = 0;
        break;
      case 'none':
        this.hideSticky();
        headContainer.style.left = `${ripangaBounds.left}px`;
        break;
      default:
        console.error(`placePanelSticky does not accept side: ${side}`);
    }
  };

  // TODO: Throttle window resize and scroll
  recalculateSticky = () => {
    if (this.stickyHeaderActive()) {
      this.applyStickyBounds(this.props.panelPosition);
    } else {
      this.applyStaticBounds(this.props.panelPosition);
    }
  }

  resize = () => {
    this.resizeRipanga();
    this.resizeHead();
    this.resizeSticky();
  }

  resizeHead = () => {
    const {
      bodyContainer,
      bodyTable,
      headContainer,
      headTable,
    } = this.refs;

    if (bodyTable.rows.length > 0) {
      const headcells = headTable.rows[0].cells;

      const renderedRow = Array.from(bodyTable.rows).find((row) => {
        return row.cells.length === headcells.length;
      });

      if (renderedRow !== undefined) {
        ([...renderedRow.cells]).forEach((cell, index) => {
          headTable.rows[0].cells[index].style.width =
            `${cell.getBoundingClientRect().width}px`;
        });
      }
    }

    headContainer.style.width =
      `${bodyContainer.getBoundingClientRect().width}px`;

    this.recalculateSticky();
  }

  resizeRipanga = () => {
    const {
      headContainer,
      stickyContainer,
      ripangaContainer,
    } = this.refs;
    const { panelPosition } = this.props;

    const headBounds = headContainer.getBoundingClientRect();
    const stickyBounds = stickyContainer.getBoundingClientRect();

    const setTableContainerPadding = (side) => {
      ripangaContainer.style.paddingTop = `${headBounds.height}px`;
      switch (side) {
        case 'right':
          ripangaContainer.style.paddingRight = `${stickyBounds.width}px`;
          break;
        case 'left':
          ripangaContainer.style.paddingLeft = `${stickyBounds.width}px`;
          break;
        case 'none':
          ripangaContainer.style.paddingLeft = 0;
          break;
        default:
          console.error(
            `setTableContainerPadding does not accept side: ${side}`);
      }
    };

    setTableContainerPadding(panelPosition);
  }

  resizeSticky = () => {
    const {
      bodyContainer,
      bodyTable,
      headContainer,
      slider,
      stickyContainer,
      stickyHead,
    } = this.refs;
    const { panelPosition } = this.props;
    const headBounds = headContainer.getBoundingClientRect();

    if (bodyContainer.clientWidth >= bodyContainer.scrollWidth) {
      slider.range.style.display = 'none';
    } else {
      slider.range.style.display = 'inline';
    }

    if (panelPosition !== 'none') {
      stickyHead.style.height = `${headBounds.height}px`;
      stickyHead.style.width =
        `${stickyContainer.getBoundingClientRect().width}px`;
    }

    this.recalculateSticky();

    stickyContainer.style.paddingTop = `${headBounds.height}px`;

    const stickyCells = stickyContainer.childNodes;

    Array.from(stickyCells).forEach((node, index) => {
      node.style.height =
        `${bodyTable.rows[index].getBoundingClientRect().height}px`;
    });
  }

  _scrollSlider = (e) => {
    const {
      bodyContainer,
    } = this.refs;

    const v = e.target.value;
    const scrollWidth = bodyContainer.scrollWidth - bodyContainer.offsetWidth;
    const delta = e.target.getAttribute('max') - e.target.getAttribute('min');

    this.props.actions.scrollSlider(parseInt(v, 0));

    bodyContainer.scrollLeft = (scrollWidth * v) / delta;
  }

  scrollBody = () => {
    const {
      bodyContainer,
      headContainer,
      slider,
      stickyContainer,
    } = this.refs;

    headContainer.scrollLeft = bodyContainer.scrollLeft;
    stickyContainer.scrollTop = bodyContainer.scrollTop;

    const delta = slider.props.max - slider.props.min;
    const scrollWidth = bodyContainer.scrollWidth - bodyContainer.offsetWidth;
    const v = (bodyContainer.scrollLeft * delta) / scrollWidth;

    this.props.actions.scrollSlider(v);
  }

  scrollWindow = () => {
    if (this.refs.ripangaContainer === undefined) {
      return;
    }

    this.recalculateSticky();
  }

  stickyHeaderActive = () => {
    const ripangaBounds = this.refs.ripangaContainer.getBoundingClientRect();
    return ripangaBounds.top < 0;
  }

  render() {
    const {
      sliderValue = 0,
      tableData,
    } = this.props;

    if (tableData.length === 0) {
      if (this.props.renderEmpty) {
          return this.props.renderEmpty();
      }

      return (
        <h3 className="no-borders padding-top empty_table empty_graphic">
          <img
            role="presentation"
            src="/assets/no_results_illustration.svg"
            className="text-align-center empty_table_graphic"
          />
          <span className="empty_table_label">{i18n.NO_RESULTS}</span>
        </h3>
      );
    }

    const stickyCells = RipangaStickyCells({...this.props});

    return (
      <div className={S.container} ref="ripangaContainer">
        <div className={S.headContainer} ref="headContainer">
          <table className={S.head} ref="headTable">
            <RipangaHeadRow {...this.props} />
          </table>
        </div>

        <div className={S.bodyContainer} ref="bodyContainer">
          <table className={S.body} ref="bodyTable">
            <RipangaBodyRows {...this.props} />
          </table>
        </div>

        <div className={S.stickyContainer} ref="stickyContainer">
          {stickyCells}
        </div>

        <div className={S.stickyCellHead} ref="stickyHead">
          <Range
            className={S.horizontalScroller}
            max="50"
            min="0"
            onChange={this._scrollSlider}
            onClick={this.props.actions.trackSlider}
            ref="slider"
            type="range"
            value={sliderValue}
          />
        </div>
      </div>
    );
  }
}
