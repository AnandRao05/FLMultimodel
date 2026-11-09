import React, { useState } from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Clock, 
  Hash, 
  FileCode, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  Server
} from 'lucide-react';

export const ModelUpdateManagement = ({ hospId }) => {
  const { hospitals, sendModelUpdate, setActiveTab } = useFederatedLearning();
  const hosp = hospitals[hospId];

  const [addDiffPrivacy, setAddDiffPrivacy] = useState(true);
  const [epsilonVal, setEpsilonVal] = useState(1.2);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionStep, setTransmissionStep] = useState(0);

  if (!hosp) return null;

  const handleSend = () => {
    setIsTransmitting(true);
    setTransmissionStep(1); // Preparing weights

    setTimeout(() => {
      setTransmissionStep(2); // Adding DP noise & signing
      setTimeout(() => {
        setTransmissionStep(3); // TLS 1.3 handshake
        setTimeout(() => {
          sendModelUpdate(hospId);
          setIsTransmitting(false);
          setTransmissionStep(4); // Finished
        }, 800);
      }, 700);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Send className="w-5 h-5 text-teal-600" />
            <span>Model Update & Parameter Transmission</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Prepare, cryptographically sign, and transmit local gradient updates to the central FedAvg server.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Strictly Zero Raw Patient Data Transferred</span>
        </div>
      </div>

      {/* Main Model Update Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        {/* Status Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
              hosp.updateSentToGlobal 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-medical-100 text-medical-700'
            }`}>
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Current Local Model State</div>
              <div className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span>{hosp.modelVersion}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  hosp.updateSentToGlobal ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {hosp.updateSentToGlobal ? 'Transmitted & Queued' : 'Ready for Transmission'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-right sm:text-right">
            <span className="text-slate-500 block">Current Accuracy:</span>
            <span className="text-base font-bold text-medical-700">{hosp.currentAccuracy}%</span>
          </div>
        </div>

        {/* Update Payload Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-slate-500 block">Payload Type</span>
            <span className="font-semibold text-slate-800 text-sm mt-0.5 block">Gradient Tensors (ΔW)</span>
            <span className="text-[11px] text-teal-700 mt-1 block">Zero raw records</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-slate-500 block">Parameter Weight Size</span>
            <span className="font-semibold text-slate-800 text-sm mt-0.5 block">54.2 MB (FP16)</span>
            <span className="text-[11px] text-slate-500 mt-1 block">14.2M neural parameters</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-slate-500 block">Gradient Frobenius Norm</span>
            <span className="font-mono font-semibold text-slate-800 text-sm mt-0.5 block">||ΔW||₂ = 0.0482</span>
            <span className="text-[11px] text-emerald-600 mt-1 block">Bounded clipping</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-slate-500 block">Integrity Checksum</span>
            <span className="font-mono text-[11px] text-slate-700 truncate block mt-0.5">sha256:7c9e12...b4a0</span>
            <span className="text-[11px] text-teal-700 mt-1 block">Cryptographically signed</span>
          </div>
        </div>

        {/* Differential Privacy Configuration */}
        <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-bold text-teal-950">Differential Privacy (DP-SGD Noise Injection)</span>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-teal-900">
              <input 
                type="checkbox" 
                checked={addDiffPrivacy}
                onChange={(e) => setAddDiffPrivacy(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded accent-teal-600"
              />
              <span>Enable Gaussian Noise (ε = {epsilonVal})</span>
            </label>
          </div>
          <p className="text-[11px] text-teal-800 leading-relaxed">
            Injects calibrated Gaussian perturbation into gradients prior to transmission, mathematically preventing membership inference and reconstruction attacks on hospital patients.
          </p>
        </div>

        {/* Transmission Controls */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {hosp.updateSentToGlobal ? (
              <span className="text-emerald-700 font-semibold flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Update sent to Central Server. Awaiting global FedAvg aggregation.
              </span>
            ) : (
              <span>Ready to transmit model update parameters to Global Aggregator.</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSend}
              disabled={isTransmitting || hosp.updateSentToGlobal}
              className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                hosp.updateSentToGlobal
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : isTransmitting
                  ? 'bg-teal-600 text-white cursor-wait animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-700 text-white active:scale-95'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isTransmitting ? 'Transmitting Encrypted Weights...' : hosp.updateSentToGlobal ? 'Update Already Transmitted' : 'Send Model Update to Global Server'}</span>
            </button>
          </div>
        </div>

        {/* Transmission Animation Progress */}
        {isTransmitting && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
            <div className="text-teal-400 font-bold">// SECURE TRANSMISSION PIPELINE</div>
            <div className="space-y-1 text-[11px]">
              <div className={transmissionStep >= 1 ? 'text-emerald-400' : 'text-slate-500'}>
                [1/3] Extracted gradient tensors from local multimodal transformer: 14.2M params.
              </div>
              <div className={transmissionStep >= 2 ? 'text-emerald-400' : 'text-slate-500'}>
                [2/3] Applied differential privacy noise (σ=0.05, ε={epsilonVal}) & signed with hospital enclave RSA-4096 key.
              </div>
              <div className={transmissionStep >= 3 ? 'text-emerald-400' : 'text-slate-500'}>
                [3/3] Establishing TLS 1.3 tunnel to Central FedAvg Server... Handshake verified!
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Synchronization & Transmission History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">Transmission & Synchronization Log</h3>
          <p className="text-xs text-slate-500">Audit trail of model parameter updates sent from {hosp.name}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-3">Round</th>
                <th className="py-3 px-4">Model Version</th>
                <th className="py-3 px-3">Payload Size</th>
                <th className="py-3 px-4">Local Accuracy</th>
                <th className="py-3 px-4">Raw Data Shared</th>
                <th className="py-3 px-3">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-mono">{hosp.lastSyncTime}</td>
                <td className="py-3 px-3 font-semibold">Round {hosp.localRoundsCompleted}</td>
                <td className="py-3 px-4 font-mono font-medium text-slate-900">{hosp.modelVersion}</td>
                <td className="py-3 px-3">54.2 MB (Gradients)</td>
                <td className="py-3 px-4 font-bold text-medical-700">{hosp.currentAccuracy}%</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">0 Bytes (Strict)</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Delivered & Verified
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
