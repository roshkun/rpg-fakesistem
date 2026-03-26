// ==================== GERENCIAMENTO DE DADOS ====================

let doctorsDB = {};
let patients = [];
let dataSource = 'none';

async function loadData(mode) {
    console.log('🚀 Carregando dados...');
    
    // Tentar Google Sheets primeiro
    const sheetsData = await loadFromSheets(mode);
    
    if (sheetsData && sheetsData.doctors.length > 0) {
        // Converter para objeto
        const doctors = {};
        sheetsData.doctors.forEach(doctor => {
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
        patients = sheetsData.patients;
        dataSource = 'sheets';
        console.log('✅ Dados do Google Sheets');
        return true;
    }
    
    // Fallback: dados de exemplo
    loadFallbackData(mode);
    return true;
}

function loadFallbackData(mode) {
    if (mode === 'hospitalar') {
        doctorsDB = {
            "1": { id: "1", name: "Dr. Carlos Mendes", crm: "CRM 12345", observationCode: "123456", savedPassword: "123456", lastPasswordChange: "15/11/2024 14:30", certificate: { status: "Válido" } }
        };
        patients = [{ id: 1, name: "Maria Silva", age: 72, gender: "Feminino", bloodType: "A+", admissionDate: "18/11/2024", room: "201-A", diagnosis: "Hipertensão", medicalHistory: "Paciente hipertensa", medications: "Losartana", allergies: "Nenhuma", medicalNotes: "Observação confidencial", lastUpdate: "19/11/2024", initials: "MS", color: "#FF6B6B", photoUrl: "" }];
    } else {
        doctorsDB = {
            "1": { id: "1", name: "Dr. Carlos Mendes - Legista", crm: "CRM 12345", observationCode: "123456", savedPassword: "123456", lastPasswordChange: "15/11/2024 14:30", certificate: { status: "Válido" } }
        };
        patients = [{ id: 1, name: "Mariana Luz", age: 35, gender: "Feminino", bloodType: "A-", admissionDate: "10/03/2026", room: "305-B", diagnosis: "Óbito por falência hepática", medicalHistory: "Paciente em estado terminal", medications: "Nenhum", allergies: "Nenhuma", medicalNotes: "🔍 LAUDO: Exame externo sem cicatrizes", lastUpdate: "26/03/2026", initials: "ML", color: "#6B94FF", photoUrl: "" }];
    }
    dataSource = 'fallback';
    console.log('✅ Dados de fallback');
}

function updateDoctorSelect() {
    const select = document.getElementById('certificateSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecione um profissional...</option>';
    for (const [id, doctor] of Object.entries(doctorsDB)) {
        const option = document.createElement('option');
        option.value = id;
        const statusIcon = doctor.certificate?.status === 'Expirado' ? '⚠️' : '✅';
        option.textContent = `${doctor.name} - ${doctor.crm} ${statusIcon}`;
        select.appendChild(option);
    }
}

function getCertificateInfo(doctorId) {
    const doctor = doctorsDB[doctorId];
    return doctor?.certificate || null;
}