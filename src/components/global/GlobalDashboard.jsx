import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { GlobalOverview } from './GlobalOverview';
import { HospitalMonitoring } from './HospitalMonitoring';
import { ModelUpdateReception } from './ModelUpdateReception';
import { FederatedAggregation } from './FederatedAggregation';
import { GlobalPerformance } from './GlobalPerformance';
import { GlobalDistribution } from './GlobalDistribution';
import { FederatedLearningHistory } from './FederatedLearningHistory';
import { SecurityPrivacy } from './SecurityPrivacy';

export const GlobalDashboard = () => {
  const { activeTab } = useFederatedLearning();

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {activeTab === 'overview' && <GlobalOverview />}
      {activeTab === 'monitoring' && <HospitalMonitoring />}
      {activeTab === 'reception' && <ModelUpdateReception />}
      {activeTab === 'aggregation' && <FederatedAggregation />}
      {activeTab === 'performance' && <GlobalPerformance />}
      {activeTab === 'distribution' && <GlobalDistribution />}
      {activeTab === 'history' && <FederatedLearningHistory />}
      {activeTab === 'security' && <SecurityPrivacy />}
    </div>
  );
};
