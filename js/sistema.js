// ==================== PONTO DE ENTRADA DO SISTEMA ====================

let mode = null;

async function initSystem() {
    console.log('🚀 Iniciando sistema...');
    
    // Obter modo da URL
    const urlParams = new URLSearchParams(window.location.search);
    mode = urlParams.get('mode') || 'hospitalar';
    
    // Aplicar tema
    document.body.className = mode;
    
    // Carregar constantes e aplicar textos
    applyConfig(mode);
    
    // Carregar dados
    const success = await loadData(mode);
    
    if (!success) {
        document.getElementById('contentArea').innerHTML = `
            <div class="loading-spinner">
                <h3>⚠️ Erro ao carregar dados</h3>
                <button onclick="location.reload()">Tentar Novamente</button>
            </div>
        `;
        return;
    }
    
    // Atualizar select de profissionais
    updateDoctorSelect();
    
    // Mostrar modal de login
    document.getElementById('loginModal').style.display = 'flex';
}

// Aguardar DOM e iniciar
document.addEventListener('DOMContentLoaded', initSystem);