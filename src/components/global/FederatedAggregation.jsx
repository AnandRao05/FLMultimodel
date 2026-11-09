import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Cpu, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Award, 
  ArrowRight,
  TrendingUp,
  Server,
  Zap,
  Building2,
  Lock
} from 'lucide-react';

export const FederatedAggregation = () => {
  const { 
    globalModel, 
    hospitals, 
    aggregationState, 
    startGlobalAggregation, 
    distributeGlobalModel,
    setActiveTab,
    pendingUpdatesCount 
  } = useFederatedLearning();

  const totalPatients = hospitals.hosp1.totalRecords + hospitals.hosp2.totalRecords + hospitals.hosp3.totalRecords;

  const steps = [
    { num: 1, title: 'Validate Model Updates', desc: 'Verify TLS 1.3 signatures & check for 0 raw data leak.' },
    { num: 2, title: 'Compute Sample Weights', desc: 'Compute w_k = n_k / N proportional to local patient cohort size.' },
    { num: 3, title: 'Tensor Federated Averaging', desc: 'Execute FedAvg matrix fusion: W_new = sum(w_k * W_k).' },
    { num: 4, title: 'Evaluate Benchmark & Compile', desc: 'Benchmark against multimodal holdout validation set.' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-teal-600" />
            <span>Federated Model Aggregation (FedAvg)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Decentralized parameter aggregation engine performing Federated Averaging across 3 hospital nodes.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Algorithm: McMahan et al. FedAvg</span>
        </div>
      </div>

      {/* FedAvg Mathematical Formulation Card */}
      <div className="bg-gradient-to-r from-slate-900 via-medical-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider">
              Mathematical Aggregation Formula
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Federated Averaging (FedAvg) Multimodal Objective
            </h3>
          </div>
          <div className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono">
            K = 3 Hospitals • N = {totalPatients} Records
          </div>
        </div>

        {/* Math Display */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-center text-sm sm:text-base text-teal-300">
          W_(t+1) = ∑_(k=1)^K (n_k / N) · W_k^(t+1)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="font-semibold text-white">n_k / N Weight:</span>
            <p className="text-slate-400 mt-0.5 text-[11px]">Proportional weight contribution based on local patient dataset size.</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="font-semibold text-white">W_k^(t+1) Gradients:</span>
            <p className="text-slate-400 mt-0.5 text-[11px]">Locally trained cross-attention multimodal parameters from hospital k.</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="font-semibold text-white">W_(t+1) Global Model:</span>
            <p className="text-slate-400 mt-0.5 text-[11px]">New generalized consensus model ready for broadcast to all 3 nodes.</p>
          </div>
        </div>
      </div>

      {/* Hospital Participation & Contribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: 'hosp1', code: 'HOSP-01', name: 'St. Jude Memorial', data: hospitals.hosp1 },
          { key: 'hosp2', code: 'HOSP-02', name: 'Metropolitan General', data: hospitals.hosp2 },
          { key: 'hosp3', code: 'HOSP-03', name: 'Apex Research Inst.', data: hospitals.hosp3 }
        ].map(({ key, code, name, data }) => {
          const weightPercent = ((data.totalRecords / totalPatients) * 100).toFixed(1);
          return (
            <div key={key} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  data.updateSentToGlobal ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {data.updateSentToGlobal ? 'Parameters Ready' : 'Pending Update'}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm">{name}</h4>
                <p className="text-xs text-slate-500">{data.totalRecords} patient records</p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>FedAvg Weight (wₖ):</span>
                  <span className="font-mono font-bold text-teal-700">{weightPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Accuracy:</span>
                  <span className="font-bold text-medical-700">{data.currentAccuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Shared:</span>
                  <span className="font-semibold text-emerald-600">0 Bytes (Strict)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Aggregation Controls & Interactive Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Execute Federated Aggregation Round {globalModel.currentRound + 1}</h3>
            <p className="text-xs text-slate-500">
              Combines parameters across all participating institutions to produce the next Global Multimodal Model version.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={startGlobalAggregation}
              disabled={aggregationState.isAggregating}
              className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                aggregationState.isAggregating
                  ? 'bg-amber-500 text-white cursor-wait animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-700 text-white active:scale-95'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{aggregationState.isAggregating ? 'Executing FedAvg Pipeline...' : 'Start Global Aggregation'}</span>
            </button>
          </div>
        </div>

        {/* Aggregation Steps Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st) => {
            const isCompleted = aggregationState.step >= st.num;
            const isCurrent = aggregationState.step === st.num && aggregationState.isAggregating;
            return (
              <div 
                key={st.num}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent 
                    ? 'border-teal-500 bg-teal-50/70 shadow-xs ring-2 ring-teal-500/20' 
                    : isCompleted 
                    ? 'border-emerald-300 bg-emerald-50/40' 
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Step 0{st.num}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-xs">{st.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Live Aggregation Progress Status */}
        {aggregationState.isAggregating && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
            <div className="flex justify-between items-center text-teal-400 font-bold">
              <span>// FEDAVG EXECUTION PROGRESS: {aggregationState.progress}%</span>
              <span>Round {globalModel.currentRound + 1}</span>
            </div>
            <p className="text-slate-300 text-xs">{aggregationState.statusText}</p>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mt-2">
              <div 
                className="h-full bg-teal-400 transition-all duration-300 rounded-full" 
                style={{ width: `${aggregationState.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Post-aggregation Result Banner */}
        {aggregationState.step === 4 && !aggregationState.isAggregating && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-950 text-sm">
                  Global Aggregation Successfully Generated {globalModel.version}!
                </h4>
                <p className="text-xs text-emerald-800">
                  Global benchmark accuracy reached <span className="font-bold">{globalModel.globalAccuracy}%</span> across {totalPatients} multimodal patients.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('distribution');
                distributeGlobalModel();
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <span>Distribute to Hospitals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
