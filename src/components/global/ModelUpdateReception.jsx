import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Radio, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Cpu, 
  FileCode, 
  ArrowRight,
  Send,
  Layers,
  Lock
} from 'lucide-react';

export const ModelUpdateReception = () => {
  const { hospitals, sendModelUpdate, setActiveTab } = useFederatedLearning();

  const updates = [
    { hospId: 'hosp1', code: 'HOSP-01', name: 'St. Jude Memorial Hospital', data: hospitals.hosp1 },
    { hospId: 'hosp2', code: 'HOSP-02', name: 'Metropolitan General Hospital', data: hospitals.hosp2 },
    { hospId: 'hosp3', code: 'HOSP-03', name: 'Apex Health Research Institute', data: hospitals.hosp3 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Radio className="w-5 h-5 text-medical-600" />
            <span>Model Update Reception & Verification</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Incoming parameter payloads transmitted over TLS 1.3 from independent hospital clients.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('aggregation')}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <span>Proceed to Aggregation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Incoming Updates Grid */}
      <div className="space-y-4">
        {updates.map(({ hospId, code, name, data }) => (
          <div 
            key={hospId}
            className={`p-6 rounded-2xl border transition-all ${
              data.updateSentToGlobal
                ? 'bg-white border-emerald-300 shadow-xs'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Identity */}
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                  data.updateSentToGlobal 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      data.updateSentToGlobal 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {data.updateSentToGlobal ? 'PAYLOAD RECEIVED & VERIFIED' : 'WAITING FOR UPDATE'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{name}</h3>
                  <p className="text-xs text-slate-500">
                    Local Version: <span className="font-mono text-slate-700 font-medium">{data.modelVersion}</span> • Accuracy: <span className="font-bold text-medical-700">{data.currentAccuracy}%</span>
                  </p>
                </div>
              </div>

              {/* Right Payload Telemetry */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Payload Type</span>
                  <span className="font-semibold text-slate-800">
                    {data.updateSentToGlobal ? 'Gradients (ΔW)' : 'None'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Raw Patient Data</span>
                  <span className="font-semibold text-emerald-700 flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    0.00 Bytes
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Diff Privacy (DP)</span>
                  <span className="font-semibold text-teal-700">
                    {data.updateSentToGlobal ? 'Verified (ε=1.2)' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Quick Action Button */}
              <div>
                {!data.updateSentToGlobal ? (
                  <button
                    onClick={() => sendModelUpdate(hospId)}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs"
                  >
                    Simulate Reception
                  </button>
                ) : (
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Validated for FedAvg</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Payload Security Validation Protocol Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Lock className="w-4 h-4 text-teal-600" />
          <span>Server-Side Model Payload Validation Protocol</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800 block">1. Cryptographic Signature</span>
            <p className="mt-1 text-[11px] text-slate-500">Each weight update is verified against the hospital enclave's registered public key (RSA-4096 / Ed25519).</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800 block">2. Privacy Noise Audit</span>
            <p className="mt-1 text-[11px] text-slate-500">The server verifies Gaussian perturbation bounds to guarantee patient membership privacy before accepting weights.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800 block">3. Weight Tensor Alignment</span>
            <p className="mt-1 text-[11px] text-slate-500">Model parameter shapes ([B, 768], [B, 128], [B, 512]) are strictly checked for FedAvg matrix congruence.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
