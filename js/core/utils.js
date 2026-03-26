// ==================== FUNÇÕES UTILITÁRIAS ====================

// Gerar avatar com iniciais
function generateAvatar(initials, color) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50%25' y='50%25' font-size='80' font-weight='bold' fill='white' text-anchor='middle' dy='.3em'%3E${initials}%3C/text%3E%3C/svg%3E`;
}

// Obter foto do paciente (ou avatar)
function getPatientPhoto(patient) {
    if (!patient) return generateAvatar('??', '#6c757d');
    if (patient.photoUrl && patient.photoUrl.trim() !== '') return patient.photoUrl;
    return generateAvatar(patient.initials || '??', patient.color || '#6c757d');
}

// Formatar data
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

// Mostrar mensagem temporária
function showMessage(message, type = 'success', duration = 3000) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.innerHTML = message;
    document.body.appendChild(msgDiv);
    setTimeout(() => msgDiv.remove(), duration);
}

// Parse de CSV
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