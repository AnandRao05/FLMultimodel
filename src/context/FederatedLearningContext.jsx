import React, { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_HOSPITALS, INITIAL_GLOBAL_MODEL } from '../data/initialHospitalData';

const FederatedLearningContext = createContext(null);

export const FederatedLearningProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [globalModel, setGlobalModel] = useState(INITIAL_GLOBAL_MODEL);
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'hosp1' | 'hosp2' | 'hosp3' | 'global'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Real-time training progress tracking per hospital
  const [trainingState, setTrainingState] = useState({
    hosp1: { isTraining: false, progress: 0, currentEpoch: 0, totalEpochs: 5, logs: [] },
    hosp2: { isTraining: false, progress: 0, currentEpoch: 0, totalEpochs: 5, logs: [] },
    hosp3: { isTraining: false, progress: 0, currentEpoch: 0, totalEpochs: 5, logs: [] }
  });

  // Global aggregation progress tracking
  const [aggregationState, setAggregationState] = useState({
    isAggregating: false,
    step: 0, // 0: idle, 1: validating weights, 2: computing FedAvg, 3: validating global benchmark, 4: complete
    progress: 0,
    statusText: 'Ready'
  });

  // Global distribution progress tracking
  const [distributionState, setDistributionState] = useState({
    isDistributing: false,
    progress: 0,
    statusText: 'Idle'
  });

  // Notifications system
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Initialized', message: 'MFL Healthcare cluster online with 3 hospital enclaves.', type: 'info', time: 'Just now' }
  ]);

  const addNotification = useCallback((title, message, type = 'info') => {
    setNotifications(prev => [
      { id: Date.now(), title, message, type, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ...prev.slice(0, 19)
    ]);
  }, []);

  // Switch navigation view and tab
  const navigateTo = useCallback((view, tab = 'overview') => {
    setActiveView(view);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update Hospital CSV dataset
  const uploadHospitalDataset = useCallback((hospId, { fileName, rowCount, records, detectedModalities }) => {
    setHospitals(prev => {
      const current = prev[hospId];
      const newTotal = rowCount;
      return {
        ...prev,
        [hospId]: {
          ...current,
          totalRecords: newTotal,
          sampleRecords: records.slice(0, 10),
          lastSyncTime: 'Pending re-training',
          trainingStatus: 'Ready',
          qualityStats: {
            ...current.qualityStats,
            completeness: 99.1,
            missingValuesPercent: 0.9
          }
        }
      };
    });
    addNotification('Dataset Uploaded', `${fileName} parsed (${rowCount} records) into ${hospitals[hospId]?.name} local enclave.`, 'success');
  }, [addNotification, hospitals]);

  // Start local model training
  const startLocalTraining = useCallback((hospId, { epochs = 5, batchSize = 32, learningRate = 0.0005, fusionHead = 'Cross-Attention Multimodal Transformer' }) => {
    const hosp = hospitals[hospId];
    if (!hosp) return;

    setHospitals(prev => ({
      ...prev,
      [hospId]: { ...prev[hospId], trainingStatus: 'Training' }
    }));

    setTrainingState(prev => ({
      ...prev,
      [hospId]: { isTraining: true, progress: 0, currentEpoch: 0, totalEpochs: epochs, logs: [`[INIT] Local training started with ${epochs} epochs, batch size ${batchSize}. Architecture: ${fusionHead}`] }
    }));

    let epoch = 0;
    const interval = setInterval(() => {
      epoch++;
      const progressPercent = Math.round((epoch / epochs) * 100);
      
      // Calculate realistic metric progression
      const baseAcc = hosp.currentAccuracy;
      const accImprovement = Number(((epochs - epoch + 1) * 0.4 + (Math.random() * 0.3)).toFixed(1));
      const simulatedLoss = Number((Math.max(0.12, hosp.currentLoss - (epoch * 0.045) + (Math.random() * 0.02 - 0.01))).toFixed(3));
      const simulatedAcc = Math.min(96.8, Number((baseAcc + (epoch * 0.8)).toFixed(1)));

      setTrainingState(prev => ({
        ...prev,
        [hospId]: {
          ...prev[hospId],
          progress: progressPercent,
          currentEpoch: epoch,
          logs: [
            ...prev[hospId].logs,
            `[Epoch ${epoch}/${epochs}] Training Loss: ${simulatedLoss} | Val Acc: ${simulatedAcc}% | Gradient Norm: 0.04${epoch}`
          ]
        }
      }));

      if (epoch >= epochs) {
        clearInterval(interval);
        const finalAccuracy = Math.min(95.5, Number((hosp.currentAccuracy + 2.8).toFixed(1)));
        const finalLoss = Number((Math.max(0.18, hosp.currentLoss - 0.09)).toFixed(3));
        const finalF1 = Number((hosp.f1Score + 0.025).toFixed(3));

        setTrainingState(prev => ({
          ...prev,
          [hospId]: {
            ...prev[hospId],
            isTraining: false,
            progress: 100,
            logs: [...prev[hospId].logs, `[SUCCESS] Local model training completed! Weights prepared for transmission.`]
          }
        }));

        setHospitals(prev => ({
          ...prev,
          [hospId]: {
            ...prev[hospId],
            trainingStatus: 'Trained',
            currentAccuracy: finalAccuracy,
            currentLoss: finalLoss,
            f1Score: finalF1,
            localModelStatus: 'Weights Ready for Global Transmission',
            localRoundsCompleted: prev[hospId].localRoundsCompleted + 1,
            updateSentToGlobal: false,
            trainingHistory: [
              ...prev[hospId].trainingHistory,
              { epoch: prev[hospId].trainingHistory.length + 1, loss: finalLoss, accuracy: finalAccuracy, valLoss: finalLoss, valAccuracy: finalAccuracy }
            ]
          }
        }));

        addNotification(
          'Training Completed',
          `${hosp.name} finished local training (${epochs} epochs). Local accuracy: ${finalAccuracy}%. Ready to send update.`,
          'success'
        );
      }
    }, 900);
  }, [hospitals, addNotification]);

  // Send model update from Hospital to Global Server
  const sendModelUpdate = useCallback((hospId) => {
    const hosp = hospitals[hospId];
    if (!hosp) return;

    setHospitals(prev => ({
      ...prev,
      [hospId]: {
        ...prev[hospId],
        trainingStatus: 'Sending'
      }
    }));

    setTimeout(() => {
      setHospitals(prev => ({
        ...prev,
        [hospId]: {
          ...prev[hospId],
          trainingStatus: 'Sent',
          updateSentToGlobal: true,
          updatesSentCount: prev[hospId].updatesSentCount + 1,
          localModelStatus: 'Update Sent & Verified on Central Server'
        }
      }));

      // Add security audit log in global model
      setGlobalModel(prev => ({
        ...prev,
        securityLogs: [
          {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            event: 'Model Update Received',
            client: hosp.code,
            payloadSize: '54.2 MB (Gradients only)',
            dataShared: '0 Bytes (Protected by Enclave)',
            status: 'TLS 1.3 Verified'
          },
          ...prev.securityLogs
        ]
      }));

      addNotification(
        'Model Update Transmitted',
        `${hosp.name} transmitted encrypted parameter weights (54.2 MB) to Global Model Server. Raw data was not transmitted.`,
        'success'
      );
    }, 1200);
  }, [hospitals, addNotification]);

  // Check how many hospitals have sent updates for next aggregation
  const pendingUpdatesCount = Object.values(hospitals).filter(h => h.updateSentToGlobal).length;

  // Start Global Aggregation (FedAvg)
  const startGlobalAggregation = useCallback(() => {
    setAggregationState({
      isAggregating: true,
      step: 1,
      progress: 20,
      statusText: 'Validating received client parameters and cryptographic signatures...'
    });

    setTimeout(() => {
      setAggregationState({
        isAggregating: true,
        step: 2,
        progress: 50,
        statusText: 'Computing sample-weighted Federated Averaging (FedAvg: W = sum(n_k / N * W_k))...'
      });

      setTimeout(() => {
        setAggregationState({
          isAggregating: true,
          step: 3,
          progress: 80,
          statusText: 'Evaluating newly aggregated Global Model against multimodal validation benchmarks...'
        });

        setTimeout(() => {
          // Calculate new Global Accuracy based on weighted average of hospital accuracies
          const h1 = hospitals.hosp1;
          const h2 = hospitals.hosp2;
          const h3 = hospitals.hosp3;
          const totalRecords = h1.totalRecords + h2.totalRecords + h3.totalRecords;
          
          const weightedAcc = (
            (h1.currentAccuracy * h1.totalRecords) +
            (h2.currentAccuracy * h2.totalRecords) +
            (h3.currentAccuracy * h3.totalRecords)
          ) / totalRecords;

          // Federated synergy boost: aggregation over diverse multimodal distributions provides an additional boost
          const synergyBoost = 2.1;
          const newGlobalAcc = Number(Math.min(97.4, (weightedAcc + synergyBoost)).toFixed(1));
          const newGlobalLoss = Number(Math.max(0.14, globalModel.globalLoss - 0.065).toFixed(3));
          const newGlobalF1 = Number(Math.min(0.97, globalModel.f1Score + 0.024).toFixed(3));
          const newRound = globalModel.currentRound + 1;
          const newVersion = `GLOBAL-MFL-v${newRound}.0`;

          setGlobalModel(prev => ({
            ...prev,
            currentRound: newRound,
            version: newVersion,
            globalAccuracy: newGlobalAcc,
            globalLoss: newGlobalLoss,
            f1Score: newGlobalF1,
            lastAggregationTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            totalAggregations: prev.totalAggregations + 1,
            status: 'Aggregation Completed - Ready for Distribution',
            distributionStatus: {
              hosp1: { distributed: false, acknowledged: false, time: null },
              hosp2: { distributed: false, acknowledged: false, time: null },
              hosp3: { distributed: false, acknowledged: false, time: null }
            },
            roundHistory: [
              {
                round: newRound,
                version: newVersion,
                participatingHospitals: ['HOSP-01 (St. Jude)', 'HOSP-02 (Metropolitan)', 'HOSP-03 (Apex)'],
                totalRecords,
                weightsReceived: 3,
                accuracy: newGlobalAcc,
                loss: newGlobalLoss,
                f1Score: newGlobalF1,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'Aggregated via FedAvg'
              },
              ...prev.roundHistory
            ],
            accuracyConvergence: [
              ...prev.accuracyConvergence,
              {
                round: `Round ${newRound}`,
                global: newGlobalAcc,
                hosp1: h1.currentAccuracy,
                hosp2: h2.currentAccuracy,
                hosp3: h3.currentAccuracy
              }
            ],
            securityLogs: [
              {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                event: `FedAvg Aggregation Round ${newRound}`,
                client: 'Central Server',
                payloadSize: `Aggregated 14.2M params from ${totalRecords} patient records`,
                dataShared: '0 Bytes Raw Patient Data Shared',
                status: `Generated ${newVersion}`
              },
              ...prev.securityLogs
            ]
          }));

          // Reset hospital update status to allow next round
          setHospitals(prev => ({
            hosp1: { ...prev.hosp1, updateSentToGlobal: false, globalModelVersion: newVersion, syncStatus: 'Update Available' },
            hosp2: { ...prev.hosp2, updateSentToGlobal: false, globalModelVersion: newVersion, syncStatus: 'Update Available' },
            hosp3: { ...prev.hosp3, updateSentToGlobal: false, globalModelVersion: newVersion, syncStatus: 'Update Available' }
          }));

          setAggregationState({
            isAggregating: false,
            step: 4,
            progress: 100,
            statusText: `Aggregation successful! Model ${newVersion} compiled with global accuracy ${newGlobalAcc}%.`
          });

          addNotification(
            'Global Aggregation Complete',
            `FedAvg completed for Round ${newRound}. New model version: ${newVersion} with ${newGlobalAcc}% benchmark accuracy!`,
            'success'
          );
        }, 1200);
      }, 1400);
    }, 1200);
  }, [hospitals, globalModel, addNotification]);

  // Distribute Global Model to all 3 hospitals
  const distributeGlobalModel = useCallback(() => {
    setDistributionState({
      isDistributing: true,
      progress: 30,
      statusText: 'Broadcasting encrypted weights to 3 hospital enclaves...'
    });

    setTimeout(() => {
      setDistributionState({
        isDistributing: true,
        progress: 80,
        statusText: 'Verifying TLS 1.3 transmission & checksum handshakes...'
      });

      setTimeout(() => {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setGlobalModel(prev => ({
          ...prev,
          status: 'Distributed to all 3 Hospitals',
          distributionStatus: {
            hosp1: { distributed: true, acknowledged: true, time: timeNow },
            hosp2: { distributed: true, acknowledged: true, time: timeNow },
            hosp3: { distributed: true, acknowledged: true, time: timeNow }
          },
          securityLogs: [
            {
              id: Date.now(),
              timestamp: new Date().toLocaleTimeString(),
              event: 'Global Distribution Broadcast',
              client: 'Broadcast to HOSP-01, HOSP-02, HOSP-03',
              payloadSize: '54.2 MB encrypted weights',
              dataShared: 'Differential Privacy Verified',
              status: 'Delivered (3/3 nodes)'
            },
            ...prev.securityLogs
          ]
        }));

        setDistributionState({
          isDistributing: false,
          progress: 100,
          statusText: 'All 3 hospitals successfully received latest Global Model weights.'
        });

        addNotification(
          'Model Broadcast Completed',
          `Global Model ${globalModel.version} successfully broadcast to Hospital 1, Hospital 2, and Hospital 3.`,
          'success'
        );
      }, 1200);
    }, 1000);
  }, [globalModel.version, addNotification]);

  // Apply Global Model to Hospital Local Client
  const applyGlobalModel = useCallback((hospId) => {
    const hosp = hospitals[hospId];
    if (!hosp) return;

    // Local model accuracy gets boosted toward the global model accuracy
    const boostedAccuracy = Number(Math.min(96.5, Math.max(hosp.currentAccuracy, globalModel.globalAccuracy - 0.4)).toFixed(1));
    const boostedLoss = Number(Math.max(0.16, globalModel.globalLoss + 0.02).toFixed(3));

    setHospitals(prev => ({
      ...prev,
      [hospId]: {
        ...prev[hospId],
        currentAccuracy: boostedAccuracy,
        currentLoss: boostedLoss,
        modelVersion: `${hosp.code}-synced-${globalModel.version}`,
        globalModelVersion: globalModel.version,
        lastSyncTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        syncStatus: 'Up to Date',
        localModelStatus: 'Synchronized with Global Backbone'
      }
    }));

    addNotification(
      'Global Weights Applied',
      `${hosp.name} successfully updated its local weights from ${globalModel.version}. Accuracy boosted to ${boostedAccuracy}%.`,
      'success'
    );
  }, [hospitals, globalModel, addNotification]);

  // Run complete 1-click end-to-end demonstration
  const runFullSimulation = useCallback(() => {
    addNotification('Simulation Started', 'Executing full 10-step Federated Learning loop...', 'info');
    
    // Step 1: Train all 3 hospitals
    startLocalTraining('hosp1', { epochs: 3 });
    startLocalTraining('hosp2', { epochs: 3 });
    startLocalTraining('hosp3', { epochs: 3 });

    // Step 2: Send updates after training finishes
    setTimeout(() => {
      sendModelUpdate('hosp1');
      sendModelUpdate('hosp2');
      sendModelUpdate('hosp3');

      // Step 3: Run global aggregation
      setTimeout(() => {
        startGlobalAggregation();

        // Step 4: Distribute
        setTimeout(() => {
          distributeGlobalModel();

          // Step 5: Apply to all hospitals
          setTimeout(() => {
            applyGlobalModel('hosp1');
            applyGlobalModel('hosp2');
            applyGlobalModel('hosp3');
            addNotification('Simulation Completed', 'Full 10-step MFL cycle successfully executed!', 'success');
          }, 3500);
        }, 4000);
      }, 2000);
    }, 4000);
  }, [startLocalTraining, sendModelUpdate, startGlobalAggregation, distributeGlobalModel, applyGlobalModel, addNotification]);

  return (
    <FederatedLearningContext.Provider
      value={{
        hospitals,
        globalModel,
        activeView,
        activeTab,
        trainingState,
        aggregationState,
        distributionState,
        notifications,
        pendingUpdatesCount,
        navigateTo,
        setActiveTab,
        uploadHospitalDataset,
        startLocalTraining,
        sendModelUpdate,
        startGlobalAggregation,
        distributeGlobalModel,
        applyGlobalModel,
        runFullSimulation,
        addNotification
      }}
    >
      {children}
    </FederatedLearningContext.Provider>
  );
};

export const useFederatedLearning = () => {
  const context = useContext(FederatedLearningContext);
  if (!context) {
    throw new Error('useFederatedLearning must be used within a FederatedLearningProvider');
  }
  return context;
};
