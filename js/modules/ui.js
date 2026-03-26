// ==================== INTERFACE DO USUÁRIO ====================

let currentPatientId = 1;
let currentPage = 'prontuario';
let searchTerm = '';
let observationsUnlocked = false;
let sidebarVisible = true;
let constants = null;

function applyConfig(mode) {
    constants = getConstants(mode);
    if (!constants) return;
    
    // Aplicar todos os textos
    const elements = {
        systemTitle: document.getElementById('systemTitle'),
        systemSubtitle: document.getElementById('systemSubtitle'),
        accreditationLine1: document.getElementById('accreditationLine1'),
        accreditationLine2: document.getElementById('accreditationLine2'),
        sidebarTitle: document.getElementById('sidebarTitle'),
        menuProntuario: document.getElementById('menuProntuario'),
        menuAgenda: document.getElementById('menuAgenda'),
        menuExames: document.getElementById('menuExames'),
        menuPrescricoes: document.getElementById('menuPrescricoes'),
        menuRelatorios: document.getElementById('menuRelatorios'),
        toggleSidebarBtn: document.getElementById('toggleSidebarBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        footerText: document.getElementById('footerText'),
        lgpdStamp: document.getElementById('lgpdStamp'),
        loginIcon: document.getElementById('loginIcon'),
        loginTitle: document.getElementById('loginTitle'),
        loginSubtitle: document.getElementById('loginSubtitle'),
        certIssuer: document.getElementById('certIssuer'),
        loginBtn: document.getElementById('loginBtn'),
        codeModalTitle: document.getElementById('codeModalTitle'),
        codeModalText: document.getElementById('codeModalText'),
        verifyBtn: document.getElementById('verifyBtn'),
        searchInput: document.getElementById('searchInput')
    };
    
    for (const [key, element] of Object.entries(elements)) {
        if (element && constants[key]) element.innerHTML = constants[key];
    }
    
    if (elements.searchInput) elements.searchInput.placeholder = constants.searchPlaceholder;
    
    // Logo
    const logoContainer = document.getElementById('logoContainer');
    if (logoContainer) {
        if (mode === 'hospitalar') {
            logoContainer.innerHTML = `<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="45" fill="#1e3c72" stroke="#ffd700"/><path d="M50 30 L50 70 M30 50 L70 50" stroke="#ffd700"/><circle cx="50" cy="50" r="12" fill="#ffd700"/></svg>`;
        } else {
            logoContainer.innerHTML = `<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="45" fill="#2c2c2c" stroke="#6b4e3a"/><path d="M50 30 L50 70 M30 50 L70 50" stroke="#6b4e3a"/><circle cx="50" cy="50" r="12" fill="#6b4e3a"/></svg>`;
        }
    }
}

function getFilteredPatients() {
    if (!patients || patients.length === 0) return [];
    if (!searchTerm) return patients;
    return patients.filter(p => 
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.room?.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function renderPatientsList() {
    const container = document.getElementById('patientsList');
    if (!container) return;
    
    const filtered = getFilteredPatients();
    container.innerHTML = '';
    document.getElementById('totalPatients').innerHTML = filtered.length;
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="padding: 20px; text-align: center;">Nenhum encontrado</div>';
        return;
    }
    
    filtered.forEach(patient => {
        const div = document.createElement('div');
        div.className = 'patient-list-item';
        if (patient.id === currentPatientId) div.classList.add('active');
        div.onclick = () => { currentPatientId = patient.id; renderPatientsList(); renderPatientContent(); };
        div.innerHTML = `
            <div class="patient-name">${constants.patientPrefix}${patient.name}</div>
            <div class="patient-room">${constants.roomIcon} ${patient.room}</div>
            <div class="patient-date">${constants.dateIcon} ${patient.admissionDate}</div>
            <div class="patient-badge-side">#${patient.id}</div>
        `;
        container.appendChild(div);
    });
}

function renderPatientContent() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;
    
    const patient = patients?.find(p => p.id === currentPatientId);
    if (!patient) {
        contentArea.innerHTML = '<div class="loading-spinner"><p>Selecione um paciente</p></div>';
        return;
    }
    
    const photoUrl = getPatientPhoto(patient);
    
    contentArea.innerHTML = `
        <div class="patient-card">
            <div class="patient-photo-section">
                <div class="polaroid">
                    <img src="${photoUrl}" class="polaroid-image" onerror="this.src='${generateAvatar(patient.initials || '??', patient.color || '#6c757d')}'">
                    <div class="polaroid-caption">${patient.name}</div>
                    <div class="polaroid-date">${constants.dateIcon} ${patient.admissionDate}</div>
                </div>
            </div>
            <div class="patient-header">
                <div><div class="patient-name-large">${constants.patientPrefix}${patient.name}</div>
                <div class="patient-id">#${String(patient.id).padStart(4, '0')}</div></div>
                <div class="patient-badge-large">${patient.room}</div>
            </div>
            <div class="info-grid">
                <div class="info-card"><div class="info-label">📊 IDADE</div><div class="info-value">${patient.age} anos</div></div>
                <div class="info-card"><div class="info-label">⚥ GÊNERO</div><div class="info-value">${patient.gender}</div></div>
                <div class="info-card"><div class="info-label">🩸 TIPO</div><div class="info-value">${patient.bloodType}</div></div>
                <div class="info-card"><div class="info-label">⚠️ ALERGIAS</div><div class="info-value">${patient.allergies}</div></div>
                <div class="info-card"><div class="info-label">💊 MEDICAÇÕES</div><div class="info-value">${patient.medications}</div></div>
                <div class="info-card"><div class="info-label">📅 ATUALIZAÇÃO</div><div class="info-value">${patient.lastUpdate}</div></div>
            </div>
            <div class="medical-section"><div class="section-title">${constants.diagnosisLabel}</div><div class="section-content">${patient.diagnosis}</div></div>
            <div class="medical-section"><div class="section-title">${constants.historyLabel}</div><div class="section-content">${patient.medicalHistory}</div></div>
            ${patient.patientHistory ? `<div class="medical-section"><div class="section-title">📋 HISTÓRICO COMPLETO</div><div class="section-content">${patient.patientHistory}</div></div>` : ''}
            <div class="protected-notes">
                <div class="protected-title">${constants.medicalNotesTitle}</div>
                ${observationsUnlocked ? `<div class="section-content">${patient.medicalNotes}</div>` : `<div class="password-prompt"><p>${constants.unlockMessage}</p><button class="btn-unlock" onclick="showCodeModal()">🔓 Autorizar Acesso</button></div>`}
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="showFullRecord(${patient.id})">${constants.fullRecordLabel}</button>
                <button class="btn btn-secondary" onclick="showExams(${patient.id})">${constants.examsLabel}</button>
            </div>
        </div>
    `;
}

function initializeUI() {
    updateDate();
    renderPatientsList();
    setupSearch();
    renderPatientContent();
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            renderPatientsList();
            const filtered = getFilteredPatients();
            if (filtered.length > 0) currentPatientId = filtered[0].id;
            renderPatientContent();
        });
    }
}

function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) dateElement.innerHTML = new Date().toLocaleDateString('pt-BR');
}

function toggleSidebar() {
    const sidebar = document.getElementById('patientsSidebar');
    const floatBtn = document.getElementById('toggleSidebarFloat');
    sidebarVisible = !sidebarVisible;
    if (sidebar) sidebar.classList.toggle('hidden', !sidebarVisible);
    if (floatBtn) floatBtn.classList.toggle('visible', !sidebarVisible);
}