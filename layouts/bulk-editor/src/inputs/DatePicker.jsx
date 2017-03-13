import React, { Component, PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';

import momentLocalizer from 'react-widgets/lib/localizers/moment';

import defaultStyles from './DatePicker.scss';

import composeStyles from '../../../../shared/stylesheetComposer';

let styles = {};

momentLocalizer(Moment);

export default class DatePicker extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    placeholder: PropTypes.string,
    stylesheets: PropTypes.arrayOf(PropTypes.shape())
  }

  static defaultProps = {
    onChange: () => {},
    onRemove: () => {},
    placeholder: 'mm/dd/yy',
    stylesheets: []
  }

  constructor(props) {
    super(props);

    styles = composeStyles(defaultStyles, props.stylesheets);
    this.state = { value: null };
  }

  onChange = (value, prettyValue) => {
    this.props.onChange({ value, prettyValue });
    this.setState({ value });
  }

  onRemove = () => {
    this.props.onRemove();
    this.setState({ value: null });
  }

  removeButton = value => (
    value
    ? <button type='button' className={`fa fa-times ${styles.removeButton}`} onClick={this.onRemove} />
    : null
  )

  render() {
    return (
      <div className={styles.rwOverrides}>
        <DateTimePicker
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          time={false}
          value={this.state.value}
        />
        {this.removeButton(this.state.value)}
      </div>
    );
  }
}
