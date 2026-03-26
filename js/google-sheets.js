// ==================== INTEGRAÇÃO COM GOOGLE SHEETS ====================

// Configuração da API do Google Sheets
const GOOGLE_SHEETS_CONFIG = {
    // Substitua pelos seus dados após publicar a planilha
    sheetId: 'SEU_SHEET_ID_AQUI',  // O ID da sua planilha (da URL)
    apiKey: 'SUA_API_KEY_AQUI',     // API Key do Google Cloud
    sheets: {
        doctors: 'doctors',
        patients: 'patients'
    }
};

// URLs para acesso público (alternativa mais simples)
// Publicar a planilha como CSV e usar fetch direto
const PUBLIC_SHEETS = {
    hospitalar: {
        doctors: 'https://docs.google.com/spreadsheets/d/SEU_ID/export?format=csv&gid=0',
        patients: 'https://docs.google.com/spreadsheets/d/SEU_ID/export?format=csv&gid=1'
    },
    funeraria: {
        doctors: 'https://docs.google.com/spreadsheets/d/SEU_ID/export?format=csv&gid=2',
        patients: 'https://docs.google.com/spreadsheets/d/SEU_ID/export?format=csv&gid=3'
    }
};

// Função para carregar dados do Google Sheets via CSV (mais simples)
async function loadFromGoogleSheets(mode) {
    try {
        const sheetUrls = PUBLIC_SHEETS[mode];
        if (!sheetUrls) {
            throw new Error('Modo não encontrado');
        }
        
        // Carregar médicos
        const doctorsResponse = await fetch(sheetUrls.doctors);
        const doctorsCSV = await doctorsResponse.text();
        const doctors = parseCSV(doctorsCSV);
        
        // Carregar pacientes
        const patientsResponse = await fetch(sheetUrls.patients);
        const patientsCSV = await patientsResponse.text();
        const patients = parseCSV(patientsCSV);
        
        return { doctors, patients };
        
    } catch (error) {
        console.error('Erro ao carregar do Google Sheets:', error);
        return null;
    }
}

// Função para parsear CSV
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const results = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const obj = {};
        
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        
        results.push(obj);
    }
    
    return results;
}

// Função para salvar dados no Google Sheets (via Google Apps Script)
async function saveToGoogleSheets(mode, type, data) {
    // Esta função requer um Google Apps Script implantado como Web App
    const scriptUrl = 'https://script.google.com/macros/s/SEU_SCRIPT_ID/exec';
    
    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mode: mode,
                type: type,
                data: data
            })
        });
        
        return true;
    } catch (error) {
        console.error('Erro ao salvar:', error);
        return false;
    }
}