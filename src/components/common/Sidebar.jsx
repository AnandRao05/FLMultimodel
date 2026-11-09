import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  LayoutDashboard, 
  Database, 
  Layers, 
  Cpu, 
  Send, 
  RefreshCw, 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Activity, 
  BarChart3, 
  Radio, 
  History,
  Lock,
  ArrowLeft
} from 'lucide-react';

export const Sidebar = () => {
  const { activeView, activeTab, setActiveTab, navigateTo, hospitals, globalModel } = useFederatedLearning();

  if (activeView === 'landing') return null;

  const isHospital = activeView.startsWith('hosp');
  const currentHospital = isHospital ? hospitals[activeView] : null;

  const hospitalNavItems = [
    { id: 'overview', label: 'Hospital Overview', icon: LayoutDashboard },
    { id: 'dataset', label: 'Patient Dataset', icon: Database, badge: currentHospital?.totalRecords ? `${currentHospital.totalRecords} pts` : null },
    { id: 'multimodal', label: 'Multimodal Data', icon: Layers, badge: '3 Modalities' },
    { id: 'training', label: 'Local Model Training', icon: Cpu, badge: currentHospital?.trainingStatus === 'Training' ? 'Training...' : `${currentHospital?.currentAccuracy}%` },
    { id: 'updates', label: 'Model Update Transmission', icon: Send, badge: currentHospital?.updateSentToGlobal ? 'Sent' : null },
    { id: 'sync', label: 'Global Synchronization', icon: RefreshCw, badge: currentHospital?.syncStatus === 'Update Available' ? 'New!' : null },
    { id: 'reports', label: 'Hospital Reports & Audit', icon: FileText }
  ];

  const globalNavItems = [
    { id: 'overview', label: 'Global Overview', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Hospital Monitoring (3/3)', icon: Activity },
    { id: 'reception', label: 'Model Update Reception', icon: Radio, badge: 'Incoming' },
    { id: 'aggregation', label: 'Federated Aggregation (FedAvg)', icon: Cpu, highlight: true },
    { id: 'performance', label: 'Global Performance', icon: BarChart3, badge: `${globalModel.globalAccuracy}%` },
    { id: 'distribution', label: 'Model Distribution', icon: Send },
    { id: 'history', label: 'FL Round History', icon: History, badge: `Round ${globalModel.currentRound}` },
    { id: 'security', label: 'Security & Privacy Audit', icon: ShieldCheck }
  ];

  const navItems = isHospital ? hospitalNavItems : globalNavItems;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between py-4 shadow-xs shrink-0">
      <div className="px-3">
        {/* Back to Hub button */}
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-medical-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors mb-3 w-full"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portal Overview</span>
        </button>

        {/* Node Identity Card */}
        <div className={`p-3 rounded-xl mb-4 border ${
          isHospital 
            ? 'bg-gradient-to-br from-medical-50/70 to-teal-50/60 border-medical-200/80' 
            : 'bg-gradient-to-br from-slate-900 to-medical-950 text-white border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              isHospital ? 'bg-medical-200/80 text-medical-800' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
            }`}>
              {isHospital ? currentHospital?.code : 'CENTRAL AGGREGATOR'}
            </span>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className={`text-[10px] ${isHospital ? 'text-slate-500' : 'text-slate-300'}`}>Online</span>
            </div>
          </div>
          <h2 className={`text-sm font-bold mt-1.5 truncate ${isHospital ? 'text-slate-800' : 'text-white'}`}>
            {isHospital ? currentHospital?.name : 'Global FedAvg Server'}
          </h2>
          <p className={`text-[11px] truncate mt-0.5 ${isHospital ? 'text-slate-500' : 'text-slate-400'}`}>
            {isHospital ? currentHospital?.specialty : 'Decentralized Multimodal Aggregation'}
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-medical-600 text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:bg-medical-50/70 hover:text-medical-800'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Privacy & Compliance Footnote */}
      <div className="px-4 pt-3 border-t border-slate-100">
        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
          <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>Privacy Guaranteed: Zero Raw Data Transferred</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono">
          Enclave: {isHospital ? currentHospital?.enclaveId : 'FED-SRV-CORE-00'}
        </div>
      </div>
    </aside>
  );
};
