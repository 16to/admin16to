import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import styles from './index.less';

const GlobalFooter = props => {
  const { settings } = props;
  return (
    <div className={styles.copyright}>
      Copyright <Icon type="copyright" /> {new Date().getFullYear()} {settings.copyright}
    </div>
  );
}

export default connect(({ settings }) => ({ settings }))(GlobalFooter);
