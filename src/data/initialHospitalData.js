// Comprehensive initial data for the 3 Hospitals and Global Server

export const INITIAL_HOSPITALS = {
  hosp1: {
    id: 'hosp1',
    code: 'HOSP-01',
    name: 'St. Jude Memorial Hospital',
    specialty: 'Cardiovascular & Thoracic Medicine',
    location: 'Boston, MA',
    enclaveId: 'ENCLAVE-SJMH-US-EAST',
    connectionStatus: 'Online',
    totalRecords: 520,
    trainingStatus: 'Ready', // 'Idle' | 'Training' | 'Trained' | 'Sending' | 'Sent'
    localModelStatus: 'Initialized',
    currentAccuracy: 81.4,
    currentLoss: 0.382,
    precision: 0.825,
    recall: 0.803,
    f1Score: 0.814,
    aucRoc: 0.887,
    modelVersion: 'H1-Weights-v1.0',
    globalModelVersion: 'GLOBAL-MFL-v1.0',
    lastSyncTime: '2026-11-07 10:15 AM',
    localRoundsCompleted: 1,
    updatesSentCount: 1,
    updateSentToGlobal: false,
    updatePendingValidation: false,
    syncStatus: 'Up to Date', // 'Up to Date' | 'Update Available' | 'Syncing'
    modalities: {
      images: {
        name: 'Medical Images (Chest X-Ray & Echo)',
        count: 520,
        status: 'Processed & Embedded',
        dimension: '224x224x3',
        backbone: 'ResNet-50 / Vision Transformer',
        embeddingDim: 768,
        active: true
      },
      clinical: {
        name: 'Clinical Vitals & Lab Biomarkers',
        count: 520,
        status: 'Normalized & Scaled',
        features: ['Age', 'Systolic BP', 'Diastolic BP', 'Heart Rate', 'Troponin I (ng/mL)', 'BNP (pg/mL)', 'CRP (mg/L)', 'LVEF (%)'],
        backbone: 'Tabular MLP / Feature Tokenizer',
        embeddingDim: 128,
        active: true
      },
      text: {
        name: 'Radiology Reports & Clinical Notes',
        count: 520,
        status: 'Tokenized & Encoded',
        tokenLength: 256,
        backbone: 'Clinical BioBERT',
        embeddingDim: 768,
        active: true
      }
    },
    qualityStats: {
      completeness: 99.2,
      missingValuesPercent: 0.8,
      outliersHandled: 12,
      imputationMethod: 'KNN & Median Imputation',
      validationSplit: '80% Train / 20% Val'
    },
    // Sample detailed records for table preview
    sampleRecords: [
      { id: 'P-1001', age: 64, gender: 'Male', bp: '142/88', hr: 88, troponin: 0.42, bnp: 450, crp: 4.2, lvef: 45, imageModality: 'Chest X-Ray (PA)', clinicalNote: 'Bilateral mild pleural effusion, left ventricular enlargement noted.', diagnosis: 'Heart Failure', severity: 'Moderate' },
      { id: 'P-1002', age: 52, gender: 'Female', bp: '120/78', hr: 72, troponin: 0.02, bnp: 85, crp: 1.1, lvef: 60, imageModality: 'Chest X-Ray (AP)', clinicalNote: 'Clear lung fields without focal consolidation or pulmonary edema.', diagnosis: 'Normal / Benign', severity: 'None' },
      { id: 'P-1003', age: 71, gender: 'Male', bp: '158/95', hr: 104, troponin: 1.85, bnp: 920, crp: 12.5, lvef: 35, imageModality: 'Chest X-Ray (PA)', clinicalNote: 'Acute cardiomegaly with alveolar edema pattern in bat-wing distribution.', diagnosis: 'Acute Coronary Syndrome', severity: 'Critical' },
      { id: 'P-1004', age: 58, gender: 'Female', bp: '135/82', hr: 78, troponin: 0.15, bnp: 280, crp: 2.8, lvef: 52, imageModality: 'Echocardiogram', clinicalNote: 'Mild aortic regurgitation with preserved ejection fraction.', diagnosis: 'Heart Failure', severity: 'Mild' },
      { id: 'P-1005', age: 49, gender: 'Male', bp: '118/74', hr: 68, troponin: 0.01, bnp: 65, crp: 0.8, lvef: 62, imageModality: 'Chest X-Ray (PA)', clinicalNote: 'Normal cardiothoracic silhouette. No acute cardiopulmonary abnormality.', diagnosis: 'Normal / Benign', severity: 'None' },
      { id: 'P-1006', age: 67, gender: 'Female', bp: '162/90', hr: 96, troponin: 2.10, bnp: 1100, crp: 15.3, lvef: 30, imageModality: 'Cardiac MRI', clinicalNote: 'Subendocardial hyperenhancement consistent with acute infarction.', diagnosis: 'Acute Coronary Syndrome', severity: 'Critical' },
      { id: 'P-1007', age: 61, gender: 'Male', bp: '138/84', hr: 82, troponin: 0.28, bnp: 390, crp: 3.5, lvef: 48, imageModality: 'Chest X-Ray (PA)', clinicalNote: 'Cardiomegaly with cephalization of pulmonary vasculature.', diagnosis: 'Heart Failure', severity: 'Moderate' },
      { id: 'P-1008', age: 45, gender: 'Female', bp: '115/72', hr: 65, troponin: 0.01, bnp: 50, crp: 0.5, lvef: 65, imageModality: 'Chest X-Ray (PA)', clinicalNote: 'Unremarkable chest radiography. Diaphragmatic contours smooth.', diagnosis: 'Normal / Benign', severity: 'None' }
    ],
    trainingHistory: [
      { epoch: 1, loss: 0.612, accuracy: 72.5, valLoss: 0.598, valAccuracy: 74.2 },
      { epoch: 2, loss: 0.524, accuracy: 76.8, valLoss: 0.501, valAccuracy: 77.5 },
      { epoch: 3, loss: 0.448, accuracy: 80.1, valLoss: 0.435, valAccuracy: 79.8 },
      { epoch: 4, loss: 0.392, accuracy: 82.4, valLoss: 0.410, valAccuracy: 80.9 },
      { epoch: 5, loss: 0.345, accuracy: 84.7, valLoss: 0.382, valAccuracy: 81.4 }
    ],
    distribution: [
      { name: 'Normal / Benign', count: 180, percentage: 34.6 },
      { name: 'Heart Failure', count: 210, percentage: 40.4 },
      { name: 'Acute Coronary Syndrome', count: 130, percentage: 25.0 }
    ]
  },

  hosp2: {
    id: 'hosp2',
    code: 'HOSP-02',
    name: 'Metropolitan General Hospital',
    specialty: 'Thoracic & Pulmonary Critical Care',
    location: 'Chicago, IL',
    enclaveId: 'ENCLAVE-MGH-US-CENTRAL',
    connectionStatus: 'Online',
    totalRecords: 440,
    trainingStatus: 'Ready',
    localModelStatus: 'Initialized',
    currentAccuracy: 79.6,
    currentLoss: 0.418,
    precision: 0.801,
    recall: 0.785,
    f1Score: 0.793,
    aucRoc: 0.865,
    modelVersion: 'H2-Weights-v1.0',
    globalModelVersion: 'GLOBAL-MFL-v1.0',
    lastSyncTime: '2026-11-07 10:18 AM',
    localRoundsCompleted: 1,
    updatesSentCount: 1,
    updateSentToGlobal: false,
    updatePendingValidation: false,
    syncStatus: 'Up to Date',
    modalities: {
      images: {
        name: 'Medical Images (Thoracic CT & X-Ray)',
        count: 440,
        status: 'Processed & Embedded',
        dimension: '224x224x3',
        backbone: 'DenseNet-121 / 3D CNN',
        embeddingDim: 768,
        active: true
      },
      clinical: {
        name: 'Clinical Vitals & Blood Gases',
        count: 440,
        status: 'Normalized & Scaled',
        features: ['Age', 'PaO2/FiO2', 'SpO2 (%)', 'D-Dimer (ug/mL)', 'Ferritin (ng/mL)', 'Respiratory Rate', 'WBC (x10^3/uL)'],
        backbone: 'Tabular MLP / Feature Tokenizer',
        embeddingDim: 128,
        active: true
      },
      text: {
        name: 'Pulmonology Notes & ICU Discharge',
        count: 440,
        status: 'Tokenized & Encoded',
        tokenLength: 256,
        backbone: 'Clinical BioBERT',
        embeddingDim: 768,
        active: true
      }
    },
    qualityStats: {
      completeness: 98.7,
      missingValuesPercent: 1.3,
      outliersHandled: 16,
      imputationMethod: 'MICE Imputation',
      validationSplit: '80% Train / 20% Val'
    },
    sampleRecords: [
      { id: 'P-2001', age: 68, gender: 'Male', bp: '138/85', hr: 92, troponin: 0.18, bnp: 310, crp: 8.4, lvef: 50, imageModality: 'Thoracic CT', clinicalNote: 'Diffuse ground-glass opacities with dependent consolidation in lower lobes.', diagnosis: 'Pulmonary Pathologies', severity: 'Severe' },
      { id: 'P-2002', age: 44, gender: 'Female', bp: '116/74', hr: 70, troponin: 0.01, bnp: 45, crp: 0.7, lvef: 65, imageModality: 'Chest X-Ray', clinicalNote: 'Clear parenchyma, sharp costophrenic angles, normal mediastinal contours.', diagnosis: 'Normal / Benign', severity: 'None' },
      { id: 'P-2003', age: 73, gender: 'Male', bp: '150/92', hr: 98, troponin: 0.85, bnp: 780, crp: 11.2, lvef: 38, imageModality: 'Thoracic CT', clinicalNote: 'Submassive pulmonary arterial filling defects with right ventricular strain.', diagnosis: 'Acute Cardiopulmonary Event', severity: 'Critical' },
      { id: 'P-2004', age: 59, gender: 'Female', bp: '130/80', hr: 76, troponin: 0.12, bnp: 240, crp: 3.1, lvef: 55, imageModality: 'Chest X-Ray', clinicalNote: 'Mild peribronchial thickening, no overt pleural effusion.', diagnosis: 'Pulmonary Pathologies', severity: 'Moderate' },
      { id: 'P-2005', age: 50, gender: 'Male', bp: '122/78', hr: 72, troponin: 0.02, bnp: 90, crp: 1.2, lvef: 60, imageModality: 'Chest X-Ray', clinicalNote: 'Normal cardiac size and pulmonary vascularity within normal limits.', diagnosis: 'Normal / Benign', severity: 'None' },
      { id: 'P-2006', age: 65, gender: 'Female', bp: '144/88', hr: 88, troponin: 0.45, bnp: 520, crp: 6.8, lvef: 46, imageModality: 'Thoracic CT', clinicalNote: 'Patchy bilateral consolidations and interlobular septal thickening.', diagnosis: 'Pulmonary Pathologies', severity: 'Severe' }
    ],
    trainingHistory: [
      { epoch: 1, loss: 0.655, accuracy: 70.1, valLoss: 0.620, valAccuracy: 72.8 },
      { epoch: 2, loss: 0.562, accuracy: 74.5, valLoss: 0.540, valAccuracy: 75.6 },
      { epoch: 3, loss: 0.490, accuracy: 78.0, valLoss: 0.478, valAccuracy: 77.9 },
      { epoch: 4, loss: 0.435, accuracy: 80.9, valLoss: 0.442, valAccuracy: 78.9 },
      { epoch: 5, loss: 0.388, accuracy: 82.5, valLoss: 0.418, valAccuracy: 79.6 }
    ],
    distribution: [
      { name: 'Normal / Benign', count: 155, percentage: 35.2 },
      { name: 'Pulmonary Pathologies', count: 185, percentage: 42.0 },
      { name: 'Acute Cardiopulmonary Event', count: 100, percentage: 22.8 }
    ]
  },

  hosp3: {
    id: 'hosp3',
    code: 'HOSP-03',
    name: 'Apex Health Research Institute',
    specialty: 'Emergency Critical Care & Multimodal AI',
    location: 'San Francisco, CA',
    enclaveId: 'ENCLAVE-AHRI-US-WEST',
    connectionStatus: 'Online',
    totalRecords: 480,
    trainingStatus: 'Ready',
    localModelStatus: 'Initialized',
    currentAccuracy: 82.8,
    currentLoss: 0.364,
    precision: 0.838,
    recall: 0.819,
    f1Score: 0.828,
    aucRoc: 0.899,
    modelVersion: 'H3-Weights-v1.0',
    globalModelVersion: 'GLOBAL-MFL-v1.0',
    lastSyncTime: '2026-11-07 10:20 AM',
    localRoundsCompleted: 1,
    updatesSentCount: 1,
    updateSentToGlobal: false,
    updatePendingValidation: false,
    syncStatus: 'Up to Date',
    modalities: {
      images: {
        name: 'Medical Images (Cardiac MRI & CT Angio)',
        count: 480,
        status: 'Processed & Embedded',
        dimension: '224x224x3',
        backbone: 'Swin Transformer / 3D ResNet',
        embeddingDim: 768,
        active: true
      },
      clinical: {
        name: 'Emergency Biomarkers & Hemodynamics',
        count: 480,
        status: 'Normalized & Scaled',
        features: ['Age', 'MAP (mmHg)', 'Heart Rate', 'High-Sens Troponin T', 'Lactate (mmol/L)', 'Creatinine (mg/dL)', 'BNP'],
        backbone: 'Tabular MLP / Feature Tokenizer',
        embeddingDim: 128,
        active: true
      },
      text: {
        name: 'Emergency Triage & Consultation Notes',
        count: 480,
        status: 'Tokenized & Encoded',
        tokenLength: 256,
        backbone: 'Clinical BioBERT',
        embeddingDim: 768,
        active: true
      }
    },
    qualityStats: {
      completeness: 99.5,
      missingValuesPercent: 0.5,
      outliersHandled: 9,
      imputationMethod: 'Iterative SVD Imputation',
      validationSplit: '80% Train / 20% Val'
    },
    sampleRecords: [
      { id: 'P-3001', age: 56, gender: 'Male', bp: '146/90', hr: 84, troponin: 0.65, bnp: 580, crp: 5.6, lvef: 42, imageModality: 'Cardiac MRI', clinicalNote: 'Delayed gadolinium enhancement in lateral myocardial wall.', diagnosis: 'Myocardial Dysfunction', severity: 'Severe' },
      { id: 'P-3002', age: 48, gender: 'Female', bp: '124/76', hr: 68, troponin: 0.02, bnp: 75, crp: 0.9, lvef: 62, imageModality: 'CT Angiography', clinicalNote: 'Patent coronaries without hemodynamically significant stenosis.', diagnosis: 'Normal / Benign', severity: 'None' },
      { id: 'P-3003', age: 69, gender: 'Male', bp: '165/98', hr: 110, troponin: 2.45, bnp: 1250, crp: 18.2, lvef: 28, imageModality: 'Cardiac MRI', clinicalNote: 'Transmural infarction anterior wall with akinesis of apex.', diagnosis: 'Acute Coronary Syndrome', severity: 'Critical' },
      { id: 'P-3004', age: 62, gender: 'Female', bp: '132/84', hr: 80, troponin: 0.22, bnp: 320, crp: 3.8, lvef: 50, imageModality: 'Echocardiogram', clinicalNote: 'Mild diastolic dysfunction, left atrial volume index moderately elevated.', diagnosis: 'Myocardial Dysfunction', severity: 'Moderate' },
      { id: 'P-3005', age: 39, gender: 'Male', bp: '118/72', hr: 64, troponin: 0.01, bnp: 40, crp: 0.4, lvef: 64, imageModality: 'CT Angiography', clinicalNote: 'Normal ventricular dimensions and normal wall thickness.', diagnosis: 'Normal / Benign', severity: 'None' }
    ],
    trainingHistory: [
      { epoch: 1, loss: 0.590, accuracy: 74.2, valLoss: 0.570, valAccuracy: 75.8 },
      { epoch: 2, loss: 0.498, accuracy: 78.4, valLoss: 0.480, valAccuracy: 78.9 },
      { epoch: 3, loss: 0.420, accuracy: 82.1, valLoss: 0.415, valAccuracy: 81.0 },
      { epoch: 4, loss: 0.365, accuracy: 84.6, valLoss: 0.380, valAccuracy: 82.2 },
      { epoch: 5, loss: 0.320, accuracy: 86.8, valLoss: 0.364, valAccuracy: 82.8 }
    ],
    distribution: [
      { name: 'Normal / Benign', count: 172, percentage: 35.8 },
      { name: 'Myocardial Dysfunction', count: 188, percentage: 39.2 },
      { name: 'Acute Coronary Syndrome', count: 120, percentage: 25.0 }
    ]
  }
};

export const INITIAL_GLOBAL_MODEL = {
  version: 'GLOBAL-MFL-v1.0',
  currentRound: 1,
  globalAccuracy: 83.2,
  globalLoss: 0.354,
  precision: 0.841,
  recall: 0.825,
  f1Score: 0.833,
  aucRoc: 0.902,
  totalHospitals: 3,
  onlineHospitals: 3,
  aggregationAlgorithm: 'FedAvg (Federated Averaging)',
  aggregationFormula: 'W_{t+1} = \\sum_{k=1}^K \\frac{n_k}{N} W_k^{t+1}',
  lastAggregationTime: '2026-11-07 10:25 AM',
  totalAggregations: 1,
  status: 'Ready for Round 2',
  distributionStatus: {
    hosp1: { distributed: true, acknowledged: true, time: '2026-11-07 10:26 AM' },
    hosp2: { distributed: true, acknowledged: true, time: '2026-11-07 10:26 AM' },
    hosp3: { distributed: true, acknowledged: true, time: '2026-11-07 10:26 AM' }
  },
  roundHistory: [
    {
      round: 1,
      version: 'GLOBAL-MFL-v1.0',
      participatingHospitals: ['HOSP-01 (St. Jude)', 'HOSP-02 (Metropolitan)', 'HOSP-03 (Apex)'],
      totalRecords: 1440,
      weightsReceived: 3,
      accuracy: 83.2,
      loss: 0.354,
      f1Score: 0.833,
      timestamp: '2026-11-07 10:25 AM',
      status: 'Completed & Distributed'
    }
  ],
  accuracyConvergence: [
    { round: 'Init (R0)', global: 68.0, hosp1: 65.2, hosp2: 63.8, hosp3: 67.1 },
    { round: 'Round 1', global: 83.2, hosp1: 81.4, hosp2: 79.6, hosp3: 82.8 }
  ],
  modalityAblation: [
    { name: 'Images Only (CNN/ViT)', accuracy: 74.2, f1: 0.735 },
    { name: 'Clinical Only (MLP)', accuracy: 71.8, f1: 0.709 },
    { name: 'Text Reports (BioBERT)', accuracy: 73.5, f1: 0.728 },
    { name: 'Images + Clinical', accuracy: 78.6, f1: 0.781 },
    { name: 'Full Multimodal Fusion', accuracy: 83.2, f1: 0.833 }
  ],
  securityLogs: [
    { id: 1, timestamp: '2026-11-07 10:22:15', event: 'Incoming Parameter Update', client: 'HOSP-01', payloadSize: '54.2 MB', dataShared: '0 Bytes (Weights Only)', status: 'Verified TLS 1.3' },
    { id: 2, timestamp: '2026-11-07 10:23:02', event: 'Incoming Parameter Update', client: 'HOSP-02', payloadSize: '54.2 MB', dataShared: '0 Bytes (Weights Only)', status: 'Verified TLS 1.3' },
    { id: 3, timestamp: '2026-11-07 10:23:44', event: 'Incoming Parameter Update', client: 'HOSP-03', payloadSize: '54.2 MB', dataShared: '0 Bytes (Weights Only)', status: 'Verified TLS 1.3' },
    { id: 4, timestamp: '2026-11-07 10:25:00', event: 'FedAvg Aggregation Completed', client: 'Central Server', payloadSize: 'Compiled 14.2M params', dataShared: '0 Bytes Raw Patient Data', status: 'Model Version GLOBAL-MFL-v1.0' },
    { id: 5, timestamp: '2026-11-07 10:26:10', event: 'Global Weights Distributed', client: 'Broadcast to 3 Nodes', payloadSize: '54.2 MB encrypted', dataShared: 'Zero-Knowledge Verified', status: 'Broadcast Success' }
  ]
};
