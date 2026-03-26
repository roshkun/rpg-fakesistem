// ==================== CARREGAMENTO DE DADOS ====================

let doctorsDB = {};
let patients = [];
let dataSource = 'none';

// Dados de exemplo para fallback (caso não consiga carregar do Google Sheets)
const fallbackData = {
    hospitalar: {
        doctors: {
            "1": {
                id: "1",
                name: "Dr. Carlos Mendes",
                crm: "CRM 12345",
                observationCode: "123456",
                savedPassword: "123456",
                lastPasswordChange: "15/11/2024 14:30",
                certificate: {
                    issuer: "ICP-Brasil - Saúde",
                    serialNumber: "BR-SAUDE-001",
                    issuedDate: "15/11/2022",
                    expirationDate: "15/11/2025",
                    status: "Válido",
                    level: "A3"
                }
            }
        },
        patients: [
            {
                id: 1,
                name: "Maria Aparecida Silva",
                age: 72,
                gender: "Feminino",
                bloodType: "A+",
                admissionDate: "18/11/2024",
                room: "201-A",
                diagnosis: "Hipertensão arterial descompensada",
                medicalHistory: "Paciente hipertensa há 20 anos.",
                patientHistory: "📅 2015: Diagnóstico\n📅 2018: Tratamento",
                medications: "Losartana 100mg",
                allergies: "Nenhuma",
                medicalNotes: "🔴 Melhora inexplicável dos níveis pressóricos.",
                lastUpdate: "19/11/2024",
                initials: "MS",
                color: "#FF6B6B",
                photoUrl: ""
            }
        ]
    },
    funeraria: {
        doctors: {
            "1": {
                id: "1",
                name: "Dr. Carlos Mendes - Legista",
                crm: "CRM 12345",
                observationCode: "123456",
                savedPassword: "123456",
                lastPasswordChange: "15/11/2024 14:30",
                certificate: {
                    issuer: "ICP-Brasil - Funerária",
                    serialNumber: "BR-FUN-001",
                    issuedDate: "15/11/2022",
                    expirationDate: "15/11/2025",
                    status: "Válido",
                    level: "A3"
                }
            }
        },
        patients: [
            {
                id: 1,
                name: "Mariana Luz",
                age: 35,
                gender: "Feminino",
                bloodType: "A-",
                admissionDate: "10/03/2026",
                room: "305-B",
                diagnosis: "Recuperação Pós-Falência Hepática",
                medicalHistory: "Paciente em estado terminal.",
                patientHistory: "📅 10/03: Internação\n📅 26/03: Melhora milagrosa",
                medications: "Nenhum",
                allergies: "Nenhuma",
                medicalNotes: "🔴 LAUDO CONFIDENCIAL: Fígado novo sem cirurgia.",
                lastUpdate: "26/03/2026",
                initials: "ML",
                color: "#6B94FF",
                photoUrl: ""
            }
        ]
    }
};

async function loadDataFromSheets(mode) {
    if (!isGoogleSheetsConfigured()) {
        console.log('⚠️ Google Sheets não configurado');
        return false;
    }
    
    try {
        console.log('🔄 Tentando carregar do Google Sheets...');
        const data = await loadFromGoogleSheets(mode);
        
        if (!data || !data.doctors || data.doctors.length === 0) {
            console.warn('⚠️ Dados vazios do Google Sheets');
            return false;
        }
        
        // Converter array para objeto
        const doctors = {};
        data.doctors.forEach(doctor => {
            const id = doctor.id || Object.keys(doctors).length + 1;
            doctors[id] = {
                id: id,
                name: doctor.name,
                crm: doctor.crm,
                observationCode: doctor.observationCode,
                savedPassword: doctor.observationCode,
                lastPasswordChange: doctor.lastPasswordChange || new Date().toLocaleString('pt-BR'),
                certificate: {
                    issuer: doctor.certificate_issuer || 'ICP-Brasil',
                    serialNumber: doctor.certificate_serial || `BR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                    issuedDate: doctor.certificate_issued || new Date().toLocaleDateString('pt-BR'),
                    expirationDate: doctor.certificate_expiration || new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                    level: doctor.certificate_level || 'A3',
                    status: doctor.certificate_status || 'Válido'
                }
            };
        });
        
        const processedData = { doctors, patients: data.patients };
        processLoadedData(processedData);
        dataSource = 'sheets';
        console.log('✅ Dados carregados do Google Sheets!');
        return true;
        
    } catch (error) {
        console.error('❌ Erro ao carregar do Google Sheets:', error);
        return false;
    }
}

function loadFallbackData(mode) {
    console.log('📁 Usando dados de fallback para modo:', mode);
    const fallback = fallbackData[mode];
    if (!fallback) {
        console.error('❌ Fallback não encontrado para modo:', mode);
        return false;
    }
    processLoadedData(fallback);
    dataSource = 'fallback';
    console.log('✅ Dados de fallback carregados!');
    return true;
}

async function loadData(mode) {
    console.log('🚀 Iniciando carregamento de dados para modo:', mode);
    
    // Tentar Google Sheets primeiro
    let success = await loadDataFromSheets(mode);
    
    // Se falhar, usar fallback
    if (!success) {
        console.log('⚠️ Google Sheets falhou, usando fallback...');
        success = loadFallbackData(mode);
    }
    
    if (!success) {
        console.error('❌ Todas as fontes falharam!');
        return false;
    }
    
    console.log(`✅ Dados carregados com sucesso! Fonte: ${dataSource}`);
    return true;
}

function processLoadedData(data) {
    doctorsDB = data.doctors;
    patients = data.patients;
    
    // Garantir campos obrigatórios nos pacientes
    patients.forEach((patient, index) => {
        if (!patient.patientHistory) patient.patientHistory = "Histórico não informado";
        if (!patient.photoUrl) patient.photoUrl = "";
        if (!patient.initials) {
            const names = patient.name.split(' ');
            patient.initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : names[0].charAt(1));
        }
        if (!patient.color) {
            const defaultColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#B5EAD7", "#C7CEE6"];
            patient.color = defaultColors[index % defaultColors.length];
        }
        if (!patient.id) patient.id = index + 1;
    });
    
    // Garantir campos obrigatórios nos médicos
    for (const [id, doctor] of Object.entries(doctorsDB)) {
        if (!doctor.savedPassword) doctor.savedPassword = doctor.observationCode;
        if (!doctor.lastPasswordChange) doctor.lastPasswordChange = new Date().toLocaleString('pt-BR');
        
        if (!doctor.certificate) {
            doctor.certificate = {
                issuer: "ICP-Brasil",
                serialNumber: `BR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                issuedDate: new Date().toLocaleDateString('pt-BR'),
                expirationDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                status: "Válido",
                level: "A3"
            };
        }
        
        // Verificar expiração
        if (doctor.certificate.expirationDate) {
            const expDate = new Date(doctor.certificate.expirationDate.split('/').reverse().join('-'));
            const today = new Date();
            doctor.certificate.status = expDate < today ? "Expirado" : "Válido";
        }
    }
    
    console.log(`📊 Dados processados: ${Object.keys(doctorsDB).length} médicos, ${patients.length} pacientes`);
}

function updateDoctorSelect() {
    const select = document.getElementById('certificateSelect');
    if (!select) {
        console.warn('⚠️ Select de médicos não encontrado');
        return;
    }
    
    select.innerHTML = '<option value="">Selecione um profissional...</option>';
    for (const [id, doctor] of Object.entries(doctorsDB)) {
        const option = document.createElement('option');
        option.value = id;
        const statusIcon = doctor.certificate?.status === 'Expirado' ? '⚠️' : '✅';
        option.textContent = `${doctor.name} - ${doctor.crm} ${statusIcon} (${doctor.certificate?.status || 'Válido'})`;
        select.appendChild(option);
    }
    console.log(`✅ Select atualizado com ${Object.keys(doctorsDB).length} profissionais`);
}

function getCertificateInfo(doctorId) {
    const doctor = doctorsDB[doctorId];
    if (!doctor || !doctor.certificate) return null;
    
    const cert = doctor.certificate;
    return {
        ...cert,
        isValid: cert.status !== 'Expirado',
        message: cert.status === 'Expirado' ? '⚠️ Certificado EXPIRADO! Contate o suporte.' : '✅ Certificado válido'
    };
}