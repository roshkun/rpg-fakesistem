// ==================== CONFIGURAÇÕES DO SISTEMA ====================

// Configurações por modo
const configs = {
    hospitalar: {
        // Dados do sistema
        systemTitle: 'HOSPITAL CENTRAL',
        systemSubtitle: 'Prontuário Eletrônico - Sistema Integrado de Saúde',
        accreditation1: '🏅 Acreditado Nível III',
        accreditation2: '⭐ Certificação Internacional JCI',
        sidebarTitle: '👥 PACIENTES INTERNADOS',
        
        // Menus
        menuProntuario: '📋 PRONTUÁRIO',
        menuAgenda: '📅 AGENDA MÉDICA',
        menuExames: '🔬 EXAMES LABORATORIAIS',
        menuPrescricoes: '💊 PRESCRIÇÕES',
        menuRelatorios: '📊 RELATÓRIOS',
        
        // Botões
        toggleSidebarBtn: '📁 Ocultar Lista',
        logoutBtn: '🔓 Sair / Trocar Certificado',
        
        // Footer
        footerText: '© 2024 Hospital Central | Em conformidade com a LGPD - Lei Geral de Proteção de Dados',
        lgpdStamp: '🔒 LGPD COMPLIANT',
        
        // Login
        loginIcon: '🔐',
        loginTitle: 'Acesso ao Sistema',
        loginSubtitle: 'Autenticação via Certificado Digital',
        certIssuer: 'Emissor: ICP-Brasil - Autoridade Certificadora Saúde',
        loginBtn: '🔓 Acessar Sistema',
        
        // Modal de código
        codeModalTitle: '🔒 Acesso Restrito',
        codeModalText: 'As observações médicas são protegidas pela LGPD.',
        verifyBtn: '🔓 Visualizar Observações',
        
        // Busca
        searchPlaceholder: 'Buscar paciente...',
        
        // Ícones
        patientPrefix: '',
        roomIcon: '🏥',
        dateIcon: '📅',
        
        // Arquivo de dados
        dataFile: 'dados/dados-hospitalar.json'
    },
    
    funeraria: {
        // Dados do sistema
        systemTitle: 'FUNERÁRIA PAZ ETERNA',
        systemSubtitle: 'Sistema de Laudos - Serviços Funerários e Necrotério',
        accreditation1: '🏅 Credenciada S.F.C.',
        accreditation2: '⭐ Selo de Qualidade Funerária',
        sidebarTitle: '⚰️ OCORRÊNCIAS FUNERÁRIAS',
        
        // Menus
        menuProntuario: '📋 LAUDOS',
        menuAgenda: '📅 AGENDA FUNERÁRIA',
        menuExames: '🔬 EXAMES NECROSCÓPICOS',
        menuPrescricoes: '⚱️ PREPARAÇÕES',
        menuRelatorios: '📊 RELATÓRIOS IML',
        
        // Botões
        toggleSidebarBtn: '📁 Ocultar Lista',
        logoutBtn: '🔓 Sair / Trocar Legista',
        
        // Footer
        footerText: '© 2024 Funerária Paz Eterna | Em conformidade com a LGPD - Laudos e Procedimentos Funerários',
        lgpdStamp: '⚰️ LAUDO CONFIDENCIAL - SIGILO FUNERÁRIO ⚰️',
        
        // Login
        loginIcon: '⚰️',
        loginTitle: 'Acesso ao Sistema Funerário',
        loginSubtitle: 'Autenticação via Certificado Digital do Legista',
        certIssuer: 'Emissor: ICP-Brasil - Autoridade Certificadora Funerária',
        loginBtn: '🔓 Acessar Sistema',
        
        // Modal de código
        codeModalTitle: '🔒 Acesso Restrito - Laudo Necroscópico',
        codeModalText: 'O laudo necroscópico é protegido por sigilo funerário.',
        verifyBtn: '🔓 Visualizar Laudo',
        
        // Busca
        searchPlaceholder: 'Buscar falecido...',
        
        // Ícones
        patientPrefix: '⚰️ ',
        roomIcon: '🏺',
        dateIcon: '📅 Óbito:',
        
        // Arquivo de dados
        dataFile: 'dados/dados-funeraria.json'
    }
};

// Função para obter configuração atual
function getCurrentConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'hospitalar';
    return { mode, config: configs[mode] };
}