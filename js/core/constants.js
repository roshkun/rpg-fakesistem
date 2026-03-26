// ==================== CONSTANTES DO SISTEMA ====================

const CONSTANTS = {
    hospitalar: {
        // Header
        systemTitle: 'HOSPITAL CENTRAL',
        systemSubtitle: 'Prontuário Eletrônico - Sistema Integrado de Saúde',
        accreditation1: '🏅 Acreditado Nível III',
        accreditation2: '⭐ Certificação Internacional JCI',
        
        // Sidebar
        sidebarTitle: '👥 PACIENTES INTERNADOS',
        
        // Menu
        menuProntuario: '📋 PRONTUÁRIO',
        menuAgenda: '📅 AGENDA MÉDICA',
        menuExames: '🔬 EXAMES LABORATORIAIS',
        menuPrescricoes: '💊 PRESCRIÇÕES',
        menuRelatorios: '📊 RELATÓRIOS',
        
        // Botões
        toggleSidebarBtn: '📁 Ocultar Lista',
        logoutBtn: '🔓 Sair / Trocar Certificado',
        
        // Footer
        footerText: '© 2024 Hospital Central | Em conformidade com a LGPD',
        lgpdStamp: '🔒 LGPD COMPLIANT',
        
        // Login
        loginIcon: '🔐',
        loginTitle: 'Acesso ao Sistema',
        loginSubtitle: 'Autenticação via Certificado Digital',
        certIssuer: 'Emissor: ICP-Brasil - Autoridade Certificadora Saúde',
        loginBtn: '🔓 Acessar Sistema',
        
        // Código
        codeModalTitle: '🔒 Acesso Restrito',
        codeModalText: 'As observações médicas são protegidas pela LGPD.',
        verifyBtn: '🔓 Visualizar Observações',
        
        // Busca
        searchPlaceholder: 'Buscar paciente...',
        
        // Ícones
        patientPrefix: '',
        roomIcon: '🏥',
        dateIcon: '📅',
        
        // Labels
        diagnosisLabel: '📋 DIAGNÓSTICO',
        historyLabel: '📜 HISTÓRICO MÉDICO',
        examsLabel: '🔬 Ver Exames',
        fullRecordLabel: '📄 Ver Prontuário Completo',
        unlockMessage: '🔒 Conteúdo protegido pela LGPD',
        medicalNotesTitle: '🔒 OBSERVAÇÕES MÉDICAS (LGPD)'
    },
    
    funeraria: {
        // Header
        systemTitle: 'FUNERÁRIA PAZ ETERNA',
        systemSubtitle: 'Sistema de Laudos - Serviços Funerários e Necrotério',
        accreditation1: '🏅 Credenciada S.F.C.',
        accreditation2: '⭐ Selo de Qualidade Funerária',
        
        // Sidebar
        sidebarTitle: '⚰️ OCORRÊNCIAS FUNERÁRIAS',
        
        // Menu
        menuProntuario: '📋 LAUDOS',
        menuAgenda: '📅 AGENDA FUNERÁRIA',
        menuExames: '🔬 EXAMES NECROSCÓPICOS',
        menuPrescricoes: '⚱️ PREPARAÇÕES',
        menuRelatorios: '📊 RELATÓRIOS IML',
        
        // Botões
        toggleSidebarBtn: '📁 Ocultar Lista',
        logoutBtn: '🔓 Sair / Trocar Legista',
        
        // Footer
        footerText: '© 2024 Funerária Paz Eterna | Em conformidade com a LGPD',
        lgpdStamp: '⚰️ LAUDO CONFIDENCIAL - SIGILO FUNERÁRIO ⚰️',
        
        // Login
        loginIcon: '⚰️',
        loginTitle: 'Acesso ao Sistema Funerário',
        loginSubtitle: 'Autenticação via Certificado Digital do Legista',
        certIssuer: 'Emissor: ICP-Brasil - Autoridade Certificadora Funerária',
        loginBtn: '🔓 Acessar Sistema',
        
        // Código
        codeModalTitle: '🔒 Acesso Restrito - Laudo Necroscópico',
        codeModalText: 'O laudo necroscópico é protegido por sigilo funerário.',
        verifyBtn: '🔓 Visualizar Laudo',
        
        // Busca
        searchPlaceholder: 'Buscar falecido...',
        
        // Ícones
        patientPrefix: '⚰️ ',
        roomIcon: '🏺',
        dateIcon: '📅 Óbito:',
        
        // Labels
        diagnosisLabel: '⚰️ CAUSA DA MORTE',
        historyLabel: '📜 HISTÓRICO CLÍNICO',
        examsLabel: '🔬 Ver Exames Necroscópicos',
        fullRecordLabel: '📄 Ver Laudo Completo',
        unlockMessage: '🔒 Laudo protegido por sigilo funerário',
        medicalNotesTitle: '🔒 LAUDO NECROSCÓPICO (SIGILO FUNERÁRIO)'
    }
};

function getConstants(mode) {
    return CONSTANTS[mode] || CONSTANTS.hospitalar;
}