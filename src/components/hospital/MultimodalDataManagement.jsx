import React, { useState } from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { 
  Layers, 
  FileText, 
  Image as ImageIcon, 
  Activity, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  BrainCircuit,
  Eye,
  Scan,
  Maximize2
} from 'lucide-react';

export const MultimodalDataManagement = ({ hospId }) => {
  const { hospitals } = useFederatedLearning();
  const hosp = hospitals[hospId];

  const [activeModality, setActiveModality] = useState('images'); // 'images' | 'clinical' | 'text' | 'fusion'
  const [selectedScan, setSelectedScan] = useState(0);

  if (!hosp) return null;

  // Realistic sample medical scan previews for the hospital
  const sampleScans = [
    {
      title: 'Chest Radiograph (PA View)',
      patientId: 'P-1001',
      type: 'X-Ray (Computed Radiography)',
      resolution: '224 x 224 x 3',
      findings: 'Cardiomegaly with bilateral perihilar bat-wing opacification; prominent pulmonary vascular pedicle.',
      featuresExtracted: '768-dim Vision Transformer Vector',
      confidence: '94.2%',
      aspect: 'AP/PA Thorax'
    },
    {
      title: 'Cardiac Magnetic Resonance (Short Axis Cine)',
      patientId: 'P-1003',
      type: 'Cardiac MRI (Late Gadolinium Enhancement)',
      resolution: '224 x 224 x 3',
      findings: 'Transmural delayed enhancement in anteroseptal segment; hypokinesis of apex.',
      featuresExtracted: '768-dim 3D CNN Latent Embedding',
      confidence: '96.5%',
      aspect: 'Left Ventricle View'
    },
    {
      title: 'High-Resolution Thoracic CT',
      patientId: 'P-1006',
      type: 'Chest CT (Axial Slice 48/120)',
      resolution: '224 x 224 x 3',
      findings: 'Subsegmental atelectasis and bilateral dependent pleural effusions.',
      featuresExtracted: '768-dim DenseNet Feature Tensor',
      confidence: '92.8%',
      aspect: 'Transverse Slice'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Layers className="w-5 h-5 text-medical-600" />
            <span>Multimodal Data Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Heterogeneous multimodal pipelines processed locally within {hosp.name}.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Local Feature Fusion • No Raw Exchange</span>
        </div>
      </div>

      {/* 3 Modalities Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Modality 1: Medical Images */}
        <div 
          onClick={() => setActiveModality('images')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeModality === 'images'
              ? 'bg-gradient-to-br from-medical-50 to-white border-medical-500 shadow-md ring-2 ring-medical-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-medical-100 text-medical-700 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Embedded
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm">1. Medical Images</h3>
          <p className="text-xs text-slate-500 mt-1">X-Rays, Cardiac MRIs, and CT Scans</p>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Backbone:</span>
              <span className="font-mono font-medium text-slate-800">{hosp.modalities.images.backbone}</span>
            </div>
            <div className="flex justify-between">
              <span>Latent Dim:</span>
              <span className="font-mono font-semibold text-medical-700">{hosp.modalities.images.embeddingDim}-d</span>
            </div>
            <div className="flex justify-between">
              <span>Processed:</span>
              <span className="font-medium text-slate-800">{hosp.modalities.images.count} Scans</span>
            </div>
          </div>
        </div>

        {/* Modality 2: Clinical Data */}
        <div 
          onClick={() => setActiveModality('clinical')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeModality === 'clinical'
              ? 'bg-gradient-to-br from-teal-50 to-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Normalized
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm">2. Clinical & Biomarkers</h3>
          <p className="text-xs text-slate-500 mt-1">Vitals, Troponin, BNP, Hemodynamics</p>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Backbone:</span>
              <span className="font-mono font-medium text-slate-800">{hosp.modalities.clinical.backbone}</span>
            </div>
            <div className="flex justify-between">
              <span>Latent Dim:</span>
              <span className="font-mono font-semibold text-teal-700">{hosp.modalities.clinical.embeddingDim}-d</span>
            </div>
            <div className="flex justify-between">
              <span>Features:</span>
              <span className="font-medium text-slate-800">8 Biomarkers</span>
            </div>
          </div>
        </div>

        {/* Modality 3: Textual Reports */}
        <div 
          onClick={() => setActiveModality('text')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeModality === 'text'
              ? 'bg-gradient-to-br from-indigo-50 to-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Tokenized
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm">3. Clinical Notes & Text</h3>
          <p className="text-xs text-slate-500 mt-1">Radiology Impressions, Doctor Consults</p>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Backbone:</span>
              <span className="font-mono font-medium text-slate-800">{hosp.modalities.text.backbone}</span>
            </div>
            <div className="flex justify-between">
              <span>Latent Dim:</span>
              <span className="font-mono font-semibold text-indigo-700">{hosp.modalities.text.embeddingDim}-d</span>
            </div>
            <div className="flex justify-between">
              <span>Token Length:</span>
              <span className="font-medium text-slate-800">256 Tokens</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Detail Explorer per Modality */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveModality('images')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeModality === 'images' ? 'bg-medical-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Medical Scans Inspector
          </button>
          <button
            onClick={() => setActiveModality('clinical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeModality === 'clinical' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Clinical Biomarkers Pipeline
          </button>
          <button
            onClick={() => setActiveModality('text')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeModality === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            BioBERT Tokenizer View
          </button>
          <button
            onClick={() => setActiveModality('fusion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeModality === 'fusion' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Cross-Attention Fusion Architecture
          </button>
        </div>

        {/* View 1: Medical Images */}
        {activeModality === 'images' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleScans.map((scan, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedScan(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedScan === idx
                      ? 'border-medical-500 bg-medical-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="h-40 rounded-lg bg-slate-950 flex flex-col items-center justify-center text-slate-300 relative overflow-hidden group">
                    <Scan className="w-12 h-12 text-medical-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono mt-2 text-slate-400">{scan.aspect}</span>
                    <div className="absolute top-2 right-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-teal-300">
                      {scan.resolution}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs mt-3">{scan.title}</h4>
                  <p className="text-[11px] text-slate-500">Patient: {scan.patientId} • {scan.type}</p>
                </div>
              ))}
            </div>

            {/* Selected Scan Details Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Vision Backbone Feature Extraction Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Extracted Vector:</span>
                  <span className="font-mono font-semibold text-medical-700">{sampleScans[selectedScan].featuresExtracted}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Model Confidence:</span>
                  <span className="font-semibold text-emerald-700">{sampleScans[selectedScan].confidence}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Automated Image Findings:</span>
                  <span className="text-slate-700">{sampleScans[selectedScan].findings}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Clinical Data */}
        {activeModality === 'clinical' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Normalized Laboratory & Vital Biomarkers (Tabular MLP Input)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Systolic Blood Pressure', mean: '138.4 mmHg', norm: 'z = +0.42' },
                { label: 'Heart Rate (Resting)', mean: '82.6 bpm', norm: 'z = +0.18' },
                { label: 'High-Sens Troponin I', mean: '0.45 ng/mL', norm: 'Log-scaled' },
                { label: 'Brain Natriuretic (BNP)', mean: '412 pg/mL', norm: 'Log-scaled' },
                { label: 'C-Reactive Protein (CRP)', mean: '4.8 mg/L', norm: 'Robust Scaler' },
                { label: 'Left Ventricular EF (%)', mean: '49.2%', norm: 'Min-Max [0, 1]' },
                { label: 'Patient Age', mean: '59.4 years', norm: 'Normalized' },
                { label: 'Hemodynamic Stability', mean: '98.2%', norm: 'Binary Class' }
              ].map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">{f.label}</span>
                  <span className="text-sm font-bold text-slate-800 mt-0.5 block">{f.mean}</span>
                  <span className="text-[10px] font-mono text-teal-700 mt-1 block">{f.norm}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs">
              <strong>Preprocessing Pipeline:</strong> Missing values imputed via Iterative KNN. Features scaled to zero-mean, unit-variance before feeding to 3-layer Tabular MLP yielding 128-d clinical representations.
            </div>
          </div>
        )}

        {/* View 3: Text Reports */}
        {activeModality === 'text' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Clinical BioBERT Tokenizer & Attention Head
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2">
              <div className="text-teal-400">// Raw Clinical Input Note</div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                "Patient admitted through ER complaining of retrosternal heaviness and acute exertional dyspnea. Initial ECG revealed 2mm ST-elevation in V2-V4. Emergency troponin elevated at 1.85 ng/mL. Cardiology consult initiated."
              </p>
              <div className="text-teal-400 pt-2">// Tokenized BioBERT Subword Representation (First 16 Tokens)</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['[CLS]', 'patient', 'admitted', 'through', 'er', 'complaining', 'of', 'retro', '##sternal', 'heaviness', 'and', 'acute', 'exert', '##ional', 'dyspnea', '[SEP]'].map((tok, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700 text-[11px]">
                    {tok}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs">
              <strong>NLP Architecture:</strong> Clinical BioBERT pretrained on MIMIC-III and PubMed. Sequence max length = 256. Pooling layer extracts 768-d semantic representation for cross-attention multimodal fusion.
            </div>
          </div>
        )}

        {/* View 4: Fusion Architecture */}
        {activeModality === 'fusion' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Cross-Attention Multimodal Transformer Architecture
            </h4>
            <div className="p-5 rounded-2xl bg-gradient-to-r from-medical-900 via-slate-900 to-teal-950 text-white space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="text-[11px] text-medical-300 font-mono">Image Features</span>
                  <div className="text-lg font-bold font-mono">[B, 768]</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="text-[11px] text-teal-300 font-mono">Clinical Features</span>
                  <div className="text-lg font-bold font-mono">[B, 128]</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="text-[11px] text-indigo-300 font-mono">Text Features</span>
                  <div className="text-lg font-bold font-mono">[B, 768]</div>
                </div>
              </div>

              <div className="text-center py-2">
                <div className="inline-block px-4 py-2 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-mono">
                  ↓ Cross-Attention Fusion Layer: Attention(Q=Text, K=Images, V=Images) ⊕ Gated(Clinical) ↓
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="font-semibold text-slate-200">Joint Multimodal Latent Space:</span>
                  <p className="text-slate-400 mt-1 font-mono text-[11px]">[Batch_Size, 512] Dense Layer with GELU & LayerNorm</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="font-semibold text-slate-200">Diagnostic Classification Head:</span>
                  <p className="text-slate-400 mt-1 font-mono text-[11px]">Softmax Output: Normal (0), Heart Failure (1), ACS (2)</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
