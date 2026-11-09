import React, { useState, useRef } from 'react';
import { useFederatedLearning } from '../../context/FederatedLearningContext';
import { parseCSV, generateSampleCSV, downloadCSVFile } from '../../utils/csvParser';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Layers, 
  ShieldCheck, 
  Database,
  BarChart2,
  FileCheck,
  Search,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const DatasetManagement = ({ hospId }) => {
  const { hospitals, uploadHospitalDataset, addNotification } = useFederatedLearning();
  const hosp = hospitals[hospId];
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState('records'); // 'records' | 'quality' | 'distribution'

  if (!hosp) return null;

  // Handle CSV file selection and parsing
  const handleFileProcess = (file) => {
    setUploadError(null);
    if (!file) return;

    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setUploadError('Please select a valid CSV file (.csv)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsed = parseCSV(text);

        uploadHospitalDataset(hospId, {
          fileName: file.name,
          rowCount: parsed.totalRows,
          records: parsed.rows,
          detectedModalities: parsed.detectedModalities
        });

        addNotification(
          'Dataset Processed Successfully',
          `Parsed ${parsed.totalRows} patient records with quality score ${parsed.qualityScore}%. Data stored in ${hosp.code} local enclave.`,
          'success'
        );
      } catch (err) {
        setUploadError(`Failed to parse CSV: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadSample = () => {
    const csvData = generateSampleCSV(hosp.code);
    downloadCSVFile(csvData, `${hosp.code}_multimodal_dataset_template.csv`);
    addNotification('Template Downloaded', `Sample dataset template downloaded for ${hosp.name}.`, 'info');
  };

  // Filter records by search term
  const filteredRecords = (hosp.sampleRecords || []).filter(r => 
    Object.values(r).some(val => String(val).toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const COLORS = ['#0ea5e9', '#14b8a6', '#6366f1', '#f59e0b', '#ec4899'];

  return (
    <div className="space-y-6">
      
      {/* Header with Title and Download Template button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Database className="w-5 h-5 text-medical-600" />
            <span>Patient Dataset Management</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage private patient records for {hosp.name} ({hosp.code}). Data strictly quarantined in local enclave.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadSample}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download CSV Template</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-medical-600 text-white font-semibold text-xs hover:bg-medical-700 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New CSV</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => e.target.files && handleFileProcess(e.target.files[0])}
          />
        </div>
      </div>

      {/* CSV Drag and Drop Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-medical-500 bg-medical-50/70 scale-[1.01]'
            : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400'
        }`}
      >
        <div className="max-w-md mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-medical-100 text-medical-600 mx-auto flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Drag and drop hospital CSV dataset here, or click to browse
          </h3>
          <p className="text-xs text-slate-500">
            Accepts CSV format with Medical Images metadata, Clinical Biomarkers, and Clinical Text notes.
          </p>
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Encrypted local storage only — Zero network transmission</span>
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Patient Records</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{hosp.totalRecords}</div>
          <span className="text-[11px] text-teal-700 font-medium">Loaded in local enclave</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Data Completeness</span>
          <div className="text-2xl font-bold text-teal-700 mt-1">{hosp.qualityStats.completeness}%</div>
          <span className="text-[11px] text-slate-500">{hosp.qualityStats.missingValuesPercent}% missing handled</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Active Modalities</span>
          <div className="text-2xl font-bold text-indigo-700 mt-1">3 of 3</div>
          <span className="text-[11px] text-slate-500">Images, Clinical, Text</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Preprocessing Status</span>
          <div className="text-sm font-bold text-emerald-700 mt-1 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
            <span>Standardized & Ready</span>
          </div>
          <span className="text-[11px] text-slate-500">{hosp.qualityStats.validationSplit}</span>
        </div>

      </div>

      {/* Dataset Distribution & Quality Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Diagnostic Distribution Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-medical-600" />
            <span>Diagnostic Class Distribution</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">Patient cohort partition across diagnosed pathology categories</p>
          
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hosp.distribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-10} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val, name, props) => [`${val} patients (${props.payload.percentage}%)`, 'Count']} />
                <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multimodal Data Quality & Imputation Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-teal-600" />
              <span>Data Quality & Pipeline Validation</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Automated checks applied during dataset ingestion</p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Missing Values Handled</div>
                  <div className="text-[11px] text-slate-500">Method: {hosp.qualityStats.imputationMethod}</div>
                </div>
                <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 rounded bg-emerald-50">
                  {hosp.qualityStats.missingValuesPercent}% missing
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Outliers Sanitized</div>
                  <div className="text-[11px] text-slate-500">Statistical bounds check (3-sigma clipping)</div>
                </div>
                <span className="text-xs font-bold text-slate-700 px-2 py-0.5 rounded bg-slate-200">
                  {hosp.qualityStats.outliersHandled} outliers
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Multimodal Token Alignment</div>
                  <div className="text-[11px] text-slate-500">All modalities aligned by Patient ID hash</div>
                </div>
                <span className="text-xs font-bold text-teal-700 px-2 py-0.5 rounded bg-teal-50">
                  100% Synced
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Validation Split: {hosp.qualityStats.validationSplit}</span>
            <span className="text-teal-700 font-semibold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Protected Local Enclave
            </span>
          </div>
        </div>

      </div>

      {/* Patient Data Records Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Local Patient Records (Preview)</h3>
            <p className="text-xs text-slate-500">Inspecting private clinical cohort data inside {hosp.name}</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search records by ID, diagnosis, vitals..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-3">Demographics</th>
                <th className="py-3 px-3">Vitals (BP/HR)</th>
                <th className="py-3 px-3">Troponin I</th>
                <th className="py-3 px-3">BNP (pg/mL)</th>
                <th className="py-3 px-3">Image Modality</th>
                <th className="py-3 px-4">Clinical Notes & Findings</th>
                <th className="py-3 px-4">Diagnosis</th>
                <th className="py-3 px-3">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {filteredRecords.map((r, i) => (
                <tr key={r.id || i} className="hover:bg-medical-50/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900">{r.id}</td>
                  <td className="py-3 px-3">{r.age}y / {r.gender}</td>
                  <td className="py-3 px-3 font-mono">{r.bp} ({r.hr} bpm)</td>
                  <td className="py-3 px-3 font-mono font-medium">{r.troponin} ng/mL</td>
                  <td className="py-3 px-3 font-mono">{r.bnp}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-medical-50 text-medical-800 font-medium text-[11px] border border-medical-200/60">
                      {r.imageModality}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-600" title={r.clinicalNote}>
                    {r.clinicalNote}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{r.diagnosis}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      r.severity === 'Severe' ? 'bg-amber-100 text-amber-700' :
                      r.severity === 'Moderate' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {r.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filteredRecords.length} of {hosp.totalRecords} records</span>
          <span className="text-[11px] text-slate-400">Previewing first batch stored in secure local memory</span>
        </div>
      </div>

    </div>
  );
};
