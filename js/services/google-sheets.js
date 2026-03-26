// ==================== SERVIÇO GOOGLE SHEETS ====================

const SHEETS_CONFIG = {
    sheetId: '2PACX-1vSa0YBbnJctwW1n6htVZIJ7OAuP8kBnk96XaUDM6BVM2K_iVwgwSKQzOYNDT3XfTvtQeG32AcCCr1eN',
    gids: {
        doctors_hospitalar: 0,
        patients_hospitalar: 764843484,
        doctors_funeraria: 991544728,
        patients_funeraria: 694307237
    },
    
    getUrl(mode, type) {
        const gid = this.gids[`${type}_${mode}`];
        return `https://docs.google.com/spreadsheets/d/e/${this.sheetId}/pub?gid=${gid}&single=true&output=csv`;
    }
};

async function loadFromSheets(mode) {
    try {
        console.log('🔄 Carregando do Google Sheets...');
        
        const [doctorsData, patientsData] = await Promise.all([
            fetch(SHEETS_CONFIG.getUrl(mode, 'doctors')).then(r => r.text()),
            fetch(SHEETS_CONFIG.getUrl(mode, 'patients')).then(r => r.text())
        ]);
        
        const doctors = parseCSV(doctorsData);
        const patients = parseCSV(patientsData);
        
        console.log(`✅ Carregados: ${doctors.length} médicos, ${patients.length} pacientes`);
        return { doctors, patients };
        
    } catch (error) {
        console.error('❌ Erro no Sheets:', error);
        return null;
    }
}