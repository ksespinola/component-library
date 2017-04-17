import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './Header.scss';

const i18n = {
  logo: 'Logo'
};

const Header = ({ headerImg, onBack, returnLink }) =>
  <header id='header-template' className={cx(styles.headerWrapper)}>
    <a className={cx(styles.headerButton, styles.backButton)} onClick={onBack}>
      <i className={cx('fa', 'fa-angle-left', styles.backIcon)} />
    </a>

    <div className={styles.navigation}>
      <a
        className={cx(styles.headerButton, styles.photoContainer)}
        href={returnLink}
        onClick={onBack}
      >
        {/* <img alt={i18n.logo} src={headerImg} /> */}
      </a>
      <div className={styles.divider} />
      <div className={styles.selectionContainer} />
      <div className={styles.divider} />
      <div className={styles.selectionContainer} />
      <div className={styles.divider} />
      <div className={styles.selectionContainer} />
    </div>

    <div className={styles.justifyRight}>
      <div className={styles.iconContainer}>
        <button className={styles.headerButton}>
          <i className={cx(styles.icon, 'fa', 'fa-plug')} />
        </button>
        <button className={styles.headerButton}>
          <i className={cx(styles.icon, 'fa', 'fa-question-circle')} />
        </button>
        <button className={styles.headerButton}>
          <i className={cx(styles.icon, 'fa', 'fa-bullhorn')} />
        </button>
        <button className={styles.headerButton}>
          <i className={cx(styles.icon, 'fa', 'fa-circle')} />
        </button>
      </div>
    </div>
  </header>;


Header.propTypes = {
  onBack: PropTypes.func,
  headerImg: PropTypes.string,
  returnLink: PropTypes.string.isRequired
};

Header.defaultProps = {
  onBack: () => console.info('You have not set an onBack function for Header!'), // eslint-disable-line
  returnLink: '#',
  headerImg: ''
};

export default Header;
