import React, { useState } from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Globe2, 
  Layers, 
  Award,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const GlobalSync = ({ hospId }) => {
  const { hospitals, globalModel, applyGlobalModel } = useFederatedLearning();
  const hosp = hospitals[hospId];

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  if (!hosp) return null;

  const handleDownloadAndApply = () => {
    setIsDownloading(true);
    setDownloadProgress(25);

    setTimeout(() => {
      setDownloadProgress(65);
      setTimeout(() => {
        setDownloadProgress(100);
        setTimeout(() => {
          applyGlobalModel(hospId);
          setIsDownloading(false);
        }, 500);
      }, 600);
    }, 500);
  };

  const accuracyGain = (globalModel.globalAccuracy - hosp.currentAccuracy).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-medical-600" />
            <span>Global Model Synchronization</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Synchronize local hospital neural weights with the central FedAvg global model.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Bi-directional Parameter Sync</span>
        </div>
      </div>

      {/* Synchronized vs Local Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Local Hospital Model */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono">
                LOCAL NODE ({hosp.code})
              </span>
              <span className="text-xs text-slate-500">Trained on {hosp.totalRecords} patients</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{hosp.modelVersion}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Local Private Model Backbone</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-600 font-medium">Local Accuracy</span>
                <span className="text-lg font-bold text-slate-900">{hosp.currentAccuracy}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-600 font-medium">Loss Function</span>
                <span className="text-sm font-bold text-slate-800">{hosp.currentLoss}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-600 font-medium">Last Synchronized</span>
                <span className="text-xs text-slate-700 font-semibold">{hosp.lastSyncTime}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Enclave Storage Status:</span>
            <span className="font-semibold text-emerald-600">Active & Locked</span>
          </div>
        </div>

        {/* Card 2: Central Global Model Server */}
        <div className="bg-gradient-to-br from-medical-50 via-teal-50/40 to-white rounded-2xl border border-medical-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-teal-100 text-teal-800 font-mono">
                GLOBAL FEDAVG BACKBONE
              </span>
              <span className="text-xs font-semibold text-teal-700">Aggregated from 3 Hospitals</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{globalModel.version}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Round {globalModel.currentRound} Multi-institutional Consensus</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-medical-200">
                <span className="text-xs text-slate-600 font-medium">Global Benchmark Accuracy</span>
                <span className="text-lg font-bold text-teal-700">{globalModel.globalAccuracy}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-medical-200">
                <span className="text-xs text-slate-600 font-medium">Global Cross-Entropy Loss</span>
                <span className="text-sm font-bold text-slate-800">{globalModel.globalLoss}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-medical-200">
                <span className="text-xs text-slate-600 font-medium">Performance Boost (Δ)</span>
                <span className="text-xs font-bold text-emerald-700 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +{Math.max(0, accuracyGain)}% Generalized Accuracy
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-medical-100">
            <button
              onClick={handleDownloadAndApply}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all ${
                isDownloading 
                  ? 'bg-amber-500 text-white cursor-wait' 
                  : 'bg-medical-600 hover:bg-medical-700 text-white active:scale-95'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>
                {isDownloading 
                  ? `Downloading Global Weights (${downloadProgress}%)...` 
                  : `Download & Apply ${globalModel.version} to Local Node`}
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Synchronization Benefits Notice */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>How Federated Synchronization Works Without Exposing Data</span>
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          When you click "Apply Global Model", your hospital replaces its local feature backbone with the Federated Averaging weights aggregated from all three institutions. Because the global model has observed weight updates derived from cardiology, oncology, and emergency cohorts, your hospital gains improved generalization on rare clinical pathologies without any patient records ever moving outside your firewall.
        </p>
      </div>

    </div>
  );
};
