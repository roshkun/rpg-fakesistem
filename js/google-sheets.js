// ==================== INTEGRAÇÃO COM GOOGLE SHEETS ====================

// ⚠️ CONFIGURAÇÃO COMPLETA - SEUS GIDS JÁ ESTÃO AQUI! ⚠️
// Planilha: https://docs.google.com/spreadsheets/d/e/2PACX-1vSa0YBbnJctwW1n6htVZIJ7OAuP8kBnk96XaUDM6BVM2K_iVwgwSKQzOYNDT3XfTvtQeG32AcCCr1eN/pubhtml
// Abas identificadas:
//   gid=0          → doctors_hospitalar
//   gid=764843484  → patients_hospitalar
//   gid=991544728  → doctors_funeraria
//   gid=694307237  → patients_funeraria

const GOOGLE_SHEETS_CONFIG = {
    // Seu ID da planilha (extraído da URL de publicação)
    sheetId: '2PACX-1vSa0YBbnJctwW1n6htVZIJ7OAuP8kBnk96XaUDM6BVM2K_iVwgwSKQzOYNDT3XfTvtQeG32AcCCr1eN',
    
    // GIDs de cada aba (identificados pelas suas URLs)
    gids: {
        doctors_hospitalar: 0,
        patients_hospitalar: 764843484,
        doctors_funeraria: 991544728,
        patients_funeraria: 694307237
    },
    
    // URLs para acesso como CSV (formato que o sistema entende)
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

// Função para carregar dados do Google Sheets
async function loadFromGoogleSheets(mode) {
    try {
        console.log('🔄 Carregando do Google Sheets... Modo:', mode);
        
        let doctorsUrl, patientsUrl;
        
        if (mode === 'hospitalar') {
            doctorsUrl = GOOGLE_SHEETS_CONFIG.getHospitalarDoctorsUrl();
            patientsUrl = GOOGLE_SHEETS_CONFIG.getHospitalarPatientsUrl();
            console.log('📊 Carregando hospitalar - Médicos:', doctorsUrl);
            console.log('📊 Carregando hospitalar - Pacientes:', patientsUrl);
        } else {
            doctorsUrl = GOOGLE_SHEETS_CONFIG.getFunerariaDoctorsUrl();
            patientsUrl = GOOGLE_SHEETS_CONFIG.getFunerariaPatientsUrl();
            console.log('⚰️ Carregando funerária - Legistas:', doctorsUrl);
            console.log('⚰️ Carregando funerária - Falecidos:', patientsUrl);
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
        
        console.log('✅ CSV Doctors recebido, tamanho:', doctorsCSV.length, 'bytes');
        console.log('✅ CSV Patients recebido, tamanho:', patientsCSV.length, 'bytes');
        
        // Verificar se os CSVs têm conteúdo
        if (doctorsCSV.trim() === '') {
            console.warn('⚠️ CSV de médicos está vazio! Verifique se a aba tem dados.');
        }
        if (patientsCSV.trim() === '') {
            console.warn('⚠️ CSV de pacientes está vazio! Verifique se a aba tem dados.');
        }
        
        const doctors = parseCSV(doctorsCSV);
        const patients = parseCSV(patientsCSV);
        
        console.log(`✅ Sucesso! Carregados: ${doctors.length} médicos/legistas, ${patients.length} pacientes/falecidos`);
        
        return { doctors, patients };
        
    } catch (error) {
        console.error('❌ Erro ao carregar do Google Sheets:', error);
        return null;
    }
}

// Função para parsear CSV para array de objetos
function parseCSV(csvText) {
    if (!csvText || csvText.trim() === '') {
        console.warn('⚠️ CSV vazio');
        return [];
    }
    
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) {
        console.warn('⚠️ Nenhuma linha no CSV');
        return [];
    }
    
    // Extrair cabeçalhos (primeira linha)
    const headers = parseCSVLine(lines[0]);
    console.log('📋 Cabeçalhos encontrados:', headers);
    
    const results = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = parseCSVLine(line);
        const obj = {};
        
        headers.forEach((header, index) => {
            if (index < values.length) {
                let value = values[index];
                // Remover aspas extras se houver
                value = value.replace(/^"|"$/g, '');
                obj[header] = value;
            } else {
                obj[header] = '';
            }
        });
        
        // Garantir que campos obrigatórios existam
        if (!obj.id) obj.id = i;
        if (!obj.initials && obj.name) {
            const names = obj.name.split(' ');
            obj.initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : names[0].charAt(1));
        }
        if (!obj.color) {
            const defaultColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
            obj.color = defaultColors[results.length % defaultColors.length];
        }
        
        results.push(obj);
    }
    
    console.log(`📊 Parseados ${results.length} registros`);
    if (results.length > 0) {
        console.log('📋 Primeiro registro:', results[0]);
    }
    return results;
}

// Função auxiliar para parsear uma linha CSV (lida com aspas)
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    
    return result;
}

// Função para verificar se o Google Sheets está configurado
function isGoogleSheetsConfigured() {
    const configured = GOOGLE_SHEETS_CONFIG.sheetId !== 'SEU_ID_AQUI';
    if (!configured) {
        console.warn('⚠️ Google Sheets não configurado! O sistema usará fallback JSON.');
    } else {
        console.log('✅ Google Sheets configurado com ID:', GOOGLE_SHEETS_CONFIG.sheetId);
        console.log('📋 GIDs configurados:', GOOGLE_SHEETS_CONFIG.gids);
    }
    return configured;
}

// Exportar funções para uso em outros arquivos
window.loadFromGoogleSheets = loadFromGoogleSheets;
window.isGoogleSheetsConfigured = isGoogleSheetsConfigured;