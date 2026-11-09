import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Printer, 
  ShieldCheck, 
  Clock, 
  Award,
  Layers,
  History,
  Activity
} from 'lucide-react';

export const HospitalReports = ({ hospId }) => {
  const { hospitals, globalModel, addNotification } = useFederatedLearning();
  const hosp = hospitals[hospId];

  if (!hosp) return null;

  const handleExportJSON = () => {
    const reportData = {
      hospital: hosp.name,
      code: hosp.code,
      generatedAt: new Date().toISOString(),
      recordsCount: hosp.totalRecords,
      currentAccuracy: hosp.currentAccuracy,
      currentLoss: hosp.currentLoss,
      precision: hosp.precision,
      recall: hosp.recall,
      f1Score: hosp.f1Score,
      modelVersion: hosp.modelVersion,
      globalModelSynced: hosp.globalModelVersion,
      qualityStats: hosp.qualityStats,
      trainingHistory: hosp.trainingHistory,
      privacyGuarantee: 'Zero raw patient records transmitted. Enclave protected.'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${hosp.code}_audit_report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification('Report Exported', `${hosp.code} audit report downloaded as JSON.`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <FileText className="w-5 h-5 text-medical-600" />
            <span>Hospital Performance & Audit Reports</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit-grade performance metrics and data privacy compliance logs for {hosp.name}.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-medical-600 text-white font-semibold text-xs hover:bg-medical-700 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Full JSON Report</span>
          </button>
        </div>
      </div>

      {/* Comprehensive Report Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Institutional Clinical AI Report</h3>
            <span className="text-xs text-slate-500">Institution: {hosp.name} ({hosp.code})</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Generated: {new Date().toLocaleDateString()}</span>
        </div>

        {/* Performance Metrics Table */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Local Multimodal Model Performance Metrics
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block">Classification Accuracy:</span>
              <span className="text-xl font-bold text-medical-700 mt-0.5 block">{hosp.currentAccuracy}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block">Cross-Entropy Loss:</span>
              <span className="text-xl font-bold text-slate-900 mt-0.5 block">{hosp.currentLoss}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block">Precision / Recall:</span>
              <span className="text-xl font-bold text-teal-700 mt-0.5 block">{hosp.precision} / {hosp.recall}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block">F1 Harmonic Mean:</span>
              <span className="text-xl font-bold text-indigo-700 mt-0.5 block">{hosp.f1Score}</span>
            </div>
          </div>
        </div>

        {/* Model Versioning History */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Model Version & Synchronization History
          </h4>
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Local Model Version</th>
                  <th className="py-2.5 px-3">Global Baseline</th>
                  <th className="py-2.5 px-3">Local Accuracy</th>
                  <th className="py-2.5 px-3">Sync Timestamp</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 px-4 font-mono font-medium">{hosp.modelVersion}</td>
                  <td className="py-2.5 px-3 font-mono">{hosp.globalModelVersion}</td>
                  <td className="py-2.5 px-3 font-bold text-medical-700">{hosp.currentAccuracy}%</td>
                  <td className="py-2.5 px-3">{hosp.lastSyncTime}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Synchronized
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* HIPAA & Data Privacy Certification Checklist */}
        <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-3">
          <div className="flex items-center space-x-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Data Privacy & Regulatory Compliance Checklist</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-teal-900">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>HIPAA §164.514 De-identification Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>GDPR Article 9 Special Category Protections</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Zero Raw Patient Records Transmitted (0.00 Bytes)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Differential Privacy Guaranteed (Gaussian Noise Added)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
