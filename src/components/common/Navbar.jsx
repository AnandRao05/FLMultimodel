import React, { useState } from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Activity, 
  ShieldCheck, 
  Building2, 
  Globe2, 
  Bell, 
  Play, 
  ChevronDown, 
  CheckCircle2, 
  Cpu, 
  Lock,
  RotateCcw,
  Download
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activeView, 
    navigateTo, 
    hospitals, 
    globalModel, 
    notifications,
    runFullSimulation,
    pendingUpdatesCount
  } = useFederatedLearning();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showHospitalMenu, setShowHospitalMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand & Title */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigateTo('landing')}
              className="flex items-center space-x-2.5 text-left group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-medical-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-medical-500/20 group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-medical-800 to-teal-700 bg-clip-text text-transparent block leading-tight">
                  MFL Healthcare
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase block">
                  Multimodal Federated Learning
                </span>
              </div>
            </button>

            {/* Privacy Guarantee Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold" title="Zero raw patient data leaves any hospital node">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Zero Raw Data Leaked (HIPAA/GDPR)</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => navigateTo('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'landing'
                  ? 'bg-medical-50 text-medical-700 font-semibold border border-medical-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Overview Portal
            </button>

            {/* Hospitals dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowHospitalMenu(!showHospitalMenu)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView.startsWith('hosp')
                    ? 'bg-medical-50 text-medical-700 font-semibold border border-medical-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>
                  {activeView === 'hosp1' ? 'Hospital 1' : activeView === 'hosp2' ? 'Hospital 2' : activeView === 'hosp3' ? 'Hospital 3' : 'Hospital Clients'}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showHospitalMenu && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setShowHospitalMenu(false)}
                >
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Independent Hospital Nodes
                  </div>
                  <button
                    onClick={() => { navigateTo('hosp1'); setShowHospitalMenu(false); }}
                    className="w-full text-left px-3 py-2.5 hover:bg-medical-50 flex items-center justify-between text-sm group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-medical-700">Hospital 1 (St. Jude)</div>
                      <div className="text-xs text-slate-500">520 records • Acc: {hospitals.hosp1.currentAccuracy}%</div>
                    </div>
                    {hospitals.hosp1.updateSentToGlobal && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">Sent</span>
                    )}
                  </button>

                  <button
                    onClick={() => { navigateTo('hosp2'); setShowHospitalMenu(false); }}
                    className="w-full text-left px-3 py-2.5 hover:bg-medical-50 flex items-center justify-between text-sm group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-medical-700">Hospital 2 (Metropolitan)</div>
                      <div className="text-xs text-slate-500">440 records • Acc: {hospitals.hosp2.currentAccuracy}%</div>
                    </div>
                    {hospitals.hosp2.updateSentToGlobal && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">Sent</span>
                    )}
                  </button>

                  <button
                    onClick={() => { navigateTo('hosp3'); setShowHospitalMenu(false); }}
                    className="w-full text-left px-3 py-2.5 hover:bg-medical-50 flex items-center justify-between text-sm group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-medical-700">Hospital 3 (Apex)</div>
                      <div className="text-xs text-slate-500">480 records • Acc: {hospitals.hosp3.currentAccuracy}%</div>
                    </div>
                    {hospitals.hosp3.updateSentToGlobal && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">Sent</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Global Model Server Tab */}
            <button
              onClick={() => navigateTo('global')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'global'
                  ? 'bg-medical-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Global Server (FedAvg)</span>
              {pendingUpdatesCount > 0 && (
                <span className="ml-1 bg-amber-400 text-amber-950 font-bold text-xs px-1.5 py-0.2 rounded-full">
                  {pendingUpdatesCount}/3
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Direct Project Download Button */}
            <a
              href="/Major_Project_source.zip"
              download="Major_Project_source.zip"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-medical-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-all"
              title="Download full project folder as a ZIP archive"
            >
              <Download className="w-3.5 h-3.5 text-medical-600" />
              <span className="hidden sm:inline">Download ZIP</span>
            </a>

            {/* Quick 1-Click Simulation Button */}
            <button
              onClick={runFullSimulation}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-medical-600 to-teal-600 text-white text-xs font-semibold shadow-sm hover:from-medical-700 hover:to-teal-700 active:scale-95 transition-all"
              title="Runs an automated 10-step Federated Learning loop for demonstration"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Full FL Cycle</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-medical-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div 
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setShowNotifications(false)}
                >
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-800">System Activity & Audit Log</span>
                    <span className="text-xs text-slate-400">{notifications.length} events</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map(n => (
                      <div key={n.id} className="p-3 text-xs hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between font-semibold text-slate-800">
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                            <span>{n.title}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enclave Security Status Badge */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
