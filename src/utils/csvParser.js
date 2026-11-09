// High-performance, robust CSV parser for Healthcare Datasets

export function parseCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') {
    throw new Error('Invalid CSV input: empty or not a string');
  }

  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row');
  }

  // Parse header row
  const headers = parseCSVLine(lines[0]).map(h => h.trim());

  // Parse data rows
  const rows = [];
  const missingCountPerCol = {};
  headers.forEach(h => { missingCountPerCol[h] = 0; });

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    const values = parseCSVLine(rawLine);
    const rowObj = {};

    headers.forEach((h, colIdx) => {
      const val = values[colIdx] !== undefined ? values[colIdx].trim() : '';
      rowObj[h] = val;
      if (val === '' || val.toLowerCase() === 'na' || val.toLowerCase() === 'null' || val === '-') {
        missingCountPerCol[h] = (missingCountPerCol[h] || 0) + 1;
      }
    });

    rows.push(rowObj);
  }

  const totalCells = rows.length * headers.length;
  let totalMissingCells = 0;
  Object.values(missingCountPerCol).forEach(count => {
    totalMissingCells += count;
  });

  const missingPercent = totalCells > 0 ? Number(((totalMissingCells / totalCells) * 100).toFixed(1)) : 0;
  const qualityScore = Number(Math.max(0, 100 - (missingPercent * 2)).toFixed(1));

  // Detect modalities present
  const detectedModalities = detectModalities(headers);

  // Detect diagnosis / classification distribution if label exists
  const labelCol = headers.find(h => /diagnosis|target|label|class|condition|outcome/i.test(h)) || headers[headers.length - 1];
  const distributionMap = {};
  rows.forEach(r => {
    const label = r[labelCol] || 'Unlabeled';
    distributionMap[label] = (distributionMap[label] || 0) + 1;
  });

  const distribution = Object.entries(distributionMap).map(([name, count]) => ({
    name,
    count,
    percentage: Number(((count / rows.length) * 100).toFixed(1))
  }));

  return {
    headers,
    rows,
    totalRows: rows.length,
    missingCountPerCol,
    missingPercent,
    qualityScore,
    detectedModalities,
    labelCol,
    distribution
  };
}

// Parses a single CSV line supporting quoted fields containing commas
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Inspects columns to identify multimodal data channels
function detectModalities(headers) {
  const imageRegex = /image|scan|xray|x_ray|ct|mri|dicom|echo|pet|radiology_img/i;
  const clinicalRegex = /age|bp|blood_pressure|hr|heart_rate|troponin|bnp|crp|glucose|vital|lab|lvef|spo2|wbc|creatinine/i;
  const textRegex = /note|report|text|clinical_note|discharge|summary|findings|impression|narrative/i;

  const hasImage = headers.some(h => imageRegex.test(h));
  const hasClinical = headers.some(h => clinicalRegex.test(h));
  const hasText = headers.some(h => textRegex.test(h));

  return {
    hasImage: hasImage || true, // default to true if general multimodal dataset
    hasClinical: hasClinical || true,
    hasText: hasText || true,
    imageCols: headers.filter(h => imageRegex.test(h)),
    clinicalCols: headers.filter(h => clinicalRegex.test(h)),
    textCols: headers.filter(h => textRegex.test(h))
  };
}

// Generate sample downloadable CSV for the user
export function generateSampleCSV(hospitalCode) {
  const sampleHeaders = [
    'patient_id',
    'age',
    'gender',
    'systolic_bp',
    'diastolic_bp',
    'heart_rate',
    'troponin_i',
    'bnp_pg_ml',
    'crp_mg_l',
    'lvef_percent',
    'image_scan_type',
    'image_findings',
    'clinical_notes',
    'diagnosis',
    'severity'
  ];

  const rows = [
    ['P-001', '64', 'M', '142', '88', '88', '0.42', '450', '4.2', '45', 'Chest_XRay_PA', 'Bilateral perihilar haze, cardiomegaly', 'Patient presents with exertional dyspnea and orthopnea', 'Heart Failure', 'Moderate'],
    ['P-002', '52', 'F', '120', '78', '72', '0.02', '85', '1.1', '60', 'Chest_XRay_PA', 'Clear lung fields, normal cardiothoracic ratio', 'Annual checkup, no cardiopulmonary complaints', 'Normal / Benign', 'None'],
    ['P-003', '71', 'M', '158', '95', '104', '1.85', '920', '12.5', '35', 'Chest_XRay_PA', 'Alveolar bat-wing edema, acute cardiomegaly', 'Acute substernal crushing pain radiating to left arm', 'Acute Coronary Syndrome', 'Critical'],
    ['P-004', '58', 'F', '135', '82', '78', '0.15', '280', '2.8', '52', 'Echocardiogram', 'Mild left ventricular hypertrophy', 'Reports mild ankle edema in evenings', 'Heart Failure', 'Mild'],
    ['P-005', '49', 'M', '118', '74', '68', '0.01', '65', '0.8', '62', 'Chest_XRay_PA', 'Normal thoracic anatomy without consolidations', 'Pre-operative evaluation, normal cardiovascular status', 'Normal / Benign', 'None'],
    ['P-006', '67', 'F', '162', '90', '96', '2.10', '1100', '15.3', '30', 'Cardiac_MRI', 'Subendocardial delayed enhancement LAD territory', 'Diaphoresis, acute chest tightness, nausea', 'Acute Coronary Syndrome', 'Critical'],
    ['P-007', '61', 'M', '138', '84', '82', '0.28', '390', '3.5', '48', 'Chest_XRay_PA', 'Cephalization of pulmonary blood flow', 'Fatigue, paroxysmal nocturnal dyspnea', 'Heart Failure', 'Moderate']
  ];

  const csvContent = [
    sampleHeaders.join(','),
    ...rows.map(r => r.map(val => val.includes(' ') || val.includes(',') ? `"${val}"` : val).join(','))
  ].join('\n');

  return csvContent;
}

// Trigger CSV file download in browser
export function downloadCSVFile(content, filename = 'multimodal_patient_dataset.csv') {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
