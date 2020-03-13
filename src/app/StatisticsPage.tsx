import React from 'react';
import i18n from '../localization/i18n';

const StatisticsPage: React.FC = () => {
  return (
    <h1>{i18n.t('Statistics')}</h1>
  );
};

export default StatisticsPage;