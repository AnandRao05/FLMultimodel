import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  History, 
  CheckCircle2, 
  Clock, 
  Award, 
  Cpu, 
  Building2, 
  ShieldCheck, 
  Download 
} from 'lucide-react';

export const FederatedLearningHistory = () => {
  const { globalModel, addNotification } = useFederatedLearning();

  const handleExportHistory = () => {
    const csvRows = [
      ['Round', 'Version', 'Participating Hospitals', 'Combined Records', 'Global Accuracy (%)', 'Loss', 'F1-Score', 'Timestamp', 'Status'].join(','),
      ...globalModel.roundHistory.map(r => [
        r.round,
        `"${r.version}"`,
        `"${r.participatingHospitals.join('; ')}"`,
        r.totalRecords,
        r.accuracy,
        r.loss,
        r.f1Score,
        `"${r.timestamp}"`,
        `"${r.status}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `federated_rounds_history_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification('History Exported', 'Federated round history exported as CSV.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <History className="w-5 h-5 text-teal-600" />
            <span>Federated Learning Round History</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Immutable log of all completed Federated Averaging aggregation rounds and accuracy benchmarks.
          </p>
        </div>

        <button
          onClick={handleExportHistory}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 shadow-2xs"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Round Log (CSV)</span>
        </button>
      </div>

      {/* History Table Card (Requirement 4.G) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">Completed Federated Rounds</h3>
          <p className="text-xs text-slate-500">Historical performance telemetry across institutional consensus rounds</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Round #</th>
                <th className="py-3 px-4">Global Model Version</th>
                <th className="py-3 px-4">Participating Hospitals</th>
                <th className="py-3 px-3">Updates Received</th>
                <th className="py-3 px-3">Combined Records</th>
                <th className="py-3 px-3">Global Accuracy</th>
                <th className="py-3 px-3">Loss</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
              {globalModel.roundHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-teal-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">Round {item.round}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-teal-800">{item.version}</td>
                  <td className="py-3 px-4 text-slate-600">{item.participatingHospitals.join(', ')}</td>
                  <td className="py-3 px-3 font-semibold text-slate-800">{item.weightsReceived} of 3</td>
                  <td className="py-3 px-3 font-mono">{item.totalRecords.toLocaleString()}</td>
                  <td className="py-3 px-3 font-bold text-teal-700">{item.accuracy}%</td>
                  <td className="py-3 px-3 font-mono">{item.loss}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{item.timestamp}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {item.status}
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
