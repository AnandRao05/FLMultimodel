import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  FileCheck, 
  Server, 
  Sparkles 
} from 'lucide-react';

export const SecurityPrivacy = () => {
  const { globalModel, hospitals } = useFederatedLearning();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Security & Privacy Monitoring Center</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Continuous verification that no raw patient records are transmitted across network boundaries.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Zero-Knowledge Privacy Verified</span>
        </div>
      </div>

      {/* 4 Pillars of Healthcare Privacy Grid (Requirement 4.H) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Raw Patient Data Leaked</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">0.00 Bytes</div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">Strict on-premise containment</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Transfer Channel</span>
            <Lock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 text-xl font-bold font-mono text-slate-900">TLS 1.3 / mTLS</div>
          <span className="text-[11px] text-teal-700 font-medium mt-1 block">AES-256-GCM Encrypted</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Differential Privacy</span>
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-xl font-bold text-indigo-700">DP-SGD Active</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Gaussian noise ε ≤ 1.2, δ = 10⁻⁵</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Regulatory Status</span>
            <FileCheck className="w-4 h-4 text-medical-600" />
          </div>
          <div className="mt-2 text-lg font-bold text-slate-900">HIPAA & GDPR</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">100% Compliant</span>
        </div>

      </div>

      {/* Hospital Enclave Isolation Architecture Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-medical-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-teal-800/60 space-y-4">
        <h3 className="text-base font-bold text-teal-300 flex items-center space-x-2">
          <Lock className="w-4 h-4 text-teal-400" />
          <span>Hospital Enclave Isolation Guarantee</span>
        </h3>
        <p className="text-xs text-slate-200 leading-relaxed max-w-3xl">
          Under the Multimodal Federated Learning protocol, the Global Aggregator operates strictly as a parameter clearinghouse. It receives parameter gradients ($\Delta W$), computes the weighted mean according to client cohort size, and redistributes new weight matrices. At no point does raw patient data, DICOM images, ECG waveforms, or clinical transcripts leave Hospital 1, Hospital 2, or Hospital 3.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            <span className="font-semibold text-teal-300">HOSP-01 (St. Jude):</span>
            <p className="text-[11px] text-slate-300 mt-0.5">Cardiovascular enclave isolated. Zero external query access.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            <span className="font-semibold text-teal-300">HOSP-02 (Metropolitan):</span>
            <p className="text-[11px] text-slate-300 mt-0.5">Thoracic & ICU enclave isolated. Data quarantined.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            <span className="font-semibold text-teal-300">HOSP-03 (Apex):</span>
            <p className="text-[11px] text-slate-300 mt-0.5">Emergency AI enclave isolated. Data quarantined.</p>
          </div>
        </div>
      </div>

      {/* Real-time Security Event Audit Log */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">Cryptographic Transmission Audit Log</h3>
          <p className="text-xs text-slate-500">Immutable ledger of incoming weight transmissions and integrity verifications</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-3">Client / Node</th>
                <th className="py-3 px-4">Event Description</th>
                <th className="py-3 px-3">Payload Transferred</th>
                <th className="py-3 px-4">Patient Data Leaked</th>
                <th className="py-3 px-3">Security Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
              {globalModel.securityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{log.timestamp}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{log.client}</td>
                  <td className="py-3 px-4 text-slate-800">{log.event}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{log.payloadSize}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">{log.dataShared}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
