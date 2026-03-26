// ==================== CARREGAMENTO DE DADOS ====================

let doctorsDB = {};
let patients = [];

async function loadDataFromFile(dataFile) {
    try {
        const response = await fetch(dataFile);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        
        if (!data.doctors || !data.patients) {
            throw new Error('JSON deve conter "doctors" e "patients"');
        }
        
        doctorsDB = data.doctors;
        patients = data.patients;
        
        // Garantir campos obrigatórios
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
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return false;
    }
}

function updateDoctorSelect() {
    const select = document.getElementById('certificateSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecione um profissional...</option>';
    for (const [id, doctor] of Object.entries(doctorsDB)) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${doctor.name} - ${doctor.crm} (Certificado A3)`;
        select.appendChild(option);
    }
}