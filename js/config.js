// ==================== CONFIGURAÇÕES DO SISTEMA ====================

const configs = {
    hospitalar: {
        systemTitle: 'HOSPITAL CENTRAL',
        systemSubtitle: 'Prontuário Eletrônico - Sistema Integrado de Saúde',
        accreditation1: '🏅 Acreditado Nível III',
        accreditation2: '⭐ Certificação Internacional JCI',
        sidebarTitle: '👥 PACIENTES INTERNADOS',
        menuProntuario: '📋 PRONTUÁRIO',
        menuAgenda: '📅 AGENDA MÉDICA',
        menuExames: '🔬 EXAMES LABORATORIAIS',
        menuPrescricoes: '💊 PRESCRIÇÕES',
        menuRelatorios: '📊 RELATÓRIOS',
        toggleSidebarBtn: '📁 Ocultar Lista',
        logoutBtn: '🔓 Sair / Trocar Certificado',
        footerText: '© 2024 Hospital Central | Em conformidade com a LGPD',
        lgpdStamp: '🔒 LGPD COMPLIANT',
        loginIcon: '🔐',
        loginTitle: 'Acesso ao Sistema',
        loginSubtitle: 'Autenticação via Certificado Digital',
        certIssuer: 'Emissor: ICP-Brasil - Autoridade Certificadora Saúde',
        loginBtn: '🔓 Acessar Sistema',
        codeModalTitle: '🔒 Acesso Restrito',
        codeModalText: 'As observações médicas são protegidas pela LGPD.',
        verifyBtn: '🔓 Visualizar Observações',
        searchPlaceholder: 'Buscar paciente...',
        patientPrefix: '',
        roomIcon: '🏥',
        dateIcon: '📅',
        dataFile: './dados/dados-hospitalar.json'
    },
    funeraria: {
        systemTitle: 'FUNERÁRIA PAZ ETERNA',
        systemSubtitle: 'Sistema de Laudos - Serviços Funerários e Necrotério',
        accreditation1: '🏅 Credenciada S.F.C.',
        accreditation2: '⭐ Selo de Qualidade Funerária',
        sidebarTitle: '⚰️ OCORRÊNCIAS FUNERÁRIAS',
        menuProntuario: '📋 LAUDOS',
        menuAgenda: '📅 AGENDA FUNERÁRIA',
        menuExames: '🔬 EXAMES NECROSCÓPICOS',
        menuPrescricoes: '⚱️ PREPARAÇÕES',
        menuRelatorios: '📊 RELATÓRIOS IML',
        toggleSidebarBtn: '📁 Ocultar Lista',
        logoutBtn: '🔓 Sair / Trocar Legista',
        footerText: '© 2024 Funerária Paz Eterna | Em conformidade com a LGPD',
        lgpdStamp: '⚰️ LAUDO CONFIDENCIAL - SIGILO FUNERÁRIO ⚰️',
        loginIcon: '⚰️',
        loginTitle: 'Acesso ao Sistema Funerário',
        loginSubtitle: 'Autenticação via Certificado Digital do Legista',
        certIssuer: 'Emissor: ICP-Brasil - Autoridade Certificadora Funerária',
        loginBtn: '🔓 Acessar Sistema',
        codeModalTitle: '🔒 Acesso Restrito - Laudo Necroscópico',
        codeModalText: 'O laudo necroscópico é protegido por sigilo funerário.',
        verifyBtn: '🔓 Visualizar Laudo',
        searchPlaceholder: 'Buscar falecido...',
        patientPrefix: '⚰️ ',
        roomIcon: '🏺',
        dateIcon: '📅 Óbito:',
        dataFile: './dados/dados-funeraria.json'
    }
};

function getCurrentConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'hospitalar';
    return { mode, config: configs[mode] };
}