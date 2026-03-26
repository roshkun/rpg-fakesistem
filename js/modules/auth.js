// ==================== AUTENTICAÇÃO ====================

let currentDoctor = null;
let currentDoctorCode = null;
let failedAttempts = 0;
let systemHacked = false;

function authenticateWithCertificate() {
    const selectElement = document.getElementById('certificateSelect');
    if (!selectElement) return;
    
    const doctorId = selectElement.value;
    if (!doctorId) {
        showError('loginError', '❌ Selecione um profissional válido');
        return;
    }
    
    const doctor = doctorsDB[doctorId];
    if (!doctor) {
        showError('loginError', '❌ Profissional não encontrado');
        return;
    }
    
    if (doctor.certificate?.status === 'Expirado') {
        showError('loginError', `❌ Acesso Negado!<br>Certificado EXPIRADO em ${doctor.certificate.expirationDate}`);
        return;
    }
    
    currentDoctor = doctor;
    currentDoctorCode = currentDoctor.observationCode;
    
    // Fechar modal e mostrar sistema
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
    document.getElementById('doctorName').innerHTML = `${currentDoctor.name} ✅`;
    document.getElementById('doctorCRM').innerHTML = currentDoctor.crm;
    
    failedAttempts = 0;
    systemHacked = false;
    
    // Inicializar UI
    initializeUI();
}

function logout() {
    currentDoctor = null;
    currentDoctorCode = null;
    failedAttempts = 0;
    systemHacked = false;
    
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('certificateSelect').value = '';
}

function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = message;
    }
}