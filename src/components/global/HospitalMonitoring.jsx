import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Building2, 
  Activity, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck,
  Award,
  Database
} from 'lucide-react';

export const HospitalMonitoring = () => {
  const { hospitals, globalModel, navigateTo, sendModelUpdate } = useFederatedLearning();

  const totalPatients = hospitals.hosp1.totalRecords + hospitals.hosp2.totalRecords + hospitals.hosp3.totalRecords;

  const hospitalList = [
    { key: 'hosp1', data: hospitals.hosp1, color: 'medical' },
    { key: 'hosp2', data: hospitals.hosp2, color: 'teal' },
    { key: 'hosp3', data: hospitals.hosp3, color: 'indigo' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Activity className="w-5 h-5 text-medical-600" />
            <span>Participating Hospital Monitoring (3 Nodes)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time status, accuracy, and update transmission telemetry from all three independent hospital enclaves.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>All 3 Nodes Connected via TLS 1.3</span>
        </div>
      </div>

      {/* 3 Individual Hospital Monitoring Cards (Requirement 4.B) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {hospitalList.map(({ key, data, color }) => {
          const weightPercent = ((data.totalRecords / totalPatients) * 100).toFixed(1);
          return (
            <div 
              key={key} 
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Node Code & Connection Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    {data.code}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-emerald-700">{data.connectionStatus}</span>
                  </div>
                </div>

                {/* Hospital Title */}
                <div className="mt-4 flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-lg shrink-0`}>
                    <Building2 className="w-6 h-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{data.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{data.location}</p>
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-3 text-xs">
                  
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Local Model Accuracy:</span>
                    <span className="text-sm font-bold text-medical-700">{data.currentAccuracy}%</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Local Model Version:</span>
                    <span className="font-mono font-medium text-slate-800">{data.modelVersion}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Private Patient Records:</span>
                    <span className="font-semibold text-slate-900">{data.totalRecords} records</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>FedAvg Contribution Weight (wₖ):</span>
                    <span className="font-mono font-bold text-teal-700">{weightPercent}%</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Update Submission:</span>
                    <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                      data.updateSentToGlobal 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {data.updateSentToGlobal ? 'Update Received & Validated' : 'Awaiting Local Training'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Sync Status:</span>
                    <span className="font-semibold text-slate-800">{data.syncStatus}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Last Update Timestamp:</span>
                    <span className="text-slate-500 font-mono text-[11px]">{data.lastSyncTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-2">
                {!data.updateSentToGlobal ? (
                  <button
                    onClick={() => sendModelUpdate(key)}
                    className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-2xs"
                  >
                    Simulate Update
                  </button>
                ) : (
                  <div className="flex-1 py-2 px-3 rounded-xl bg-slate-100 text-slate-600 text-center text-xs font-medium">
                    Parameters Ready
                  </div>
                )}

                <button
                  onClick={() => navigateTo(key)}
                  className="py-2 px-3 rounded-xl bg-medical-50 hover:bg-medical-100 text-medical-700 font-semibold text-xs transition-colors flex items-center space-x-1"
                  title="Open this hospital's local dashboard"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Zero Data Leakage Enclave Explainer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex items-start space-x-4">
        <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900">Decentralized Healthcare Enclave Guarantee</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Central Global Model Server only monitors mathematical telemetry (loss, parameter weight gradients, and parameter shapes). Patient identifiers, medical images, demographic details, and clinical notes never leave the respective local hospital enclaves.
          </p>
        </div>
      </div>

    </div>
  );
};
