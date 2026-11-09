# Multimodal Federated Learning (MFL) for Healthcare

A modern, professional, interactive web application demonstrating decentralized, privacy-preserving collaborative artificial intelligence across three independent hospital clients and a central Federated Averaging (FedAvg) aggregation server.

---

## 🏥 Architecture Overview

In clinical AI, aggregating raw patient data in a single central repository introduces severe patient privacy, regulatory (HIPAA / GDPR), and institutional risks. 

**Multimodal Federated Learning (MFL)** solves this by keeping patient records strictly inside each hospital's local enclave. Instead of transmitting patient records, each hospital:
1. Locally preprocesses and trains its own neural network on its private multimodal data.
2. Extracts parameter gradients ($\Delta W$) and injects differential privacy Gaussian noise.
3. Transmits only model parameters to the Global Model Server over TLS 1.3.
4. The Global Server aggregates the parameters using **Federated Averaging (FedAvg)**:
   $$W_{t+1} = \sum_{k=1}^K \frac{n_k}{N} W_k^{t+1}$$
5. The updated Global Model is distributed back to all three hospitals, boosting local diagnostic generalization without a single byte of patient records ever leaving hospital boundaries.

---

## 🖥️ Four Core Dashboards

### 1. Landing Page (`/`)
- System overview and high-level KPIs (Total participating nodes, Total combined cohort size, Global accuracy, Zero raw data guarantee).
- **Four Dashboard Cards** providing 1-click access to Hospital 1, Hospital 2, Hospital 3, and the Global Server.
- Visual interactive 10-step Federated Learning workflow.
- **1-Click FL Simulation Button**: Demonstrates the full 10-step end-to-end cycle automatically.

### 2. Hospital 1 Dashboard (`HOSP-01` - St. Jude Memorial Hospital)
- **Specialization**: Cardiovascular & Thoracic Medicine (Boston, MA)
- **Dataset**: 520 private patient records (Chest X-Rays, Echocardiograms, Troponin I, BNP, CRP, Clinical notes).
- **Enclave**: `ENCLAVE-SJMH-US-EAST`
- **Tabs**: Overview, Patient Dataset, Multimodal Data, Local Training, Model Updates, Global Synchronization, Reports & Audit.

### 3. Hospital 2 Dashboard (`HOSP-02` - Metropolitan General Hospital)
- **Specialization**: Thoracic & Pulmonary Critical Care (Chicago, IL)
- **Dataset**: 440 private patient records (High-Res Thoracic CTs, Blood Gases, SpO2, D-Dimer, Pulmonology notes).
- **Enclave**: `ENCLAVE-MGH-US-CENTRAL`
- **Tabs**: Overview, Patient Dataset, Multimodal Data, Local Training, Model Updates, Global Synchronization, Reports & Audit.

### 4. Hospital 3 Dashboard (`HOSP-03` - Apex Health Research Institute)
- **Specialization**: Acute Cardiovascular & Emergency Medicine (San Francisco, CA)
- **Dataset**: 480 private patient records (Cardiac MRI, CT Angiography, High-Sens Troponin T, Triage notes).
- **Enclave**: `ENCLAVE-AHRI-US-WEST`
- **Tabs**: Overview, Patient Dataset, Multimodal Data, Local Training, Model Updates, Global Synchronization, Reports & Audit.

### 5. Global Model Dashboard (`FED-SRV-CORE-00` - Central FedAvg Server)
- **Global Overview**: Real-time aggregation telemetry, round tracking, participating node health.
- **Hospital Monitoring (3/3)**: Side-by-side node cards showing local accuracy, update submission status, and sample contribution weight ($w_k = n_k / N$).
- **Model Update Reception**: Incoming queues, cryptographic signature checks, differential privacy verification.
- **Federated Model Aggregation (FedAvg)**: Step-by-step aggregation pipeline with live progress and mathematical formulas.
- **Global Model Performance**: Convergence curves comparing Global vs local hospitals, and modality ablation analysis (Images vs Clinical vs Text vs Full Fusion).
- **Global Model Distribution**: Parameter broadcast console with ACK receipts from each hospital enclave.
- **FL Round History**: Comprehensive table of all historical federated rounds.
- **Security & Privacy Audit**: Cryptographic audit ledger certifying 0.00 Bytes of raw data leakage.

---

## 🧬 Three Multimodal Data Modalities

| Modality | Features / Inputs | Preprocessing Pipeline | Feature Extractor | Latent Dim |
| :--- | :--- | :--- | :--- | :--- |
| **1. Medical Images** | Chest X-Rays, Thoracic CTs, Cardiac MRIs | $224 \times 224 \times 3$ normalization, data augmentations | ResNet-50 / Vision Transformer (ViT) | **768-d** |
| **2. Clinical Biomarkers** | Systolic/Diastolic BP, Heart Rate, Troponin I, BNP, CRP, LVEF, Age | Z-Score scaling, KNN missing value imputation | 3-Layer Tabular MLP with GELU | **128-d** |
| **3. Textual Reports** | Radiology impressions, discharge summaries, emergency consults | Clinical BioBERT subword tokenization (Max seq = 256) | Clinical BioBERT Transformer Encoder | **768-d** |

### Joint Multimodal Cross-Attention Fusion:
$$\text{Latent Joint Space } [512] = \text{LayerNorm}\left( \text{CrossAttention}(Q=\text{Text}, K=\text{Image}, V=\text{Image}) \oplus \text{Gated}(\text{Clinical}) \right)$$
$$\text{Classification Output} = \text{Softmax}(\text{Linear}(512 \rightarrow 3)) \quad \{\text{Normal}, \text{Heart Failure}, \text{Acute Coronary Syndrome}\}$$

---

## 📂 Sample Datasets Included

Three realistic clinical CSV datasets are included in `sample_datasets/` (and `public/datasets/`):
- `sample_datasets/hospital_1_cardiology.csv`
- `sample_datasets/hospital_2_pulmonology.csv`
- `sample_datasets/hospital_3_emergency.csv`

### Supported CSV Columns:
```csv
patient_id,age,gender,systolic_bp,diastolic_bp,heart_rate,troponin_i,bnp_pg_ml,crp_mg_l,lvef_percent,image_scan_type,image_findings,clinical_notes,diagnosis,severity
```

Users can upload any custom CSV directly via the **Patient Dataset Management** tab in any hospital dashboard. The system will automatically parse the headers, detect modalities, compute missing value statistics, calculate data quality scores, and render distribution charts.

---

## 🚀 Running the Application

### Prerequisites:
- Node.js (v18+)
- npm (v9+)

### Installation:
```bash
# Install dependencies
npm install

# Run Vite in development mode
npm run dev

# Or build for production
npm run build

# Start production server
node server.js
```
The application runs on `http://localhost:3000/`.

---

## 🔄 The 10-Step Federated Learning Workflow

1. **Step 1**: Each hospital loads its own private multimodal dataset into its local enclave.
2. **Step 2**: Each hospital preprocesses its images, scales clinical biomarkers, and tokenizes clinical notes.
3. **Step 3**: Each hospital trains its local multimodal network using local gradient descent.
4. **Step 4**: Gradients ($\Delta W$) are extracted and differential privacy Gaussian noise ($\epsilon \le 1.2$) is applied.
5. **Step 5**: Encrypted parameters are transmitted to the Global Server over TLS 1.3.
6. **Step 6**: The Global Model Server receives updates and validates cryptographic signatures.
7. **Step 7**: The Global Server executes Federated Averaging (FedAvg):
   $$W_{t+1} = \sum_{k=1}^3 \frac{n_k}{N} W_k^{t+1}$$
8. **Step 8**: A new Global Model version (e.g. `GLOBAL-MFL-v2.0`) is compiled and benchmarked.
9. **Step 9**: The Global Server distributes the new model weights to all three hospitals.
10. **Step 10**: Each hospital downloads and applies the global weights, boosting local accuracy, and the next round begins.

---

## 🛡️ Privacy & Compliance
- **Zero Raw Data Transfer**: Enforced by design. Only mathematical weights ($\Delta W$) leave client firewalls.
- **Differential Privacy (DP-SGD)**: Prevents membership inference attacks.
- **TLS 1.3 Encryption**: End-to-end encrypted transport.
- **HIPAA §164.514 & GDPR Art. 9**: Full compliance certification and immutable audit logs.
