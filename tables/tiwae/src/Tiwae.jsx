import React, { PropTypes } from 'react';
import baseStyles from './Tiwae.scss';
import defaultStyles from './TiwaeDefault.scss';
import composeStyles from '../../../shared/stylesheetComposer';

let styles = {};

export default class Tiwae extends React.Component {
  static propTypes = {
    lockLimit: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stylesheets: PropTypes.arrayOf(PropTypes.shape())
  };

  static defaultProps = {
    lockLimit: 3,
    stylesheets: []
  }

  constructor(props) {
    super(props);

    styles = composeStyles(baseStyles, [defaultStyles, ...props.stylesheets]);

    const options = props.options.map(option => Object.assign(option, {
      hidden: option.hidden || option.hidden,
      locked: option.locked || option.locked
    }));

    this.state = {
      expanded: false,
      ghostIndex: -1,
      options,
      startIndex: -1
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.onBlur);
  }

  onDragStart = (evt) => {
    if (evt.dataTransfer) {
      evt.dataTransfer.setData('text', 'placeholder-data'); // eslint-disable-line
    }
    this.setState({ startIndex: evt.currentTarget.dataset.index });
  }

  onDragOverBody = (evt) => {
    evt.preventDefault();
  }

  onDragOverElement = (evt) => {
    evt.preventDefault();

    const lastLocked = this.state.options.reduce((acc, option, i) => (option.locked ? i : acc), -1);
    const index = parseInt(evt.currentTarget.dataset.index, 10);

    if (index > lastLocked) {
      this.setState({ ghostIndex: evt.currentTarget.dataset.index });
    }
  }

  onDrop = (evt) => {
    evt.preventDefault();

    const { options, ghostIndex, startIndex } = this.state;

    const lastLocked = options.reduce((acc, option, i) => (option.locked ? i : acc), -1);

    if (ghostIndex > lastLocked) {
      const originalElement = options.splice(startIndex, 1);
      options.splice(ghostIndex, 0, originalElement[0]);
    }

    this.setState({ ghostIndex: -1, startIndex: -1, options });
    this.props.onChange(this.state.options);
  }

  onCheck = (evt) => {
    evt.stopPropagation();

    const index = evt.currentTarget.dataset.index;
    const { options } = this.state;
    options[index].hidden = !options[index].hidden;

    this.setState({ options, ghostIndex: -1, startIndex: -1 });
    this.props.onChange(this.state.options);
  }

  onLock = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const index = evt.currentTarget.dataset.index * 1;

    const options = this.state.options
      .map((option, i) => {
        if (i === index) {
          return Object.assign(option, { locked: !option.locked });
        }

        if (i < index) {
          return Object.assign(option, { locked: true });
        }

        return Object.assign(option, { locked: false });
      });

    this.setState({ options });
    this.props.onChange(this.state.options);
  }

  onReset = (evt) => {
    evt.stopPropagation();

    const options = this.props.options.map(option => Object.assign(option, {
      hidden: false,
      locked: false
    }));

    this.setState({ ghostIndex: -1, options, startIndex: -1 });
    this.props.onChange(this.state.options);
  }

  onItemClick = (evt) => {
    evt.stopPropagation();
  }

  onBlur = () => {
    this.setState({ expanded: false, ghostIndex: -1, startIndex: -1 });
  }

  onExpand = (evt) => {
    evt.stopPropagation();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      ghostIndex,
      options,
      startIndex
    } = this.state;

    const items = options.map((option, index) => {
      if (option.configurable === false) {
        return null;
      }

      const lock = (index < this.props.lockLimit && (index === 0 || options[index - 1].locked))
        ? (<div
          className={`fa
            ${option.locked ? 'fa-lock' : 'fa-unlock'}
            ${option.locked ? styles.isLocked : ''}
            ${styles.itemLock}`}
          data-index={index}
          onClick={this.onLock}
        />)
        : (<div className={styles.itemLockPlaceholder} />);

      return (<label
        className={`${styles.item} ${option.locked ? styles.locked : ''} ${(startIndex * 1) === index ? styles.grab : ''}`}
        data-index={index}
        draggable={!option.locked}
        key={`item-${option.key}`}
        onClick={this.onItemClick}
        onDragOver={this.onDragOverElement}
        onDragStart={this.onDragStart}
      >
        <input
          checked={!option.hidden}
          className={styles.itemCheckbox}
          data-index={index}
          onChange={this.onCheck}
          type='checkbox'
        />
        <div className={styles.itemLabel}>{option.label}</div>
        {lock}
      </label>);
    });

    if (this.state.ghostIndex > -1) {
      const index = (ghostIndex > startIndex) ? (parseInt(ghostIndex, 10) + 1) : ghostIndex;
      items.splice(index, 0, <div key='ghost' className={styles.ghost} />);
    }

    return (
      <div className={styles.container}>
        <div className={`${styles.button} fa fa-ellipsis-v`} onClick={this.onExpand} />
        <div className={`${styles.dropdownContainer} ${this.state.expanded ? styles.expanded : ''}`}>
          <div className={styles.dropdownHead}>
            <div className={styles.title}>Show, Hide, or Reorder Columns</div>
            <div onClick={this.onReset} className={styles.reset}>Reset to Default</div>
          </div>
          <div
            className={styles.dropdownBody}
            onDragOver={this.onDragOverBody}
            onDrop={this.onDrop}
          >
            {items}
          </div>
        </div>
      </div>
    );
  }
}
