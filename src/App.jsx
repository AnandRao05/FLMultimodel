import React from 'react';
import { FederatedLearningProvider, useFederatedLearning } from './context/FederatedLearningContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { HospitalDashboard } from './components/hospital/HospitalDashboard';
import { GlobalDashboard } from './components/global/GlobalDashboard';
import { ShieldCheck, Activity, Heart, Lock } from 'lucide-react';

const MainContent = () => {
  const { activeView } = useFederatedLearning();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1 flex">
        {activeView !== 'landing' && <Sidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          {activeView === 'landing' && <LandingPage />}
          {activeView === 'hosp1' && <HospitalDashboard hospId="hosp1" />}
          {activeView === 'hosp2' && <HospitalDashboard hospId="hosp2" />}
          {activeView === 'hosp3' && <HospitalDashboard hospId="hosp3" />}
          {activeView === 'global' && <GlobalDashboard />}
        </div>
      </main>

      {/* Professional Healthcare Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-medical-600 text-white flex items-center justify-center font-bold text-xs">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-700">Multimodal Federated Learning (MFL) Healthcare Framework</span>
            <span className="text-slate-400">• v1.0.0</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center text-teal-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              HIPAA Safe Harbor & GDPR Enforced
            </span>
            <span className="text-slate-300">|</span>
            <span>Zero Raw Patient Data Shared</span>
            <span className="text-slate-300">|</span>
            <span>FedAvg Parameter Aggregation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <FederatedLearningProvider>
      <MainContent />
    </FederatedLearningProvider>
  );
}
