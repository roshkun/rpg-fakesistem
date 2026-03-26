// ==================== CARREGAMENTO DE DADOS ====================

let doctorsDB = {};
let patients = [];
let dataSource = 'none';

async function loadData(mode) {
    console.log('🚀 Carregando dados para modo:', mode);
    
    try {
        const data = await loadFromGoogleSheets(mode);
        
        if (data && data.doctors && data.doctors.length > 0) {
            // Converter array para objeto
            const doctors = {};
            data.doctors.forEach(doctor => {
                const id = doctor.id || Object.keys(doctors).length + 1;
                doctors[id] = {
                    id: id,
                    name: doctor.name || 'Nome não informado',
                    crm: doctor.crm || 'CRM não informado',
                    observationCode: doctor.observationCode || '000000',
                    savedPassword: doctor.observationCode || '000000',
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
            
            doctorsDB = doctors;
            patients = data.patients;
            dataSource = 'sheets';
            console.log('✅ Dados carregados do Google Sheets!');
            return true;
        }
        
        // Fallback: dados de exemplo
        console.warn('⚠️ Nenhum dado do Sheets, usando fallback');
        loadFallbackData(mode);
        return true;
        
    } catch (error) {
        console.error('❌ Erro:', error);
        loadFallbackData(mode);
        return true;
    }
}

function loadFallbackData(mode) {
    if (mode === 'hospitalar') {
        doctorsDB = {
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
            },
            "2": {
                id: "2",
                name: "Dra. Ana Paula Souza",
                crm: "CRM 67890",
                observationCode: "234567",
                savedPassword: "234567",
                lastPasswordChange: "16/11/2024 09:15",
                certificate: {
                    issuer: "ICP-Brasil - Saúde",
                    serialNumber: "BR-SAUDE-002",
                    issuedDate: "10/10/2023",
                    expirationDate: "10/10/2026",
                    status: "Válido",
                    level: "A3"
                }
            }
        };
        patients = [
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
        ];
    } else {
        doctorsDB = {
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
        };
        patients = [
            {
                id: 1,
                name: "Mariana Luz",
                age: 35,
                gender: "Feminino",
                bloodType: "A-",
                admissionDate: "10/03/2026",
                room: "305-B",
                diagnosis: "Óbito por falência hepática",
                medicalHistory: "Paciente em estado terminal.",
                patientHistory: "📅 10/03: Internação\n📅 26/03: Óbito",
                medications: "Nenhum",
                allergies: "Nenhuma",
                medicalNotes: "🔍 LAUDO PRELIMINAR: Ao exame externo, não há cicatrizes de procedimentos cirúrgicos.",
                lastUpdate: "26/03/2026",
                initials: "ML",
                color: "#6B94FF",
                photoUrl: ""
            }
        ];
    }
    dataSource = 'fallback';
    console.log('✅ Dados de fallback carregados');
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
    console.log(`✅ Select atualizado com ${Object.keys(doctorsDB).length} profissionais`);
}

function getCertificateInfo(doctorId) {
    const doctor = doctorsDB[doctorId];
    if (!doctor || !doctor.certificate) return null;
    return doctor.certificate;
}