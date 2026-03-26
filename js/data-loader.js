// ==================== CARREGAMENTO DE DADOS ====================

let doctorsDB = {};
let patients = [];
let dataSource = 'json'; // 'json' ou 'sheets'

async function loadDataFromFile(dataFile) {
    try {
        console.log('Tentando carregar:', dataFile);
        const response = await fetch(dataFile);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.doctors || !data.patients) {
            throw new Error('JSON deve conter "doctors" e "patients"');
        }
        
        processLoadedData(data);
        return true;
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return false;
    }
}

async function loadDataFromSheets(mode) {
    try {
        console.log('Tentando carregar do Google Sheets...');
        const data = await loadFromGoogleSheets(mode);
        
        if (!data) {
            throw new Error('Falha ao carregar do Google Sheets');
        }
        
        // Converter arrays para objetos
        const doctors = {};
        data.doctors.forEach(doctor => {
            doctors[doctor.id] = {
                ...doctor,
                certificate: {
                    issuer: doctor.certificate_issuer,
                    serialNumber: doctor.certificate_serial,
                    issuedDate: doctor.certificate_issued,
                    expirationDate: doctor.certificate_expiration,
                    status: doctor.certificate_status,
                    level: doctor.certificate_level,
                    fingerprint: doctor.certificate_fingerprint || 'N/A'
                }
            };
        });
        
        const processedData = { doctors, patients: data.patients };
        processLoadedData(processedData);
        
        dataSource = 'sheets';
        return true;
        
    } catch (error) {
        console.error('Erro ao carregar do Google Sheets:', error);
        return false;
    }
}

function processLoadedData(data) {
    doctorsDB = data.doctors;
    patients = data.patients;
    
    // Garantir campos obrigatórios nos pacientes
    patients.forEach(patient => {
        if (!patient.patientHistory) patient.patientHistory = "Histórico não informado";
        if (!patient.photoUrl) patient.photoUrl = "";
        if (!patient.initials) {
            const names = patient.name.split(' ');
            patient.initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : names[0].charAt(1));
        }
        if (!patient.color) {
            const defaultColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
            patient.color = defaultColors[patient.id % defaultColors.length];
        }
    });
    
    // Garantir campos obrigatórios nos médicos
    for (const [id, doctor] of Object.entries(doctorsDB)) {
        if (!doctor.savedPassword) doctor.savedPassword = doctor.observationCode;
        if (!doctor.lastPasswordChange) doctor.lastPasswordChange = new Date().toLocaleString('pt-BR');
        
        // Verificar se o certificado existe
        if (!doctor.certificate) {
            doctor.certificate = {
                issuer: "ICP-Brasil - Autoridade Certificadora Saúde",
                serialNumber: `BR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                issuedDate: new Date().toLocaleDateString('pt-BR'),
                expirationDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                status: "Válido",
                level: "A3 - Assinatura Digital",
                fingerprint: Math.random().toString(36).substring(2, 20).toUpperCase().match(/.{1,2}/g).join(':')
            };
        }
        
        // Verificar se o certificado está expirado
        if (doctor.certificate.expirationDate) {
            const expDate = new Date(doctor.certificate.expirationDate.split('/').reverse().join('-'));
            const today = new Date();
            if (expDate < today) {
                doctor.certificate.status = "Expirado";
            } else {
                doctor.certificate.status = "Válido";
            }
        }
    }
    
    console.log('Dados processados:', { 
        doctors: Object.keys(doctorsDB).length, 
        patients: patients.length,
        expiredCertificates: Object.values(doctorsDB).filter(d => d.certificate?.status === 'Expirado').length,
        dataSource: dataSource
    });
}

function updateDoctorSelect() {
    const select = document.getElementById('certificateSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecione um profissional...</option>';
    for (const [id, doctor] of Object.entries(doctorsDB)) {
        const option = document.createElement('option');
        option.value = id;
        const statusIcon = doctor.certificate?.status === 'Expirado' ? '⚠️' : '✅';
        option.textContent = `${doctor.name} - ${doctor.crm} ${statusIcon} (${doctor.certificate?.status || 'Válido'})`;
        select.appendChild(option);
    }
}

function getCertificateInfo(doctorId) {
    const doctor = doctorsDB[doctorId];
    if (!doctor || !doctor.certificate) return null;
    
    const cert = doctor.certificate;
    const isExpired = cert.status === 'Expirado';
    
    return {
        ...cert,
        isValid: !isExpired,
        message: isExpired ? '⚠️ Certificado EXPIRADO! Contate o suporte.' : '✅ Certificado válido'
    };
}