// ==================== INTEGRAÇÃO COM GOOGLE SHEETS ====================

const GOOGLE_SHEETS_CONFIG = {
    sheetId: '2PACX-1vSa0YBbnJctwW1n6htVZIJ7OAuP8kBnk96XaUDM6BVM2K_iVwgwSKQzOYNDT3XfTvtQeG32AcCCr1eN',
    gids: {
        doctors_hospitalar: 0,
        patients_hospitalar: 764843484,
        doctors_funeraria: 991544728,
        patients_funeraria: 694307237
    },
    
    getHospitalarDoctorsUrl: function() {
        return `https://docs.google.com/spreadsheets/d/e/${this.sheetId}/pub?gid=${this.gids.doctors_hospitalar}&single=true&output=csv`;
    },
    getHospitalarPatientsUrl: function() {
        return `https://docs.google.com/spreadsheets/d/e/${this.sheetId}/pub?gid=${this.gids.patients_hospitalar}&single=true&output=csv`;
    },
    getFunerariaDoctorsUrl: function() {
        return `https://docs.google.com/spreadsheets/d/e/${this.sheetId}/pub?gid=${this.gids.doctors_funeraria}&single=true&output=csv`;
    },
    getFunerariaPatientsUrl: function() {
        return `https://docs.google.com/spreadsheets/d/e/${this.sheetId}/pub?gid=${this.gids.patients_funeraria}&single=true&output=csv`;
    }
};

async function loadFromGoogleSheets(mode) {
    try {
        console.log('🔄 Carregando do Google Sheets... Modo:', mode);
        
        let doctorsUrl, patientsUrl;
        if (mode === 'hospitalar') {
            doctorsUrl = GOOGLE_SHEETS_CONFIG.getHospitalarDoctorsUrl();
            patientsUrl = GOOGLE_SHEETS_CONFIG.getHospitalarPatientsUrl();
        } else {
            doctorsUrl = GOOGLE_SHEETS_CONFIG.getFunerariaDoctorsUrl();
            patientsUrl = GOOGLE_SHEETS_CONFIG.getFunerariaPatientsUrl();
        }
        
        const [doctorsResponse, patientsResponse] = await Promise.all([
            fetch(doctorsUrl),
            fetch(patientsUrl)
        ]);
        
        if (!doctorsResponse.ok || !patientsResponse.ok) {
            throw new Error(`Erro HTTP: Doctors=${doctorsResponse.status}, Patients=${patientsResponse.status}`);
        }
        
        const doctorsCSV = await doctorsResponse.text();
        const patientsCSV = await patientsResponse.text();
        
        const doctors = parseCSV(doctorsCSV);
        const patients = parseCSV(patientsCSV);
        
        console.log(`✅ Sucesso! Carregados: ${doctors.length} médicos, ${patients.length} pacientes`);
        return { doctors, patients };
        
    } catch (error) {
        console.error('❌ Erro ao carregar do Google Sheets:', error);
        return null;
    }
}

function parseCSV(csvText) {
    if (!csvText || csvText.trim() === '') return [];
    
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const parseLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') inQuotes = !inQuotes;
            else if (c === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
            else current += c;
        }
        result.push(current.trim());
        return result;
    };
    
    const headers = parseLine(lines[0]);
    const results = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseLine(lines[i]);
        const obj = {};
        headers.forEach((header, index) => {
            let value = values[index] || '';
            value = value.replace(/^"|"$/g, '');
            obj[header] = value;
        });
        results.push(obj);
    }
    
    return results;
}

function isGoogleSheetsConfigured() {
    return GOOGLE_SHEETS_CONFIG.sheetId && GOOGLE_SHEETS_CONFIG.sheetId !== '';
}