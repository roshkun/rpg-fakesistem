// ==================== SISTEMA PRINCIPAL ====================

// Variáveis globais
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
    const now = new Date();
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.innerHTML = now.toLocaleDateString('pt-BR');
    }
}

function generateAvatar(initials, color) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50%25' y='50%25' font-size='80' font-weight='bold' fill='white' text-anchor='middle' dy='.3em'%3E${initials}%3C/text%3E%3C/svg%3E`;
}

function getPatientPhoto(patient) {
    if (patient.photoUrl && patient.photoUrl.trim() !== '') {
        return patient.photoUrl;
    }
    return generateAvatar(patient.initials, patient.color);
}

function toggleSidebar() {
    const sidebar = document.getElementById('patientsSidebar');
    const floatBtn = document.getElementById('toggleSidebarFloat');
    sidebarVisible = !sidebarVisible;
    
    if (sidebarVisible) {
        sidebar.classList.remove('hidden');
        floatBtn.classList.remove('visible');
        if (floatBtn) floatBtn.style.display = 'none';
    } else {
        sidebar.classList.add('hidden');
        floatBtn.classList.add('visible');
        if (floatBtn) floatBtn.style.display = 'flex';
    }
}

// ==================== AUTENTICAÇÃO ====================

function authenticateWithCertificate() {
    const doctorId = document.getElementById('certificateSelect').value;
    if (!doctorId) {
        document.getElementById('loginError').style.display = 'block';
        return;
    }
    
    currentDoctor = doctorsDB[doctorId];
    currentDoctorCode = currentDoctor.observationCode;
    currentDoctorLastChange = currentDoctor.lastPasswordChange;
    currentDoctor.id = doctorId;
    
    // Fechar modal de login
    document.getElementById('loginModal').style.display = 'none';
    
    // Mostrar o container principal
    const appContainer = document.getElementById('appContainer');
    appContainer.style.display = 'flex';
    
    // Atualizar informações do médico na sidebar
    document.getElementById('doctorName').innerHTML = currentDoctor.name;
    document.getElementById('doctorCRM').innerHTML = currentDoctor.crm;
    
    // Resetar estados
    failedAttempts = 0;
    systemHacked = false;
    observationsUnlocked = false;
    
    // Inicializar o sistema
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
    
    // Esconder o container principal
    document.getElementById('appContainer').style.display = 'none';
    
    // Mostrar modal de login
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('certificateSelect').value = '';
    document.getElementById('loginError').style.display = 'none';
}

// ==================== MODAL DE CÓDIGO ====================

function showCodeModal() {
    if (systemHacked) {
        observationsUnlocked = true;
        renderPatientContent();
        return;
    }
    
    observationsUnlocked = false;
    document.getElementById('accessCode').value = '';
    document.getElementById('codeError').style.display = 'none';
    document.getElementById('attemptCounter').innerHTML = `Tentativas restantes: ${3 - failedAttempts}`;
    
    if (currentDoctor && currentDoctor.savedPassword && failedAttempts === 0) {
        document.getElementById('accessCode').value = currentDoctor.savedPassword;
        setTimeout(() => {
            const input = document.getElementById('accessCode');
            input.style.backgroundColor = mode === 'hospitalar' ? '#e8f0fe' : '#3a2c2c';
            setTimeout(() => { input.style.backgroundColor = ''; }, 1000);
        }, 100);
    }
    
    document.getElementById('codeModal').style.display = 'flex';
}

function verifyAccessCode() {
    if (systemHacked) {
        observationsUnlocked = true;
        closeCodeModal();
        renderPatientContent();
        return;
    }
    
    const code = document.getElementById('accessCode').value;
    if (code === currentDoctorCode) {
        observationsUnlocked = true;
        failedAttempts = 0;
        closeCodeModal();
        renderPatientContent();
    } else {
        failedAttempts++;
        const errorDiv = document.getElementById('codeError');
        
        if (failedAttempts >= 3) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = `❌ Código incorreto. Tentativa ${failedAttempts}/3<br>${mode === 'hospitalar' ? '🔐' : '⚰️'} Última alteração: ${currentDoctorLastChange || 'não informada'}`;
            document.getElementById('attemptCounter').innerHTML = `Tentativas esgotadas! Sistema bloqueado.`;
            setTimeout(() => {
                document.getElementById('codeModal').style.display = 'none';
                document.getElementById('errorModal').style.display = 'flex';
            }, 1500);
        } else {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = `❌ Código incorreto. Tentativa ${failedAttempts}/3<br>${mode === 'hospitalar' ? '🔐' : '⚰️'} Última alteração: ${currentDoctorLastChange || 'não informada'}`;
            document.getElementById('attemptCounter').innerHTML = `Tentativas restantes: ${3 - failedAttempts}`;
            document.getElementById('accessCode').value = '';
            document.getElementById('accessCode').focus();
        }
    }
}

function simulateReload() {
    document.getElementById('errorModal').style.display = 'none';
    systemHacked = true;
    observationsUnlocked = true;
    renderPatientContent();
}

function closeCodeModal() {
    document.getElementById('codeModal').style.display = 'none';
}

// ==================== LISTA DE PACIENTES ====================

function getFilteredPatients() {
    if (!searchTerm) return patients;
    return patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function renderPatientsList() {
    const container = document.getElementById('patientsList');
    if (!container) return;
    
    const filtered = getFilteredPatients();
    container.innerHTML = '';
    document.getElementById('totalPatients').innerHTML = filtered.length;
    
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
            <div class="patient-name">${config.patientPrefix}${patient.name}</div>
            <div class="patient-room">${config.roomIcon} ${patient.room}</div>
            <div class="patient-date">${config.dateIcon} ${patient.admissionDate}</div>
            <div class="patient-badge-side">#${patient.id}</div>
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
    if (!patients || patients.length === 0) {
        console.error('Nenhum paciente carregado');
        return;
    }
    
    const patient = patients.find(p => p.id === currentPatientId);
    if (!patient) {
        console.error('Paciente não encontrado:', currentPatientId);
        return;
    }
    
    const photoUrl = getPatientPhoto(patient);
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;
    
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
                    <img src="${photoUrl}" class="polaroid-image" onerror="this.onerror=null; this.src='${generateAvatar(patient.initials, patient.color)}';">
                    <div class="polaroid-caption">${patient.name}</div>
                    <div class="polaroid-date">${mode === 'hospitalar' ? '📸 Internação' : '⚰️ Óbito'}: ${patient.admissionDate}</div>
                </div>
            </div>
            <div class="patient-header">
                <div class="patient-info-header">
                    <div class="patient-name-large">${config.patientPrefix}${patient.name}</div>
                    <div class="patient-id">${mode === 'hospitalar' ? 'Prontuário' : 'Laudo'} #${String(patient.id).padStart(4, '0')}</div>
                </div>
                <div class="patient-badge-large">${patient.room}</div>
            </div>
            <div class="info-grid">
                <div class="info-card"><div class="info-label">📊 IDADE</div><div class="info-value">${patient.age} anos</div></div>
                <div class="info-card"><div class="info-label">⚥ GÊNERO</div><div class="info-value">${patient.gender}</div></div>
                <div class="info-card"><div class="info-label">🩸 TIPO SANGUÍNEO</div><div class="info-value">${patient.bloodType}</div></div>
                <div class="info-card"><div class="info-label">⚠️ ALERGIAS</div><div class="info-value">${patient.allergies}</div></div>
                <div class="info-card"><div class="info-label">💊 ${mode === 'hospitalar' ? 'MEDICAÇÕES' : 'MEDICAÇÕES PRÉVIAS'}</div><div class="info-value">${patient.medications}</div></div>
                <div class="info-card"><div class="info-label">📅 ATUALIZAÇÃO</div><div class="info-value">${patient.lastUpdate}</div></div>
            </div>
            <div class="medical-section">
                <div class="section-title">${diagnosisTitle}</div>
                <div class="section-content"><strong>${patient.diagnosis}</strong></div>
            </div>
            <div class="medical-section">
                <div class="section-title">${historyTitle}</div>
                <div class="section-content">${patient.medicalHistory}</div>
            </div>
            ${patientHistoryHtml}
            <div class="protected-notes">
                <div class="protected-title">${medicalNotesTitle}</div>
                ${observationsUnlocked ? 
                    `<div class="section-content" style="color:${mode === 'hospitalar' ? '#856404' : '#d4af7a'};">${patient.medicalNotes}</div>` : 
                    `<div class="password-prompt"><p>${unlockMessage}</p><button class="btn-unlock" onclick="showCodeModal()">🔓 Autorizar Acesso com Código</button></div>`
                }
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="showFullRecord(${patient.id})">${fullRecordLabel}</button>
                <button class="btn btn-secondary" onclick="showExams(${patient.id})">${examsLabel}</button>
            </div>
        </div>
    `;
}

// ==================== MODAIS DE VISUALIZAÇÃO ====================

function showFullRecord(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    const title = mode === 'hospitalar' ? `Prontuário Completo - ${patient.name}` : `Laudo Necroscópico - ${patient.name}`;
    
    document.getElementById('genericModalTitle').innerHTML = title;
    document.getElementById('genericModalBody').innerHTML = `
        <div style="line-height: 1.8;">
            <p><strong>📋 Nome:</strong> ${patient.name}</p>
            <p><strong>📊 Idade:</strong> ${patient.age} anos</p>
            <p><strong>⚥ Gênero:</strong> ${patient.gender}</p>
            <p><strong>🩸 Tipo Sanguíneo:</strong> ${patient.bloodType}</p>
            <p><strong>🛏️ Leito:</strong> ${patient.room}</p>
            <p><strong>📋 ${mode === 'hospitalar' ? 'Diagnóstico' : 'Causa da Morte'}:</strong> ${patient.diagnosis}</p>
            <p><strong>📜 Histórico:</strong> ${patient.medicalHistory}</p>
            <p><strong>💊 ${mode === 'hospitalar' ? 'Medicações' : 'Medicações Prévias'}:</strong> ${patient.medications}</p>
            <p><strong>⚠️ Alergias:</strong> ${patient.allergies}</p>
            ${observationsUnlocked ? `<p><strong>${mode === 'hospitalar' ? '🔒 Observações' : '🔒 Laudo'}:</strong> ${patient.medicalNotes}</p>` : '<p><em>🔒 Informações protegidas. Autorize acesso no prontuário.</em></p>'}
            <p><strong>📅 Última Atualização:</strong> ${patient.lastUpdate}</p>
            <hr>
            <p style="color: #6c757d; font-size: 0.8rem;"><strong>🔒 Em conformidade com a LGPD</strong></p>
        </div>
    `;
    document.getElementById('genericModal').style.display = 'flex';
}

function showExams(patientId) {
    const exams = mode === 'hospitalar' 
        ? ["Hemograma completo: Dentro dos parâmetros normais", "Glicemia: 92 mg/dL", "Colesterol total: 168 mg/dL", "Urina tipo I: Sem alterações", "Raio-X tórax: Normal", "Eletrocardiograma: Ritmo sinusal"]
        : ["Necropsia: Em análise preliminar", "Toxicologia: Aguardando resultado", "Histopatologia: Em andamento", "Teste de Conservação: Normal", "Raio-X: Sem alterações post-mortem", "Coleta de DNA: Em processamento"];
    
    const title = mode === 'hospitalar' ? `Exames Laboratoriais - ${patients.find(p=>p.id===patientId).name}` : `Exames Necroscópicos - ${patients.find(p=>p.id===patientId).name}`;
    
    document.getElementById('genericModalTitle').innerHTML = title;
    document.getElementById('genericModalBody').innerHTML = `<ul style="margin-left:20px;">${exams.map(e=>`<li>${e}</li>`).join('')}</ul>`;
    document.getElementById('genericModal').style.display = 'flex';
}

function closeGenericModal() {
    document.getElementById('genericModal').style.display = 'none';
}

// ==================== NAVEGAÇÃO ====================

function showSystemUnavailable(pageName) {
    document.getElementById('contentArea').innerHTML = `
        <div class="system-unavailable">
            <div class="system-unavailable-icon">🔧</div>
            <h2>Sistema Indisponível</h2>
            <p>O módulo ${pageName} está temporariamente indisponível.</p>
            <button class="btn btn-primary" onclick="goToProntuario()">Voltar para Prontuário</button>
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
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function setupMenuNavigation() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            currentPage = page;
            updateMenuActive(page);
            if (page === 'prontuario') {
                renderPatientContent();
            } else {
                showSystemUnavailable(page);
            }
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
    // Aplicar textos da configuração
    document.getElementById('systemTitle').innerHTML = config.systemTitle;
    document.getElementById('systemSubtitle').innerHTML = config.systemSubtitle;
    document.getElementById('accreditationLine1').innerHTML = config.accreditation1;
    document.getElementById('accreditationLine2').innerHTML = config.accreditation2;
    document.getElementById('sidebarTitle').innerHTML = config.sidebarTitle;
    document.getElementById('menuProntuario').innerHTML = config.menuProntuario;
    document.getElementById('menuAgenda').innerHTML = config.menuAgenda;
    document.getElementById('menuExames').innerHTML = config.menuExames;
    document.getElementById('menuPrescricoes').innerHTML = config.menuPrescricoes;
    document.getElementById('menuRelatorios').innerHTML = config.menuRelatorios;
    document.getElementById('toggleSidebarBtn').innerHTML = config.toggleSidebarBtn;
    document.getElementById('logoutBtn').innerHTML = config.logoutBtn;
    document.getElementById('footerText').innerHTML = config.footerText;
    document.getElementById('lgpdStamp').innerHTML = config.lgpdStamp;
    document.getElementById('loginIcon').innerHTML = config.loginIcon;
    document.getElementById('loginTitle').innerHTML = config.loginTitle;
    document.getElementById('loginSubtitle').innerHTML = config.loginSubtitle;
    document.getElementById('certIssuer').innerHTML = config.certIssuer;
    document.getElementById('loginBtn').innerHTML = config.loginBtn;
    document.getElementById('codeModalTitle').innerHTML = config.codeModalTitle;
    document.getElementById('codeModalText').innerHTML = config.codeModalText;
    document.getElementById('verifyBtn').innerHTML = config.verifyBtn;
    document.getElementById('searchInput').placeholder = config.searchPlaceholder;
    
    // Atualizar logo
    const logoContainer = document.getElementById('logoContainer');
    if (mode === 'hospitalar') {
        logoContainer.innerHTML = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#1e3c72" stroke="#ffd700" stroke-width="2"/><path d="M50 30 L50 70 M30 50 L70 50" stroke="#ffd700" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="12" fill="#ffd700" stroke="none"/><path d="M50 38 L50 62 M38 50 L62 50" stroke="#1e3c72" stroke-width="2" stroke-linecap="round"/></svg>`;
    } else {
        logoContainer.innerHTML = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#2c2c2c" stroke="#6b4e3a" stroke-width="2"/><path d="M50 30 L50 70 M30 50 L70 50" stroke="#6b4e3a" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="12" fill="#6b4e3a" stroke="none"/><path d="M50 38 L50 62 M38 50 L62 50" stroke="#2c2c2c" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
}

function initializeSystem() {
    if (isInitialized) return;
    
    console.log('Inicializando sistema...');
    
    // Atualizar data
    updateDate();
    
    // Renderizar lista de pacientes
    renderPatientsList();
    
    // Configurar navegação do menu
    setupMenuNavigation();
    
    // Configurar busca
    setupSearch();
    
    // Renderizar conteúdo do paciente atual
    if (patients && patients.length > 0) {
        currentPatientId = patients[0].id;
        renderPatientContent();
    }
    
    isInitialized = true;
    console.log('Sistema inicializado com sucesso!');
}

async function init() {
    console.log('Iniciando carregamento de dados...');
    
    // Carregar dados
    const success = await loadDataFromFile(config.dataFile);
    
    if (!success) {
        document.getElementById('contentArea').innerHTML = `
            <div class="loading-spinner">
                <div class="error-icon" style="font-size:3rem;">⚠️</div>
                <h3 style="color:#dc3545;">Erro ao carregar dados</h3>
                <p>Não foi possível carregar o arquivo ${config.dataFile}</p>
                <p style="font-size:0.8rem; margin-top:10px;">Verifique se o arquivo existe no servidor.</p>
                <p style="font-size:0.8rem; margin-top:5px;">Caminho completo: ${window.location.href}${config.dataFile}</p>
                <button class="btn btn-primary" onclick="location.reload()" style="margin-top:20px;">🔄 Tentar Novamente</button>
            </div>
        `;
        return;
    }
    
    console.log('Dados carregados:', { doctors: Object.keys(doctorsDB).length, patients: patients.length });
    
    // Atualizar select de profissionais
    updateDoctorSelect();
    
    // Mostrar modal de login
    document.getElementById('loginModal').style.display = 'flex';
}

// ==================== EVENTOS GLOBAIS ====================

window.onclick = function(event) {
    const genericModal = document.getElementById('genericModal');
    const codeModal = document.getElementById('codeModal');
    const errorModal = document.getElementById('errorModal');
    
    if (event.target === genericModal) closeGenericModal();
    if (event.target === codeModal) closeCodeModal();
    if (event.target === errorModal) errorModal.style.display = 'none';
};

// ==================== INICIALIZAÇÃO DO SISTEMA ====================

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, obtendo configuração...');
    
    // Obter configuração e modo
    const { mode: currentMode, config: currentConfig } = getCurrentConfig();
    mode = currentMode;
    config = currentConfig;
    
    console.log('Modo:', mode);
    console.log('Arquivo de dados:', config.dataFile);
    
    // Aplicar classe CSS
    document.body.className = mode;
    
    // Aplicar configurações de texto
    applyConfig();
    
    // Inicializar funções globais
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
    
    // Iniciar sistema
    init();
});