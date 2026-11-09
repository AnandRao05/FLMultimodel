import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { HospitalOverview } from './HospitalOverview';
import { DatasetManagement } from './DatasetManagement';
import { MultimodalDataManagement } from './MultimodalDataManagement';
import { LocalTraining } from './LocalTraining';
import { ModelUpdateManagement } from './ModelUpdateManagement';
import { GlobalSync } from './GlobalSync';
import { HospitalReports } from './HospitalReports';

export const HospitalDashboard = ({ hospId }) => {
  const { activeTab } = useFederatedLearning();

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {activeTab === 'overview' && <HospitalOverview hospId={hospId} />}
      {activeTab === 'dataset' && <DatasetManagement hospId={hospId} />}
      {activeTab === 'multimodal' && <MultimodalDataManagement hospId={hospId} />}
      {activeTab === 'training' && <LocalTraining hospId={hospId} />}
      {activeTab === 'updates' && <ModelUpdateManagement hospId={hospId} />}
      {activeTab === 'sync' && <GlobalSync hospId={hospId} />}
      {activeTab === 'reports' && <HospitalReports hospId={hospId} />}
    </div>
  );
};
