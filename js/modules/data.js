// ==================== GERENCIAMENTO DE DADOS ====================

let doctorsDB = {};
let patients = [];
let dataSource = 'none';

// IDs da planilha do Google Sheets
const SHEET_ID = '2PACX-1vSa0YBbnJctwW1n6htVZIJ7OAuP8kBnk96XaUDM6BVM2K_iVwgwSKQzOYNDT3XfTvtQeG32AcCCr1eN';
const GIDS = {
    hospitalar: { doctors: 0, patients: 764843484 },
    funeraria: { doctors: 991544728, patients: 694307237 }
};

// Dados de fallback (caso o Google Sheets não carregue)
const FALLBACK_DATA = {
    hospitalar: {
        doctors: {
            "1": {
                id: "1",
                name: "Dr. Carlos Mendes",
                crm: "CRM 12345",
                observationCode: "123456",
                savedPassword: "123456",
                lastPasswordChange: "15/11/2024 14:30",
                certificate: {
                    issuer: "ICP-Brasil - Saúde",
                    serialNumber: "BR-SAUDE-001",
                    issuedDate: "15/11/2022",
                    expirationDate: "15/11/2025",
                    status: "Válido",
                    level: "A3"
                }
            },
            "2": {
                id: "2",
                name: "Dra. Ana Paula Souza",
                crm: "CRM 67890",
                observationCode: "234567",
                savedPassword: "234567",
                lastPasswordChange: "16/11/2024 09:15",
                certificate: {
                    issuer: "ICP-Brasil - Saúde",
                    serialNumber: "BR-SAUDE-002",
                    issuedDate: "10/10/2023",
                    expirationDate: "10/10/2026",
                    status: "Válido",
                    level: "A3"
                }
            },
            "3": {
                id: "3",
                name: "Dr. Ricardo Almeida",
                crm: "CRM 54321",
                observationCode: "345678",
                savedPassword: "345678",
                lastPasswordChange: "14/11/2024 11:20",
                certificate: {
                    issuer: "ICP-Brasil - Saúde",
                    serialNumber: "BR-SAUDE-003",
                    issuedDate: "20/12/2020",
                    expirationDate: "20/12/2024",
                    status: "Expirado",
                    level: "A3"
                }
            }
        },
        patients: [
            {
                id: 1,
                name: "Maria Aparecida Silva",
                age: 72,
                gender: "Feminino",
                bloodType: "A+",
                admissionDate: "18/11/2024",
                room: "201-A",
                diagnosis: "Hipertensão arterial descompensada",
                medicalHistory: "Paciente hipertensa há 20 anos. Apresentou melhora significativa após internação.",
                patientHistory: "📅 2015: Diagnóstico inicial de hipertensão\n📅 2018: Início do tratamento com Losartana\n📅 2020: Ajuste de medicação\n📅 2024: Internação por descompensação - melhora inexplicável",
                medications: "Losartana 100mg/dia",
                allergies: "Nenhuma",
                medicalNotes: "🔴 OBSERVAÇÃO CONFIDENCIAL: Paciente apresentou melhora inexplicável dos níveis pressóricos após 48h de internação. Redução de 180/110 para 120/80 sem ajuste significativo na medicação.",
                lastUpdate: "19/11/2024",
                initials: "MS",
                color: "#FF6B6B",
                photoUrl: ""
            },
            {
                id: 2,
                name: "José Augusto Lima",
                age: 65,
                gender: "Masculino",
                bloodType: "O+",
                admissionDate: "17/11/2024",
                room: "203-B",
                diagnosis: "Pneumonia bacteriana",
                medicalHistory: "Paciente com febre e tosse. Melhora significativa em 36h.",
                patientHistory: "📅 2020: Diagnóstico de DPOC leve\n📅 2022: Pneumonia bacteriana - internado por 10 dias\n📅 2024: Nova internação - recuperação acelerada",
                medications: "Ceftriaxona 1g/dia, Azitromicina 500mg",
                allergies: "Dipirona",
                medicalNotes: "🔴 OBSERVAÇÃO CONFIDENCIAL: Cultura do escarro não identificou bactéria, porém quadro clínico melhorou 100% em 36h.",
                lastUpdate: "19/11/2024",
                initials: "JL",
                color: "#4ECDC4",
                photoUrl: ""
            }
        ]
    },
    funeraria: {
        doctors: {
            "1": {
                id: "1",
                name: "Dr. Carlos Mendes - Legista",
                crm: "CRM 12345",
                observationCode: "123456",
                savedPassword: "123456",
                lastPasswordChange: "15/11/2024 14:30",
                certificate: {
                    issuer: "ICP-Brasil - Autoridade Certificadora Funerária",
                    serialNumber: "BR-FUN-001",
                    issuedDate: "15/11/2022",
                    expirationDate: "15/11/2025",
                    status: "Válido",
                    level: "A3"
                }
            },
            "2": {
                id: "2",
                name: "Dra. Ana Paula Souza - Legista",
                crm: "CRM 67890",
                observationCode: "234567",
                savedPassword: "234567",
                lastPasswordChange: "16/11/2024 09:15",
                certificate: {
                    issuer: "ICP-Brasil - Autoridade Certificadora Funerária",
                    serialNumber: "BR-FUN-002",
                    issuedDate: "10/10/2023",
                    expirationDate: "10/10/2026",
                    status: "Válido",
                    level: "A3"
                }
            },
            "3": {
                id: "3",
                name: "Dr. Ricardo Almeida - Legista",
                crm: "CRM 54321",
                observationCode: "345678",
                savedPassword: "345678",
                lastPasswordChange: "14/11/2024 11:20",
                certificate: {
                    issuer: "ICP-Brasil - Autoridade Certificadora Funerária",
                    serialNumber: "BR-FUN-003",
                    issuedDate: "20/12/2020",
                    expirationDate: "20/12/2024",
                    status: "Expirado",
                    level: "A3"
                }
            }
        },
        patients: [
            {
                id: 1,
                name: "Mariana Luz",
                age: 35,
                gender: "Feminino",
                bloodType: "A-",
                admissionDate: "10/03/2026",
                room: "305-B",
                diagnosis: "Recuperação Pós-Falência Hepática (Causa Desconhecida)",
                medicalHistory: "Paciente em estado terminal por Insuficiência Hepática Fulminante até 48h atrás. Prognóstico era de óbito iminente sem transplante urgente.",
                patientHistory: "📅 10/03: Internação em coma hepático (ICN 95%)\n📅 24/03: Estado terminal - Falência múltipla iniciada\n📅 26/03: Paciente desperta lúcida; exames mostram fígado novo e funcionalidade 100%.",
                medications: "Nenhum (Ausência de Ciclosporina ou Tacrolimus no soro)",
                allergies: "Nenhuma",
                medicalNotes: "🔍 LAUDO PRELIMINAR - LEGISTA: Ao exame externo, não há cicatrizes ou marcas de procedimentos cirúrgicos recentes. A ultrassonografia post-mortem revela estrutura hepática íntegra, incompatível com o histórico de falência. Solicitada análise toxicológica para investigação de substância desconhecida.",
                lastUpdate: "26/03/2026",
                initials: "ML",
                color: "#6B94FF",
                photoUrl: ""
            },
            {
                id: 2,
                name: "Gustavo Boas",
                age: 29,
                gender: "Masculino",
                bloodType: "O+",
                admissionDate: "05/02/2026",
                room: "202-C",
                diagnosis: "Remissão Total de Miocardite Crônica",
                medicalHistory: "Paciente aguardava transplante cardíaco em regime de UTI. Fração de ejeção era de 15% (insuficiência severa).",
                patientHistory: "📅 05/02: Internação com choque cardiogênico\n📅 20/03: Listado como prioridade máxima (Estado Crítico)\n📅 26/03: Coração apresenta vigor de atleta. Novos exames apontam transplante não registrado no sistema hospitalar.",
                medications: "Nenhum (Ausência de Prednisona ou Azatioprina)",
                allergies: "Dipirona",
                medicalNotes: "🔍 LAUDO PRELIMINAR - LEGISTA: Ausência de cicatriz de esternotomia ou acesso torácico. Exame anatomopatológico do miocárdio em andamento. Hipótese: alteração estrutural não documentada previamente.",
                lastUpdate: "26/03/2026",
                initials: "GB",
                color: "#FF4E4E",
                photoUrl: ""
            }
        ]
    }
};

// Função para parsear CSV
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
            if (c === '"') {
                inQuotes = !inQuotes;
            } else if (c === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += c;
            }
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

// Carregar dados do Google Sheets
async function loadFromSheets(mode) {
    try {
        console.log('🔄 Carregando do Google Sheets... Modo:', mode);
        
        const gidDoctors = GIDS[mode].doctors;
        const gidPatients = GIDS[mode].patients;
        
        const doctorsUrl = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?gid=${gidDoctors}&single=true&output=csv`;
        const patientsUrl = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?gid=${gidPatients}&single=true&output=csv`;
        
        const [doctorsResponse, patientsResponse] = await Promise.all([
            fetch(doctorsUrl),
            fetch(patientsUrl)
        ]);
        
        if (!doctorsResponse.ok || !patientsResponse.ok) {
            throw new Error(`HTTP ${doctorsResponse.status} / ${patientsResponse.status}`);
        }
        
        const doctorsCSV = await doctorsResponse.text();
        const patientsCSV = await patientsResponse.text();
        
        const doctorsArray = parseCSV(doctorsCSV);
        const patientsArray = parseCSV(patientsCSV);
        
        if (doctorsArray.length === 0 || patientsArray.length === 0) {
            throw new Error('Dados vazios');
        }
        
        // Converter array de médicos para objeto
        const doctors = {};
        doctorsArray.forEach(doctor => {
            const id = doctor.id || Object.keys(doctors).length + 1;
            doctors[id] = {
                id: id,
                name: doctor.name || 'Nome não informado',
                crm: doctor.crm || 'CRM não informado',
                observationCode: doctor.observationCode || '000000',
                savedPassword: doctor.observationCode || '000000',
                lastPasswordChange: doctor.lastPasswordChange || new Date().toLocaleString('pt-BR'),
                certificate: {
                    issuer: doctor.certificate_issuer || 'ICP-Brasil',
                    serialNumber: doctor.certificate_serial || `BR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                    issuedDate: doctor.certificate_issued || new Date().toLocaleDateString('pt-BR'),
                    expirationDate: doctor.certificate_expiration || new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                    level: doctor.certificate_level || 'A3',
                    status: doctor.certificate_status || 'Válido'
                }
            };
        });
        
        return { doctors, patients: patientsArray };
        
    } catch (error) {
        console.warn('Erro ao carregar do Sheets:', error);
        return null;
    }
}

// Função principal para carregar dados
async function loadData(mode) {
    console.log('🚀 Carregando dados para modo:', mode);
    
    // Tentar carregar do Google Sheets
    const sheetsData = await loadFromSheets(mode);
    
    if (sheetsData && Object.keys(sheetsData.doctors).length > 0 && sheetsData.patients.length > 0) {
        doctorsDB = sheetsData.doctors;
        patients = sheetsData.patients;
        dataSource = 'sheets';
        console.log(`✅ Dados carregados do Google Sheets: ${Object.keys(doctorsDB).length} médicos, ${patients.length} pacientes`);
        return true;
    }
    
    // Fallback: usar dados locais
    const fallback = FALLBACK_DATA[mode];
    if (fallback) {
        doctorsDB = fallback.doctors;
        patients = fallback.patients;
        dataSource = 'fallback';
        console.log(`✅ Dados de fallback carregados: ${Object.keys(doctorsDB).length} médicos, ${patients.length} pacientes`);
        return true;
    }
    
    console.error('❌ Nenhuma fonte de dados disponível');
    return false;
}

// Atualizar o select de médicos
function updateDoctorSelect() {
    const select = document.getElementById('certificateSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecione um profissional...</option>';
    for (const [id, doctor] of Object.entries(doctorsDB)) {
        const option = document.createElement('option');
        option.value = id;
        const statusIcon = doctor.certificate?.status === 'Expirado' ? '⚠️' : '✅';
        option.textContent = `${doctor.name} - ${doctor.crm} ${statusIcon} (${doctor.certificate?.status || 'Válido'})`;
        select.appendChild(option);
    }
    console.log(`✅ Select atualizado com ${Object.keys(doctorsDB).length} profissionais`);
}

// Obter informações do certificado
function getCertificateInfo(doctorId) {
    const doctor = doctorsDB[doctorId];
    if (!doctor || !doctor.certificate) return null;
    return doctor.certificate;
}