import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Globe2, 
  Building2, 
  Radio, 
  Cpu, 
  Award, 
  History, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Play, 
  ArrowRight,
  Send,
  Zap,
  TrendingUp,
  Server
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const GlobalOverview = () => {
  const { 
    globalModel, 
    hospitals, 
    setActiveTab, 
    startGlobalAggregation, 
    distributeGlobalModel,
    pendingUpdatesCount,
    aggregationState 
  } = useFederatedLearning();

  const totalPatients = hospitals.hosp1.totalRecords + hospitals.hosp2.totalRecords + hospitals.hosp3.totalRecords;

  return (
    <div className="space-y-6">
      
      {/* Global Server Identity Card */}
      <div className="bg-gradient-to-br from-slate-900 via-medical-950 to-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            <Globe2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 font-mono">
                CENTRAL AGGREGATOR
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>FedAvg Engine Online</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">Global Model Aggregation Server</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Coordinating Multimodal Federated Learning across 3 Healthcare Institutions
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 text-teal-300 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Zero Patient Data Transferred to Server</span>
        </div>
      </div>

      {/* 8 Core Overview Metrics (Requirement 4.A) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Connected Hospitals */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Connected Hospitals</span>
            <Building2 className="w-4 h-4 text-medical-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{globalModel.totalHospitals}</span>
            <span className="text-xs text-slate-500">institutions</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-medium flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            <span>{globalModel.onlineHospitals} of {globalModel.totalHospitals} nodes active</span>
          </div>
        </div>

        {/* Metric 2: Global Model Accuracy */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Global Model Accuracy</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-teal-700">{globalModel.globalAccuracy}%</span>
            <span className="text-xs text-slate-500">Loss: {globalModel.globalLoss}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            F1: <span className="font-semibold text-slate-700">{globalModel.f1Score}</span> | AUC: <span className="font-semibold text-slate-700">{globalModel.aucRoc}</span>
          </div>
        </div>

        {/* Metric 3: Current Global Model Version */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Global Model Version</span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2">
            <span className="text-lg font-bold font-mono text-slate-900 block">{globalModel.version}</span>
            <span className="text-xs text-slate-500">FedAvg Architecture</span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-700 font-medium">
            Trained on {totalPatients.toLocaleString()} multimodal records
          </div>
        </div>

        {/* Metric 4: Model Updates Received */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Updates Received (Current)</span>
            <Radio className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-amber-600">{pendingUpdatesCount} / 3</span>
            <span className="text-xs text-slate-500">hospitals ready</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            {pendingUpdatesCount === 3 ? 'Ready for FedAvg Aggregation' : 'Awaiting remaining client updates'}
          </div>
        </div>

        {/* Metric 5: Total Federated Rounds */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Federated Rounds</span>
            <History className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{globalModel.currentRound}</span>
            <span className="text-xs text-slate-500">completed</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Aggregation Algorithm: FedAvg
          </div>
        </div>

        {/* Metric 6: Last Aggregation Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Last Aggregation</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2">
            <span className="text-base font-bold text-slate-800">{globalModel.lastAggregationTime}</span>
          </div>
          <div className="mt-2 text-[11px] text-teal-700 font-medium">
            Validated against global holdout set
          </div>
        </div>

        {/* Metric 7: Global Model Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Global Server Status</span>
            <Server className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-xs font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-50 inline-block">
              {globalModel.status}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Ready to distribute or aggregate
          </div>
        </div>

        {/* Metric 8: Data Privacy Audit */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Raw Data Leakage</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-emerald-600">0 Bytes</span>
            <span className="text-xs text-slate-500">Zero tolerance</span>
          </div>
          <div className="mt-2 text-[11px] text-teal-700 font-medium">
            TLS 1.3 + Differential Privacy verified
          </div>
        </div>

      </div>

      {/* Central Control Action Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-medical-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-teal-300 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-teal-400" />
            <span>FedAvg Orchestration Controls</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Aggregate updates from all 3 hospitals using sample-weighted Federated Averaging, then broadcast the resulting global model.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('aggregation');
              startGlobalAggregation();
            }}
            disabled={aggregationState.isAggregating}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
              aggregationState.isAggregating
                ? 'bg-amber-500 text-white cursor-wait animate-pulse'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 active:scale-95'
            }`}
          >
            {aggregationState.isAggregating ? 'Aggregating (FedAvg)...' : 'Start Global Aggregation'}
          </button>

          <button
            onClick={() => {
              setActiveTab('distribution');
              distributeGlobalModel();
            }}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all shadow-sm"
          >
            Distribute to All 3 Hospitals
          </button>
        </div>
      </div>

      {/* Global Accuracy Convergence Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Federated Model Convergence Across Rounds</h3>
            <p className="text-xs text-slate-500">Comparison of Global FedAvg model accuracy vs individual local client models</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center space-x-1.5 font-semibold text-teal-700">
              <span className="w-3 h-1 bg-teal-600 inline-block rounded"></span>
              <span>Global FedAvg</span>
            </span>
            <span className="flex items-center space-x-1.5 text-medical-700">
              <span className="w-3 h-0.5 bg-medical-500 inline-block"></span>
              <span>Hospital 1</span>
            </span>
            <span className="flex items-center space-x-1.5 text-slate-600">
              <span className="w-3 h-0.5 bg-slate-400 inline-block"></span>
              <span>Hospital 2</span>
            </span>
            <span className="flex items-center space-x-1.5 text-indigo-700">
              <span className="w-3 h-0.5 bg-indigo-500 inline-block"></span>
              <span>Hospital 3</span>
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={globalModel.accuracyConvergence} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="round" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val) => [`${val}%`, '']}
              />
              <Line type="monotone" dataKey="global" stroke="#0d9488" strokeWidth={3} dot={{ r: 5 }} name="Global FedAvg" />
              <Line type="monotone" dataKey="hosp1" stroke="#0284c7" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} name="Hospital 1" />
              <Line type="monotone" dataKey="hosp2" stroke="#64748b" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} name="Hospital 2" />
              <Line type="monotone" dataKey="hosp3" stroke="#6366f1" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} name="Hospital 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
