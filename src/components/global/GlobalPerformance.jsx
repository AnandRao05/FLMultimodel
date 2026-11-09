import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  BarChart3, 
  Award, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  PieChart as PieIcon,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export const GlobalPerformance = () => {
  const { globalModel, hospitals } = useFederatedLearning();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            <span>Global Model Performance Analytics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Holistic validation benchmarks for the aggregated Global Multimodal FedAvg model.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Independent Holdout Benchmark (N = 1,440)</span>
        </div>
      </div>

      {/* 5 Core Performance Metrics (Requirement 4.E) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Global Accuracy</span>
          <div className="text-2xl font-bold text-teal-700 mt-1">{globalModel.globalAccuracy}%</div>
          <span className="text-[11px] text-emerald-600 font-medium">+2.1% FedAvg Boost</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Cross-Entropy Loss</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{globalModel.globalLoss}</div>
          <span className="text-[11px] text-slate-500">Joint Multimodal Loss</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Precision</span>
          <div className="text-2xl font-bold text-medical-700 mt-1">{globalModel.precision}</div>
          <span className="text-[11px] text-slate-500">Macro Weighted</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Recall</span>
          <div className="text-2xl font-bold text-indigo-700 mt-1">{globalModel.recall}</div>
          <span className="text-[11px] text-slate-500">High sensitivity</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-xs text-slate-500 font-medium">F1-Score</span>
          <div className="text-2xl font-bold text-teal-700 mt-1">{globalModel.f1Score}</div>
          <span className="text-[11px] text-slate-500">Harmonic balance</span>
        </div>

      </div>

      {/* Charts Grid: Convergence & Modality Ablation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Global Round-by-Round Convergence */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Convergence Progression Across Rounds</h3>
            <p className="text-xs text-slate-500">Accuracy evolution across federated aggregation rounds</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={globalModel.accuracyConvergence} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="round" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val) => [`${val}%`, '']}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="global" stroke="#0d9488" strokeWidth={3} dot={{ r: 5 }} name="Global FedAvg" />
                <Line type="monotone" dataKey="hosp1" stroke="#0284c7" strokeWidth={1.8} strokeDasharray="3 3" name="HOSP-01" />
                <Line type="monotone" dataKey="hosp2" stroke="#64748b" strokeWidth={1.8} strokeDasharray="3 3" name="HOSP-02" />
                <Line type="monotone" dataKey="hosp3" stroke="#6366f1" strokeWidth={1.8} strokeDasharray="3 3" name="HOSP-03" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Multimodal Modality Ablation Study */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Multimodal Synergy & Ablation Study</h3>
            <p className="text-xs text-slate-500">Accuracy gain of full multimodal cross-attention vs unimodal backbones</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={globalModel.modalityAblation} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[60, 90]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => [`${val}%`, 'Accuracy']} />
                <Bar dataKey="accuracy" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
