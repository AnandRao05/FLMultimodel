import React from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Building2, 
  Globe2, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Database, 
  Lock, 
  Activity, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  Layers, 
  FileSpreadsheet,
  Zap,
  TrendingUp,
  Server
} from 'lucide-react';

export const LandingPage = () => {
  const { hospitals, globalModel, navigateTo, runFullSimulation, pendingUpdatesCount } = useFederatedLearning();

  const totalRecordsAcrossHospitals = hospitals.hosp1.totalRecords + hospitals.hosp2.totalRecords + hospitals.hosp3.totalRecords;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-medical-900 via-medical-800 to-teal-900 text-white p-8 sm:p-12 shadow-xl border border-medical-700/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-medical-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-4 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span>Privacy-Preserving Collaborative Artificial Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Multimodal Federated Learning for Healthcare
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            A decentralized medical AI ecosystem where three independent hospital clients train multimodal models on private patient datasets (Medical Scans, Clinical Biomarkers, and Clinical Notes) and aggregate model weights via <span className="text-teal-300 font-semibold">Federated Averaging (FedAvg)</span> without ever sharing raw patient records.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={runFullSimulation}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-medical-400 text-slate-950 font-bold text-sm shadow-lg hover:from-teal-300 hover:to-medical-300 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch 1-Click FL Simulation</span>
            </button>

            <button
              onClick={() => navigateTo('global')}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/20 transition-all"
            >
              <Globe2 className="w-4 h-4" />
              <span>Access Global Server</span>
            </button>
          </div>
        </div>

        {/* Global Summary KPI Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
          <div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Independent Hospitals</div>
            <div className="text-2xl font-bold mt-1 text-white">3 Nodes</div>
            <div className="text-xs text-teal-300 flex items-center mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1"></span>
              All 100% Online
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Total Patient Records</div>
            <div className="text-2xl font-bold mt-1 text-white">{totalRecordsAcrossHospitals.toLocaleString()}</div>
            <div className="text-xs text-slate-300 mt-0.5">Strictly Local Storage</div>
          </div>

          <div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Global Model Accuracy</div>
            <div className="text-2xl font-bold mt-1 text-teal-300">{globalModel.globalAccuracy}%</div>
            <div className="text-xs text-slate-300 mt-0.5">FedAvg (Round {globalModel.currentRound})</div>
          </div>

          <div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Data Leaked to Network</div>
            <div className="text-2xl font-bold mt-1 text-emerald-400">0.00 Bytes</div>
            <div className="text-xs text-emerald-300 mt-0.5">HIPAA & GDPR Enforced</div>
          </div>
        </div>
      </section>

      {/* 4 Main Dashboard Selection Cards Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Dashboards</h2>
          <p className="text-sm text-slate-600 mt-1">
            Access the three independent local hospital client dashboards or the centralized Global Model Aggregation server.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Hospital 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-medical-300 p-6 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-medical-50 text-medical-700 border border-medical-200">
                  {hospitals.hosp1.code}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-slate-500">{hospitals.hosp1.connectionStatus}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-medical-100 text-medical-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-medical-700 transition-colors">
                    {hospitals.hosp1.name}
                  </h3>
                  <p className="text-xs text-slate-500">{hospitals.hosp1.location}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Specialization:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[140px]">Cardiovascular</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Patient Records:</span>
                  <span className="font-semibold text-slate-800">{hospitals.hosp1.totalRecords} records</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Local Accuracy:</span>
                  <span className="font-bold text-medical-700">{hospitals.hosp1.currentAccuracy}%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Modalities:</span>
                  <span className="font-medium text-slate-700">Images, Vitals, Notes</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Model Update:</span>
                  <span className={`font-semibold ${hospitals.hosp1.updateSentToGlobal ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {hospitals.hosp1.updateSentToGlobal ? 'Transmitted' : 'Awaiting Training'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('hosp1')}
              className="mt-6 w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-medical-50 text-medical-700 font-semibold text-xs border border-medical-200 hover:bg-medical-600 hover:text-white transition-all shadow-xs"
            >
              <span>Open Hospital 1 Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Hospital 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-medical-300 p-6 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {hospitals.hosp2.code}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-slate-500">{hospitals.hosp2.connectionStatus}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    {hospitals.hosp2.name}
                  </h3>
                  <p className="text-xs text-slate-500">{hospitals.hosp2.location}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Specialization:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[140px]">Pulmonary Critical</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Patient Records:</span>
                  <span className="font-semibold text-slate-800">{hospitals.hosp2.totalRecords} records</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Local Accuracy:</span>
                  <span className="font-bold text-teal-700">{hospitals.hosp2.currentAccuracy}%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Modalities:</span>
                  <span className="font-medium text-slate-700">CT Scans, Blood Gas, ICU</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Model Update:</span>
                  <span className={`font-semibold ${hospitals.hosp2.updateSentToGlobal ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {hospitals.hosp2.updateSentToGlobal ? 'Transmitted' : 'Awaiting Training'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('hosp2')}
              className="mt-6 w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-teal-50 text-teal-700 font-semibold text-xs border border-teal-200 hover:bg-teal-600 hover:text-white transition-all shadow-xs"
            >
              <span>Open Hospital 2 Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Hospital 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-medical-300 p-6 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {hospitals.hosp3.code}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-slate-500">{hospitals.hosp3.connectionStatus}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-700 transition-colors">
                    {hospitals.hosp3.name}
                  </h3>
                  <p className="text-xs text-slate-500">{hospitals.hosp3.location}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Specialization:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[140px]">Emergency Medicine</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Patient Records:</span>
                  <span className="font-semibold text-slate-800">{hospitals.hosp3.totalRecords} records</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Local Accuracy:</span>
                  <span className="font-bold text-indigo-700">{hospitals.hosp3.currentAccuracy}%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Modalities:</span>
                  <span className="font-medium text-slate-700">MRI, Biomarkers, Triage</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Model Update:</span>
                  <span className={`font-semibold ${hospitals.hosp3.updateSentToGlobal ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {hospitals.hosp3.updateSentToGlobal ? 'Transmitted' : 'Awaiting Training'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('hosp3')}
              className="mt-6 w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-xs"
            >
              <span>Open Hospital 3 Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Global Model Server */}
          <div className="bg-gradient-to-br from-slate-900 via-medical-950 to-slate-950 text-white rounded-2xl border border-slate-700 shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  CENTRAL SERVER
                </span>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span className="text-xs text-slate-300">Ready</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
                    Global Model Server
                  </h3>
                  <p className="text-xs text-slate-400">FedAvg Aggregator</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Current Version:</span>
                  <span className="font-mono font-semibold text-teal-300">{globalModel.version}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Global Accuracy:</span>
                  <span className="font-bold text-teal-400 text-sm">{globalModel.globalAccuracy}%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Participating Nodes:</span>
                  <span className="font-semibold text-white">3 of 3 Hospitals</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Federated Rounds:</span>
                  <span className="font-semibold text-white">{globalModel.currentRound} Completed</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Pending Updates:</span>
                  <span className="font-semibold text-amber-400">{pendingUpdatesCount} / 3 Ready</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('global')}
              className="mt-6 w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-medical-600 text-white font-bold text-xs hover:from-teal-400 hover:to-medical-500 transition-all shadow-md"
            >
              <span>Open Global Server Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Interactive 10-Step Federated Learning Workflow Diagram */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Zap className="w-5 h-5 text-medical-600" />
              <span>10-Step Multimodal Federated Learning Workflow</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Strict mathematical privacy architecture: Patient data never leaves local hospital firewalls.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-medical-50 px-3 py-1.5 rounded-lg border border-medical-200 text-medical-800 text-xs font-semibold">
            <Lock className="w-4 h-4 text-medical-600" />
            <span>Differential Privacy & TLS 1.3 Active</span>
          </div>
        </div>

        {/* 10 Workflow Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            { step: '01', title: 'Data Ingestion', desc: 'Each hospital loads private CSV datasets with images, vitals, & notes.', icon: Database },
            { step: '02', title: 'Preprocessing', desc: 'Image normalization, lab scaling, and BioBERT text tokenization.', icon: Layers },
            { step: '03', title: 'Local Training', desc: 'Cross-Attention multimodal network trained inside hospital enclave.', icon: Cpu },
            { step: '04', title: 'Model Updates', desc: 'Gradients extracted; Differential privacy noise added to weights.', icon: Sparkles },
            { step: '05', title: 'Transmission', desc: 'Encrypted parameter tensors (ΔW) sent to Global Server via TLS 1.3.', icon: ArrowRight },
            { step: '06', title: 'Validation', desc: 'Central server checks signatures; verifies zero patient data transmitted.', icon: ShieldCheck },
            { step: '07', title: 'FedAvg Fusion', desc: 'Weighted sample aggregation: W_new = sum(n_k / N * W_k).', icon: Server },
            { step: '08', title: 'New Global Model', desc: 'Compiles updated global backbone with higher generalization.', icon: TrendingUp },
            { step: '09', title: 'Model Broadcast', desc: 'Global server distributes updated parameters to all 3 hospitals.', icon: Globe2 },
            { step: '10', title: 'Local Sync', desc: 'Hospitals apply global weights, boosting diagnostic accuracy.', icon: CheckCircle2 }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-medical-50/50 hover:border-medical-200 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-medical-600 px-2 py-0.5 rounded bg-medical-100">
                      Step {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Multimodal Architecture Guarantee Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-medical-50 to-white p-6 rounded-2xl border border-medical-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-medical-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Medical Image Modality</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Processes Chest X-Rays, Thoracic CTs, and Cardiac MRIs using deep Convolutional / Vision Transformer feature backbones (768-d latent representations).
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl border border-teal-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Clinical Data & Biomarkers</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Ingests patient vitals (Blood Pressure, Heart Rate, SpO2) and key cardiac biomarkers (Troponin I, BNP, CRP, LVEF) through a multi-layer tabular feature encoder (128-d).
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Clinical Text & Radiology Notes</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Tokenizes clinical impressions, radiology findings, and emergency triage notes with domain-adapted Clinical BioBERT (768-d attention sequence).
          </p>
        </div>
      </section>
    </div>
  );
};
