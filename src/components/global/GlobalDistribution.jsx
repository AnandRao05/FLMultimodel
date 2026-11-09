import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Globe2, 
  Layers,
  Radio,
  Sparkles
} from 'lucide-react';

export const GlobalDistribution = () => {
  const { globalModel, hospitals, distributeGlobalModel, distributionState } = useFederatedLearning();

  const hospitalList = [
    { key: 'hosp1', code: 'HOSP-01', name: 'St. Jude Memorial Hospital', status: globalModel.distributionStatus.hosp1 },
    { key: 'hosp2', code: 'HOSP-02', name: 'Metropolitan General Hospital', status: globalModel.distributionStatus.hosp2 },
    { key: 'hosp3', code: 'HOSP-03', name: 'Apex Health Research Institute', status: globalModel.distributionStatus.hosp3 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Send className="w-5 h-5 text-teal-600" />
            <span>Global Model Parameter Distribution</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Broadcast updated global model weights ({globalModel.version}) to all participating hospitals.
          </p>
        </div>

        <button
          onClick={distributeGlobalModel}
          disabled={distributionState.isDistributing}
          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
            distributionState.isDistributing
              ? 'bg-amber-500 text-white cursor-wait animate-pulse'
              : 'bg-teal-600 hover:bg-teal-700 text-white active:scale-95'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{distributionState.isDistributing ? 'Broadcasting Weights...' : 'Distribute Global Model to All Hospitals'}</span>
        </button>
      </div>

      {/* Global Distribution Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs text-slate-500 font-medium">Model Version Prepared for Distribution</span>
            <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">{globalModel.version}</div>
          </div>
          <div className="text-xs text-right sm:text-right">
            <span className="text-slate-500 block">Global Benchmark Accuracy:</span>
            <span className="text-base font-bold text-teal-700">{globalModel.globalAccuracy}%</span>
          </div>
        </div>

        {/* Live Distribution Progress Bar */}
        {distributionState.isDistributing && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
            <div className="flex justify-between items-center text-teal-400 font-bold">
              <span>// BROADCASTING TO 3 NODES: {distributionState.progress}%</span>
              <span>TLS 1.3 Multiplexed</span>
            </div>
            <p className="text-slate-300 text-xs">{distributionState.statusText}</p>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mt-2">
              <div 
                className="h-full bg-teal-400 transition-all duration-300 rounded-full" 
                style={{ width: `${distributionState.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* 3 Hospital Distribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {hospitalList.map(({ key, code, name, status }) => (
            <div key={key} className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  status.distributed 
                    ? 'bg-emerald-100 text-emerald-800 flex items-center' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {status.distributed ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                      Delivered
                    </>
                  ) : (
                    'Pending Broadcast'
                  )}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs">{name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Payload: 54.2 MB (Global Backbone Weights)
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Delivery Time:</span>
                  <span className="font-mono text-slate-800">{status.time || 'Pending'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Enclave Ack:</span>
                  <span className="font-semibold text-emerald-600">
                    {status.acknowledged ? 'Signed ACK Received' : 'Awaiting'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
