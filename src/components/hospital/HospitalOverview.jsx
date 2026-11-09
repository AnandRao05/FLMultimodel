import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Building2, 
  Activity, 
  Database, 
  Cpu, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Award,
  Layers,
  ArrowRight,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const HospitalOverview = ({ hospId }) => {
  const { hospitals, globalModel, setActiveTab, startLocalTraining, sendModelUpdate, applyGlobalModel } = useFederatedLearning();
  const hosp = hospitals[hospId];

  if (!hosp) return null;

  return (
    <div className="space-y-6">
      
      {/* Hospital Identity Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-medical-600 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-medical-100 text-medical-800 font-mono">
                {hosp.code}
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{hosp.connectionStatus}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Enclave: {hosp.enclaveId}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">{hosp.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500">{hosp.specialty} • {hosp.location}</p>
          </div>
        </div>

        {/* Quick Privacy Pill */}
        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Local Patient Data Enclave Protected</span>
        </div>
      </div>

      {/* Overview Statistics Grid (9 Key Metrics Required) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Metric 1: Total Patient Records */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-medical-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Available Patient Records</span>
            <Database className="w-4 h-4 text-medical-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{hosp.totalRecords}</span>
            <span className="text-xs text-slate-500">Multimodal profiles</span>
          </div>
          <div className="mt-2 text-[11px] text-teal-700 font-medium flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1 text-teal-600" />
            <span>Images + Clinical + Notes available</span>
          </div>
        </div>

        {/* Metric 2: Current Local Model Accuracy */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-medical-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Local Model Accuracy</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-medical-700">{hosp.currentAccuracy}%</span>
            <span className="text-xs text-slate-500">Loss: {hosp.currentLoss}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            F1-Score: <span className="font-semibold text-slate-700">{hosp.f1Score}</span> | AUC: <span className="font-semibold text-slate-700">{hosp.aucRoc}</span>
          </div>
        </div>

        {/* Metric 3: Local Model Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-medical-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Local Model Status</span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm font-bold text-slate-900 block truncate">{hosp.localModelStatus}</span>
            <span className="text-xs font-mono text-slate-500">{hosp.modelVersion}</span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-700 font-medium">
            Version synced with {hosp.globalModelVersion}
          </div>
        </div>

        {/* Metric 4: Training Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-medical-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Training Status</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              hosp.trainingStatus === 'Training' 
                ? 'bg-amber-100 text-amber-800 animate-pulse'
                : hosp.trainingStatus === 'Trained'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {hosp.trainingStatus}
            </span>
            <span className="text-xs text-slate-500">{hosp.localRoundsCompleted} local rounds</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Ready for local retraining anytime
          </div>
        </div>

        {/* Metric 5: Last Global Sync Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-medical-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Last Global Sync</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2">
            <span className="text-base font-bold text-slate-800">{hosp.lastSyncTime}</span>
          </div>
          <div className="mt-2 text-[11px] flex items-center space-x-1">
            <span className={`w-2 h-2 rounded-full ${hosp.syncStatus === 'Update Available' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            <span className="text-slate-600 font-medium">
              {hosp.syncStatus === 'Update Available' ? 'New Global Model Available!' : 'Synchronized with Global Backbone'}
            </span>
          </div>
        </div>

        {/* Metric 6: Updates Sent to Global Model */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-medical-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Model Updates Sent</span>
            <Send className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{hosp.updatesSentCount}</span>
            <span className="text-xs text-slate-500">weights sent</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-medium">
            {hosp.updateSentToGlobal ? 'Latest weights queued on server' : 'Ready for current round'}
          </div>
        </div>

      </div>

      {/* Quick Action Control Bar */}
      <div className="bg-gradient-to-r from-medical-50 via-teal-50/50 to-slate-50 rounded-2xl border border-medical-200/80 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-medical-600" />
              <span>Hospital Client Operations</span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Execute local training, transmit updated parameters, or synchronize with the latest aggregated global model.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('dataset')}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 shadow-2xs"
            >
              Upload / View Dataset
            </button>

            <button
              onClick={() => {
                setActiveTab('training');
                startLocalTraining(hospId, { epochs: 5 });
              }}
              className="px-3.5 py-2 rounded-xl bg-medical-600 text-white font-semibold text-xs hover:bg-medical-700 shadow-sm"
            >
              Start Local Training
            </button>

            <button
              onClick={() => {
                setActiveTab('updates');
                sendModelUpdate(hospId);
              }}
              className="px-3.5 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs hover:bg-teal-700 shadow-sm"
            >
              Send Model Update
            </button>

            {hosp.syncStatus === 'Update Available' && (
              <button
                onClick={() => applyGlobalModel(hospId)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 shadow-sm animate-bounce"
              >
                Apply Global Model ({globalModel.version})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Accuracy & Loss Progress Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Local Training Progression</h3>
            <p className="text-xs text-slate-500">Validation Accuracy (%) vs Epoch across local training rounds</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-medium">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-sm bg-medical-500 inline-block"></span>
              <span className="text-slate-600">Accuracy (%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-sm bg-teal-400 inline-block"></span>
              <span className="text-slate-600">Val Accuracy (%)</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hosp.trainingHistory} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorValAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 95]} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val) => [`${val}%`, '']}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorAcc)" name="Training Acc" />
              <Area type="monotone" dataKey="valAccuracy" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorValAcc)" name="Validation Acc" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
