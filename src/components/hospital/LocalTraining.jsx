import React, { useState } from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Cpu, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  Layers, 
  Terminal, 
  Send,
  Zap,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export const LocalTraining = ({ hospId }) => {
  const { hospitals, trainingState, startLocalTraining, setActiveTab, sendModelUpdate } = useFederatedLearning();
  const hosp = hospitals[hospId];
  const trainState = trainingState[hospId] || { isTraining: false, progress: 0, currentEpoch: 0, totalEpochs: 5, logs: [] };

  const [epochs, setEpochs] = useState(5);
  const [batchSize, setBatchSize] = useState(32);
  const [learningRate, setLearningRate] = useState(0.0005);
  const [fusionHead, setFusionHead] = useState('Cross-Attention Multimodal Transformer');

  if (!hosp) return null;

  const handleStartTraining = () => {
    startLocalTraining(hospId, {
      epochs: Number(epochs),
      batchSize: Number(batchSize),
      learningRate: Number(learningRate),
      fusionHead
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-medical-600" />
            <span>Local Multimodal Model Training</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Train the private neural network on {hosp.name}'s {hosp.totalRecords} patient records.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Local SGD / AdamW • Gradients kept on-premise</span>
        </div>
      </div>

      {/* Hyperparameter Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-medical-600" />
            <span>Training Hyperparameters</span>
          </h3>
          <span className="text-xs text-slate-400">Pytorch-compatible local configuration</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Epochs Slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
              <span>Training Epochs</span>
              <span className="font-bold text-medical-600">{epochs}</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={epochs}
              disabled={trainState.isTraining}
              onChange={(e) => setEpochs(Number(e.target.value))}
              className="w-full accent-medical-600 cursor-pointer disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 epoch</span>
              <span>15 epochs</span>
            </div>
          </div>

          {/* Batch Size Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Batch Size</label>
            <select
              value={batchSize}
              disabled={trainState.isTraining}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-500/20 disabled:opacity-50"
            >
              <option value="16">16 samples/batch</option>
              <option value="32">32 samples/batch (Recommended)</option>
              <option value="64">64 samples/batch</option>
            </select>
          </div>

          {/* Learning Rate */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Learning Rate (η)</label>
            <select
              value={learningRate}
              disabled={trainState.isTraining}
              onChange={(e) => setLearningRate(Number(e.target.value))}
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-500/20 disabled:opacity-50"
            >
              <option value="0.001">1e-3 (Fast convergence)</option>
              <option value="0.0005">5e-4 (Optimal FedAvg)</option>
              <option value="0.0001">1e-4 (Fine-tuning)</option>
            </select>
          </div>

          {/* Multimodal Head */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Multimodal Head</label>
            <select
              value={fusionHead}
              disabled={trainState.isTraining}
              onChange={(e) => setFusionHead(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-500/20 disabled:opacity-50"
            >
              <option value="Cross-Attention Multimodal Transformer">Cross-Attention Transformer</option>
              <option value="Late Gated Multimodal Fusion">Late Gated Fusion</option>
              <option value="Early Feature Concatenation">Early Concatenation</option>
            </select>
          </div>

        </div>

        {/* Start Training Button */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Current Status: <span className="font-semibold text-slate-800">{hosp.trainingStatus}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleStartTraining}
              disabled={trainState.isTraining}
              className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                trainState.isTraining
                  ? 'bg-amber-500 text-white cursor-wait animate-pulse'
                  : 'bg-medical-600 hover:bg-medical-700 text-white active:scale-95'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{trainState.isTraining ? `Training (Epoch ${trainState.currentEpoch}/${trainState.totalEpochs})...` : 'Start Local Model Training'}</span>
            </button>

            {hosp.trainingStatus === 'Trained' && (
              <button
                onClick={() => {
                  sendModelUpdate(hospId);
                  setActiveTab('updates');
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Trained Weights</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Training Progress Bar */}
        {trainState.isTraining && (
          <div className="pt-2 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-medical-500 animate-ping"></span>
                <span>Training Progress: Epoch {trainState.currentEpoch} of {trainState.totalEpochs}</span>
              </span>
              <span className="font-mono text-medical-600">{trainState.progress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-medical-500 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${trainState.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Model Performance Cards (Post-training Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Validation Accuracy</span>
          <div className="text-2xl font-bold text-medical-700 mt-1">{hosp.currentAccuracy}%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Local holdout test</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Cross-Entropy Loss</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{hosp.currentLoss}</div>
          <span className="text-[11px] text-slate-500">Multimodal Joint Loss</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">F1-Score</span>
          <div className="text-2xl font-bold text-teal-700 mt-1">{hosp.f1Score}</div>
          <span className="text-[11px] text-slate-500">Macro Weighted</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">AUC-ROC Score</span>
          <div className="text-2xl font-bold text-indigo-700 mt-1">{hosp.aucRoc}</div>
          <span className="text-[11px] text-slate-500">Discriminative power</span>
        </div>

      </div>

      {/* Interactive Training Graphs (Loss & Accuracy Curves) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Training Loss & Accuracy History</h3>
            <p className="text-xs text-slate-500">Epoch-by-epoch convergence metrics</p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-0.5 bg-medical-500 inline-block"></span>
              <span className="text-slate-600">Accuracy (%)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-0.5 bg-red-400 inline-block"></span>
              <span className="text-slate-600">Loss</span>
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hosp.trainingHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="epoch" tick={{ fontSize: 11 }} label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
              <YAxis yAxisId="left" domain={[60, 100]} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 1]} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} name="Accuracy (%)" />
              <Line yAxisId="left" type="monotone" dataKey="valAccuracy" stroke="#14b8a6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="Val Accuracy (%)" />
              <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} name="Loss" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Terminal Training Logs */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 font-mono text-xs text-slate-200 space-y-2 shadow-inner">
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
          <span className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-medical-400" />
            <span>Local Training Console Output (Enclave GPU)</span>
          </span>
          <span className="text-[11px] text-teal-400">Zero Data Exfiltration Check: PASS</span>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1 pt-1 text-[11px]">
          {trainState.logs.length === 0 ? (
            <div className="text-slate-500 italic">
              [SYSTEM] Ready to commence local training. Click "Start Local Model Training" to begin.
            </div>
          ) : (
            trainState.logs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                <span className="text-teal-400"> SJMH-GPU-01 &gt; </span>
                <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('INIT') ? 'text-amber-300' : 'text-slate-300'}>
                  {log}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
