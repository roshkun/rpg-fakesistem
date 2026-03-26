// ==================== SISTEMA PRINCIPAL ====================

let currentPatientId = 1;
let currentPage = 'prontuario';
let searchTerm = '';
let currentDoctor = null;
let currentDoctorCode = null;
let currentDoctorLastChange = null;
let observationsUnlocked = false;
let sidebarVisible = true;
let failedAttempts = 0;
let systemHacked = false;
let config = null;
let mode = null;
let isInitialized = false;

// ==================== FUNÇÕES AUXILIARES ====================

function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        dateElement.innerHTML = now.toLocaleDateString('pt-BR');
    }
}

function generateAvatar(initials, color) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50%25' y='50%25' font-size='80' font-weight='bold' fill='white' text-anchor='middle' dy='.3em'%3E${initials}%3C/text%3E%3C/svg%3E`;
}

function getPatientPhoto(patient) {
    if (!patient) return generateAvatar('??', '#6c757d');
    if (patient.photoUrl && patient.photoUrl.trim() !== '') return patient.photoUrl;
    return generateAvatar(patient.initials || '??', patient.color || '#6c757d');
}

function toggleSidebar() {
    const sidebar = document.getElementById('patientsSidebar');
    const floatBtn = document.getElementById('toggleSidebarFloat');
    sidebarVisible = !sidebarVisible;
    if (sidebarVisible) {
        if (sidebar) sidebar.classList.remove('hidden');
        if (floatBtn) floatBtn.classList.remove('visible');
        if (floatBtn) floatBtn.style.display = 'none';
    } else {
        if (sidebar) sidebar.classList.add('hidden');
        if (floatBtn) floatBtn.classList.add('visible');
        if (floatBtn) floatBtn.style.display = 'flex';
    }
}

// ==================== AUTENTICAÇÃO ====================

function authenticateWithCertificate() {
    const selectElement = document.getElementById('certificateSelect');
    if (!selectElement) {
        console.error('Elemento certificateSelect não encontrado');
        return;
    }
    
    const doctorId = selectElement.value;
    if (!doctorId) {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Selecione um profissional válido';
        }
        return;
    }
    
    const doctor = doctorsDB[doctorId];
    if (!doctor) {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Profissional não encontrado';
        }
        return;
    }
    
    const certInfo = getCertificateInfo(doctorId);
    
    if (certInfo && certInfo.status === 'Expirado') {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = `❌ Acesso Negado!<br>Certificado Digital EXPIRADO em ${certInfo.expirationDate}<br>Entre em contato com a administração.`;
        }
        return;
    }
    
    currentDoctor = doctor;
    currentDoctorCode = currentDoctor.observationCode;
    currentDoctorLastChange = currentDoctor.lastPasswordChange;
    currentDoctor.id = doctorId;
    
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.style.display = 'none';
    
    const appContainer = document.getElementById('appContainer');
    if (appContainer) appContainer.style.display = 'flex';
    
    const doctorNameSpan = document.getElementById('doctorName');
    if (doctorNameSpan) doctorNameSpan.innerHTML = `${currentDoctor.name} ✅`;
    
    const doctorCRMSpan = document.getElementById('doctorCRM');
    if (doctorCRMSpan) doctorCRMSpan.innerHTML = `${currentDoctor.crm} | Cert: ${certInfo?.serialNumber || 'N/A'}`;
    
    failedAttempts = 0;
    systemHacked = false;
    observationsUnlocked = false;
    initializeSystem();
}

function logout() {
    currentDoctor = null;
    currentDoctorCode = null;
    currentDoctorLastChange = null;
    observationsUnlocked = false;
    failedAttempts = 0;
    systemHacked = false;
    isInitialized = false;
    
    const appContainer = document.getElementById('appContainer');
    if (appContainer) appContainer.style.display = 'none';
    
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.style.display = 'flex';
    
    const certSelect = document.getElementById('certificateSelect');
    if (certSelect) certSelect.value = '';
    
    const loginError = document.getElementById('loginError');
    if (loginError) loginError.style.display = 'none';
}

// ==================== MODAL DE CÓDIGO ====================

function showCodeModal() {
    if (systemHacked) {
        observationsUnlocked = true;
        renderPatientContent();
        return;
    }
    
    observationsUnlocked = false;
    
    const codeInput = document.getElementById('accessCode');
    if (codeInput) codeInput.value = '';
    
    const codeError = document.getElementById('codeError');
    if (codeError) codeError.style.display = 'none';
    
    const attemptCounter = document.getElementById('attemptCounter');
    if (attemptCounter) attemptCounter.innerHTML = `Tentativas restantes: ${3 - failedAttempts}`;
    
    if (currentDoctor && currentDoctor.savedPassword && failedAttempts === 0 && codeInput) {
        codeInput.value = currentDoctor.savedPassword;
        setTimeout(() => {
            if (codeInput) {
                codeInput.style.backgroundColor = mode === 'hospitalar' ? '#e8f0fe' : '#3a2c2c';
                setTimeout(() => { if (codeInput) codeInput.style.backgroundColor = ''; }, 1000);
            }
        }, 100);
    }
    
    const codeModal = document.getElementById('codeModal');
    if (codeModal) codeModal.style.display = 'flex';
}

function verifyAccessCode() {
    if (systemHacked) {
        observationsUnlocked = true;
        closeCodeModal();
        renderPatientContent();
        return;
    }
    
    const codeInput = document.getElementById('accessCode');
    const code = codeInput ? codeInput.value : '';
    
    if (code === currentDoctorCode) {
        observationsUnlocked = true;
        failedAttempts = 0;
        closeCodeModal();
        renderPatientContent();
    } else {
        failedAttempts++;
        const errorDiv = document.getElementById('codeError');
        const attemptCounter = document.getElementById('attemptCounter');
        
        if (failedAttempts >= 3) {
            if (errorDiv) {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = `❌ Código incorreto. Tentativa ${failedAttempts}/3<br>${mode === 'hospitalar' ? '🔐' : '⚰️'} Última alteração: ${currentDoctorLastChange || 'não informada'}`;
            }
            if (attemptCounter) attemptCounter.innerHTML = `Tentativas esgotadas! Sistema bloqueado.`;
            setTimeout(() => {
                const codeModal = document.getElementById('codeModal');
                if (codeModal) codeModal.style.display = 'none';
                const errorModal = document.getElementById('errorModal');
                if (errorModal) errorModal.style.display = 'flex';
            }, 1500);
        } else {
            if (errorDiv) {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = `❌ Código incorreto. Tentativa ${failedAttempts}/3<br>${mode === 'hospitalar' ? '🔐' : '⚰️'} Última alteração: ${currentDoctorLastChange || 'não informada'}`;
            }
            if (attemptCounter) attemptCounter.innerHTML = `Tentativas restantes: ${3 - failedAttempts}`;
            if (codeInput) {
                codeInput.value = '';
                codeInput.focus();
            }
        }
    }
}

function simulateReload() {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) errorModal.style.display = 'none';
    systemHacked = true;
    observationsUnlocked = true;
    renderPatientContent();
}

function closeCodeModal() {
    const codeModal = document.getElementById('codeModal');
    if (codeModal) codeModal.style.display = 'none';
}

// ==================== LISTA DE PACIENTES ====================

function getFilteredPatients() {
    if (!patients || patients.length === 0) return [];
    if (!searchTerm) return patients;
    return patients.filter(p => 
        p && p.name && (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.room && p.room.toLowerCase().includes(searchTerm.toLowerCase())))
    );
}

function renderPatientsList() {
    const container = document.getElementById('patientsList');
    if (!container) return;
    
    const filtered = getFilteredPatients();
    container.innerHTML = '';
    
    const totalSpan = document.getElementById('totalPatients');
    if (totalSpan) totalSpan.innerHTML = filtered.length;
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: #6c757d;">Nenhum paciente encontrado</div>';
        return;
    }
    
    filtered.forEach(patient => {
        const div = document.createElement('div');
        div.className = 'patient-list-item';
        if (patient.id === currentPatientId) div.classList.add('active');
        div.onclick = () => selectPatient(patient.id);
        div.innerHTML = `
            <div class="patient-name">${config?.patientPrefix || ''}${patient.name || 'Sem nome'}</div>
            <div class="patient-room">${config?.roomIcon || '🏥'} ${patient.room || 'N/A'}</div>
            <div class="patient-date">${config?.dateIcon || '📅'} ${patient.admissionDate || 'N/A'}</div>
            <div class="patient-badge-side">#${patient.id || '?'}</div>
        `;
        container.appendChild(div);
    });
}

function selectPatient(id) { 
    currentPatientId = id; 
    renderPatientsList(); 
    if (currentPage === 'prontuario') renderPatientContent(); 
}

// ==================== RENDERIZAÇÃO DO PRONTUÁRIO ====================

function renderPatientContent() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;
    
    if (!patients || patients.length === 0) {
        contentArea.innerHTML = '<div class="loading-spinner"><p>Nenhum paciente carregado.</p></div>';
        return;
    }
    
    const patient = patients.find(p => p && p.id === currentPatientId);
    if (!patient) {
        contentArea.innerHTML = '<div class="loading-spinner"><p>Paciente não encontrado.</p></div>';
        return;
    }
    
    const photoUrl = getPatientPhoto(patient);
    
    const patientHistoryHtml = patient.patientHistory ? `
        <div class="medical-section history-section">
            <div class="section-title">${mode === 'hospitalar' ? '📋' : '⚰️'} HISTÓRICO ${mode === 'hospitalar' ? 'DO PACIENTE' : 'FUNERÁRIO'}</div>
            <div class="section-content" style="white-space: pre-line;">${patient.patientHistory}</div>
        </div>
    ` : '';
    
    const medicalNotesTitle = mode === 'hospitalar' ? '🔒 OBSERVAÇÕES MÉDICAS (LGPD)' : '🔒 LAUDO NECROSCÓPICO (SIGILO FUNERÁRIO)';
    const diagnosisTitle = mode === 'hospitalar' ? '📋 DIAGNÓSTICO' : '⚰️ CAUSA DA MORTE';
    const historyTitle = mode === 'hospitalar' ? '📜 HISTÓRICO MÉDICO' : '📜 HISTÓRICO CLÍNICO';
    const examsLabel = mode === 'hospitalar' ? '🔬 Ver Exames' : '🔬 Ver Exames Necroscópicos';
    const fullRecordLabel = mode === 'hospitalar' ? '📄 Ver Prontuário Completo' : '📄 Ver Laudo Completo';
    const unlockMessage = mode === 'hospitalar' ? '🔒 Conteúdo protegido pela LGPD' : '🔒 Laudo protegido por sigilo funerário';
    
    contentArea.innerHTML = `
        <div class="patient-card">
            <div class="patient-photo-section">
                <div class="polaroid">
                    <img src="${photoUrl}" class="polaroid-image" onerror="this.onerror=null; this.src='${generateAvatar(patient.initials || '??', patient.color || '#6c757d')}';">
                    <div class="polaroid-caption">${patient.name || 'Sem nome'}</div>
                    <div class="polaroid-date">${mode === 'hospitalar' ? '📸 Internação' : '⚰️ Óbito'}: ${patient.admissionDate || 'N/A'}</div>
                </div>
            </div>
            <div class="patient-header">
                <div class="patient-info-header">
                    <div class="patient-name-large">${config?.patientPrefix || ''}${patient.name || 'Sem nome'}</div>
                    <div class="patient-id">${mode === 'hospitalar' ? 'Prontuário' : 'Laudo'} #${String(patient.id || '0000').padStart(4, '0')}</div>
                </div>
                <div class="patient-badge-large">${patient.room || 'N/A'}</div>
            </div>
            <div class="info-grid">
                <div class="info-card"><div class="info-label">📊 IDADE</div><div class="info-value">${patient.age || '?'} anos</div></div>
                <div class="info-card"><div class="info-label">⚥ GÊNERO</div><div class="info-value">${patient.gender || 'Não informado'}</div></div>
                <div class="info-card"><div class="info-label">🩸 TIPO SANGUÍNEO</div><div class="info-value">${patient.bloodType || 'Não informado'}</div></div>
                <div class="info-card"><div class="info-label">⚠️ ALERGIAS</div><div class="info-value">${patient.allergies || 'Não informadas'}</div></div>
                <div class="info-card"><div class="info-label">💊 ${mode === 'hospitalar' ? 'MEDICAÇÕES' : 'MEDICAÇÕES PRÉVIAS'}</div><div class="info-value">${patient.medications || 'Nenhuma'}</div></div>
                <div class="info-card"><div class="info-label">📅 ATUALIZAÇÃO</div><div class="info-value">${patient.lastUpdate || 'N/A'}</div></div>
            </div>
            <div class="medical-section">
                <div class="section-title">${diagnosisTitle}</div>
                <div class="section-content"><strong>${patient.diagnosis || 'Não informado'}</strong></div>
            </div>
            <div class="medical-section">
                <div class="section-title">${historyTitle}</div>
                <div class="section-content">${patient.medicalHistory || 'Não informado'}</div>
            </div>
            ${patientHistoryHtml}
            <div class="protected-notes">
                <div class="protected-title">${medicalNotesTitle}</div>
                ${observationsUnlocked ? 
                    `<div class="section-content" style="color:${mode === 'hospitalar' ? '#856404' : '#e8c99a'};">${patient.medicalNotes || 'Nenhuma observação registrada.'}</div>` : 
                    `<div class="password-prompt"><p>${unlockMessage}</p><button class="btn-unlock" onclick="showCodeModal()">🔓 Autorizar Acesso com Código</button></div>`
                }
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="showFullRecord(${patient.id})">${fullRecordLabel}</button>
                <button class="btn btn-secondary" onclick="showExams(${patient.id})">${examsLabel}</button>
            </div>
        </div>`;
}

// ==================== MODAIS ====================

function showFullRecord(patientId) {
    const patient = patients.find(p => p && p.id === patientId);
    if (!patient) {
        alert('Paciente não encontrado');
        return;
    }
    
    const modalTitle = document.getElementById('genericModalTitle');
    const modalBody = document.getElementById('genericModalBody');
    
    if (!modalTitle || !modalBody) return;
    
    const title = mode === 'hospitalar' ? `Prontuário Completo - ${patient.name || 'Desconhecido'}` : `Laudo Necroscópico - ${patient.name || 'Desconhecido'}`;
    modalTitle.innerHTML = title;
    modalBody.innerHTML = `
        <div style="line-height: 1.8;">
            <p><strong>📋 Nome:</strong> ${patient.name || 'Não informado'}</p>
            <p><strong>📊 Idade:</strong> ${patient.age || '?'} anos</p>
            <p><strong>⚥ Gênero:</strong> ${patient.gender || 'Não informado'}</p>
            <p><strong>🩸 Tipo Sanguíneo:</strong> ${patient.bloodType || 'Não informado'}</p>
            <p><strong>🛏️ Leito:</strong> ${patient.room || 'N/A'}</p>
            <p><strong>📋 ${mode === 'hospitalar' ? 'Diagnóstico' : 'Causa da Morte'}:</strong> ${patient.diagnosis || 'Não informado'}</p>
            <p><strong>📜 Histórico:</strong> ${patient.medicalHistory || 'Não informado'}</p>
            <p><strong>💊 ${mode === 'hospitalar' ? 'Medicações' : 'Medicações Prévias'}:</strong> ${patient.medications || 'Nenhuma'}</p>
            <p><strong>⚠️ Alergias:</strong> ${patient.allergies || 'Não informadas'}</p>
            ${observationsUnlocked ? `<p><strong>${mode === 'hospitalar' ? '🔒 Observações' : '🔒 Laudo'}:</strong> ${patient.medicalNotes || 'Nenhuma observação registrada.'}</p>` : '<p><em>🔒 Informações protegidas. Autorize acesso no prontuário.</em></p>'}
            <p><strong>📅 Última Atualização:</strong> ${patient.lastUpdate || 'N/A'}</p>
            <hr>
            <p style="color: #6c757d; font-size: 0.8rem;"><strong>🔒 Em conformidade com a LGPD</strong></p>
        </div>
    `;
    
    const genericModal = document.getElementById('genericModal');
    if (genericModal) genericModal.style.display = 'flex';
}

function showExams(patientId) {
    const patient = patients.find(p => p && p.id === patientId);
    if (!patient) {
        alert('Paciente não encontrado');
        return;
    }
    
    const modalTitle = document.getElementById('genericModalTitle');
    const modalBody = document.getElementById('genericModalBody');
    
    if (!modalTitle || !modalBody) return;
    
    const exams = mode === 'hospitalar' 
        ? ["Hemograma completo: Em análise", "Glicemia: 92 mg/dL", "Colesterol total: 168 mg/dL", "Urina tipo I: Sem alterações", "Raio-X tórax: Normal", "Eletrocardiograma: Ritmo sinusal"]
        : ["Necropsia: Em análise preliminar", "Toxicologia: Aguardando resultado", "Histopatologia: Em andamento", "Teste de Conservação: Normal", "Raio-X: Sem alterações externas", "Coleta de DNA: Em processamento"];
    
    const title = mode === 'hospitalar' ? `Exames Laboratoriais - ${patient.name || 'Desconhecido'}` : `Exames Necroscópicos - ${patient.name || 'Desconhecido'}`;
    modalTitle.innerHTML = title;
    modalBody.innerHTML = `<ul style="margin-left:20px;">${exams.map(e => `<li>${e}</li>`).join('')}</ul>`;
    
    const genericModal = document.getElementById('genericModal');
    if (genericModal) genericModal.style.display = 'flex';
}

function closeGenericModal() { 
    const genericModal = document.getElementById('genericModal');
    if (genericModal) genericModal.style.display = 'none'; 
}

// ==================== NAVEGAÇÃO ====================

function showSystemUnavailable(pageName) {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="system-unavailable">
            <div class="system-unavailable-icon">🔧</div>
            <h2>Sistema Indisponível</h2>
            <p>O módulo ${pageName} está temporariamente indisponível.</p>
            <button class="btn btn-primary" onclick="goToProntuario()">Voltar</button>
        </div>
    `;
}

function goToProntuario() { 
    currentPage = 'prontuario'; 
    updateMenuActive('prontuario'); 
    renderPatientContent(); 
}

function updateMenuActive(page) { 
    document.querySelectorAll('.menu-item').forEach(item => { 
        if (item.getAttribute('data-page') === page) item.classList.add('active'); 
        else item.classList.remove('active'); 
    }); 
}

function setupMenuNavigation() { 
    document.querySelectorAll('.menu-item').forEach(item => { 
        item.addEventListener('click', () => { 
            const page = item.getAttribute('data-page'); 
            currentPage = page; 
            updateMenuActive(page); 
            if (page === 'prontuario') renderPatientContent(); 
            else showSystemUnavailable(page); 
        }); 
    }); 
}

function setupSearch() { 
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => { 
            searchTerm = e.target.value; 
            renderPatientsList(); 
            const filtered = getFilteredPatients(); 
            if (filtered.length > 0 && !filtered.find(p => p.id === currentPatientId)) {
                selectPatient(filtered[0].id); 
            }
        });
    }
}

// ==================== INICIALIZAÇÃO ====================

function applyConfig() {
    if (!config) return;
    
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
    
    if (elements.systemTitle) elements.systemTitle.innerHTML = config.systemTitle || 'Sistema';
    if (elements.systemSubtitle) elements.systemSubtitle.innerHTML = config.systemSubtitle || '';
    if (elements.accreditationLine1) elements.accreditationLine1.innerHTML = config.accreditation1 || '';
    if (elements.accreditationLine2) elements.accreditationLine2.innerHTML = config.accreditation2 || '';
    if (elements.sidebarTitle) elements.sidebarTitle.innerHTML = config.sidebarTitle || 'Pacientes';
    if (elements.menuProntuario) elements.menuProntuario.innerHTML = config.menuProntuario || 'PRONTUÁRIO';
    if (elements.menuAgenda) elements.menuAgenda.innerHTML = config.menuAgenda || 'AGENDA';
    if (elements.menuExames) elements.menuExames.innerHTML = config.menuExames || 'EXAMES';
    if (elements.menuPrescricoes) elements.menuPrescricoes.innerHTML = config.menuPrescricoes || 'PRESCRIÇÕES';
    if (elements.menuRelatorios) elements.menuRelatorios.innerHTML = config.menuRelatorios || 'RELATÓRIOS';
    if (elements.toggleSidebarBtn) elements.toggleSidebarBtn.innerHTML = config.toggleSidebarBtn || '📁 Ocultar Lista';
    if (elements.logoutBtn) elements.logoutBtn.innerHTML = config.logoutBtn || '🔓 Sair';
    if (elements.footerText) elements.footerText.innerHTML = config.footerText || '© Sistema';
    if (elements.lgpdStamp) elements.lgpdStamp.innerHTML = config.lgpdStamp || '🔒 LGPD';
    if (elements.loginIcon) elements.loginIcon.innerHTML = config.loginIcon || '🔐';
    if (elements.loginTitle) elements.loginTitle.innerHTML = config.loginTitle || 'Acesso';
    if (elements.loginSubtitle) elements.loginSubtitle.innerHTML = config.loginSubtitle || '';
    if (elements.certIssuer) elements.certIssuer.innerHTML = config.certIssuer || 'ICP-Brasil';
    if (elements.loginBtn) elements.loginBtn.innerHTML = config.loginBtn || 'Acessar';
    if (elements.codeModalTitle) elements.codeModalTitle.innerHTML = config.codeModalTitle || 'Acesso Restrito';
    if (elements.codeModalText) elements.codeModalText.innerHTML = config.codeModalText || '';
    if (elements.verifyBtn) elements.verifyBtn.innerHTML = config.verifyBtn || 'Visualizar';
    if (elements.searchInput) elements.searchInput.placeholder = config.searchPlaceholder || 'Buscar...';
    
    const logoContainer = document.getElementById('logoContainer');
    if (logoContainer) {
        if (mode === 'hospitalar') {
            logoContainer.innerHTML = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#1e3c72" stroke="#ffd700" stroke-width="2"/><path d="M50 30 L50 70 M30 50 L70 50" stroke="#ffd700" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="12" fill="#ffd700" stroke="none"/><path d="M50 38 L50 62 M38 50 L62 50" stroke="#1e3c72" stroke-width="2" stroke-linecap="round"/></svg>`;
        } else {
            logoContainer.innerHTML = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#2c2c2c" stroke="#6b4e3a" stroke-width="2"/><path d="M50 30 L50 70 M30 50 L70 50" stroke="#6b4e3a" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="12" fill="#6b4e3a" stroke="none"/><path d="M50 38 L50 62 M38 50 L62 50" stroke="#2c2c2c" stroke-width="2" stroke-linecap="round"/></svg>`;
        }
    }
}

function initializeSystem() {
    if (isInitialized) return;
    
    updateDate();
    
    if (!patients || patients.length === 0) {
        console.warn('Aguardando pacientes...');
        setTimeout(() => {
            if (patients && patients.length > 0) {
                renderPatientsList();
                setupMenuNavigation();
                setupSearch();
                currentPatientId = patients[0]?.id || 1;
                renderPatientContent();
                isInitialized = true;
            }
        }, 500);
        return;
    }
    
    renderPatientsList();
    setupMenuNavigation();
    setupSearch();
    currentPatientId = patients[0]?.id || 1;
    renderPatientContent();
    isInitialized = true;
}

async function init() {
    console.log('🚀 Iniciando sistema...');
    console.log('📋 Modo:', mode);
    
    // Mostrar loading
    const contentArea = document.getElementById('contentArea');
    if (contentArea) {
        contentArea.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>🔄 Carregando dados...</p>
            </div>
        `;
    }
    
    // Carregar dados
    const success = await loadData(mode);
    
    if (!success) {
        console.error('❌ Falha ao carregar dados');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="loading-spinner">
                    <div class="error-icon" style="font-size:3rem;">⚠️</div>
                    <h3 style="color:#dc3545;">Erro ao carregar dados</h3>
                    <p>Não foi possível carregar os dados.</p>
                    <button class="btn btn-primary" onclick="location.reload()" style="margin-top:20px;">🔄 Tentar Novamente</button>
                </div>
            `;
        }
        return;
    }
    
    console.log('✅ Dados carregados, atualizando select...');
    updateDoctorSelect();
    
    console.log('✅ Mostrando modal de login...');
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.style.display = 'flex';
}

// ==================== EVENTOS ====================

window.onclick = function(event) {
    const genericModal = document.getElementById('genericModal');
    const codeModal = document.getElementById('codeModal');
    const errorModal = document.getElementById('errorModal');
    
    if (event.target === genericModal) closeGenericModal();
    if (event.target === codeModal) closeCodeModal();
    if (event.target === errorModal && errorModal) errorModal.style.display = 'none';
};

// ==================== EXPORTAR FUNÇÕES GLOBAIS ====================

window.toggleSidebar = toggleSidebar;
window.logout = logout;
window.authenticateWithCertificate = authenticateWithCertificate;
window.showCodeModal = showCodeModal;
window.verifyAccessCode = verifyAccessCode;
window.simulateReload = simulateReload;
window.closeCodeModal = closeCodeModal;
window.showFullRecord = showFullRecord;
window.showExams = showExams;
window.closeGenericModal = closeGenericModal;
window.goToProntuario = goToProntuario;

// ==================== INICIALIZAÇÃO ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado');
    const { mode: currentMode, config: currentConfig } = getCurrentConfig();
    mode = currentMode;
    config = currentConfig;
    document.body.className = mode;
    applyConfig();
    init();
});