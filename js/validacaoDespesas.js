document.addEventListener("DOMContentLoaded", () => {
    const formDespesa = document.getElementById('formDespesa');
    const tabelaDespesas = document.getElementById('tabelaDespesas').getElementsByTagName('tbody')[0];
    
    // Contador para o ID incremental da tabela
    let proximoId = 2;

    // Processamento do Formulário de Cadastro de Despesas
    formDespesa.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura dos Inputs
        const codigo = document.getElementById('codigo').value.trim();
        const categoria = document.getElementById('categoria').value;
        const descricao = document.getElementById('descricao').value.trim();

        const alertaErro = document.getElementById('alertaErro');
        const alertaSucesso = document.getElementById('alertaSucesso');

        // Reseta alertas
        alertaErro.classList.add('d-none');
        alertaSucesso.classList.add('d-none');
        alertaErro.innerHTML = "";

        // Validações básicas obrigatórias
        if (!codigo || !categoria || !descricao) {
            alertaErro.innerHTML = "Por favor, preencha todos os campos obrigatórios (*).";
            alertaErro.classList.remove('d-none');
            return;
        }

        // Verifica se esta a editar uma despesa existente
        if (formDespesa.dataset.linhaEditando) {
            const index = formDespesa.dataset.linhaEditando;
            const linhaParaEditar = document.getElementById('tabelaDespesas').rows[index];
            
            // Atualiza os dados na tabela
            linhaParaEditar.cells[1].innerText = codigo.toUpperCase();
            linhaParaEditar.cells[2].innerText = categoria;
            linhaParaEditar.cells[3].innerText = descricao;
            
            // Limpa o estado de edição
            delete formDespesa.dataset.linhaEditando;
            document.getElementById('modalDespesaLabel').innerText = "Cadastrar Tipo de Despesa";
        } else {
            // Se não estiver a editar, cria uma NOVA linha normalmente
            const novaLinha = tabelaDespesas.insertRow();
            novaLinha.innerHTML = `
                <th scope="row">${proximoId++}</th>
                <td>${codigo.toUpperCase()}</td>
                <td>${categoria}</td>
                <td>${descricao}</td>
                <td><span class="badge bg-success">ATIVO</span></td>
                <td>
                    <div class="d-flex justify-content-end gap-2">
                        <button class="btn btn-sm btn-outline-info" title="Informações"><i class="bi bi-info-circle"></i></button>
                        <button class="btn btn-sm btn-outline-primary" title="Editar"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger" title="Apagar"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            `;
        }

        // Reatribui as ações às linhas (incluindo os novos botões)
        configurarBotoesAcao();

        // Mostra o sucesso e limpa o formulário
        alertaSucesso.classList.remove('d-none');
        formDespesa.reset();

        // Fecha o modal automaticamente
        setTimeout(() => {
            const modalElement = document.getElementById('modalCadastroDespesa');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
            alertaSucesso.classList.add('d-none');
        }, 1500);
    });

    // Função para tratar interações de consulta, exclusão, edição e visualização
    function configurarBotoesAcao() {
        // Botão Consultar
        document.getElementById('btnConsultar').onclick = () => {
            alert("Buscando tipos de despesas ativos no banco de dados...");
        };

        // --- EDITAR DESPESA (LÁPIS) ---
        const botoesEditar = document.querySelectorAll("button[title='Editar']");
        botoesEditar.forEach(btn => {
            btn.onclick = (e) => {
                const linha = e.target.closest("tr");
                
                // Captura os dados da linha da tabela de despesas
                const codigoAtual = linha.cells[1].innerText;
                const categoriaAtual = linha.cells[2].innerText;
                const descricaoAtual = linha.cells[3].innerText;

                // Preenche o formulário do Modal
                document.getElementById('codigo').value = codigoAtual;
                document.getElementById('categoria').value = categoriaAtual;
                document.getElementById('descricao').value = descricaoAtual;

                // Altera o título do Modal
                document.getElementById('modalDespesaLabel').innerText = `Editar Despesa: ${codigoAtual}`;

                // Guarda o índice da linha que está a ser editada
                formDespesa.dataset.linhaEditando = linha.rowIndex;

                // Abre o Modal do Bootstrap
                const meuModal = new bootstrap.Modal(document.getElementById('modalCadastroDespesa'));
                meuModal.show();
            };
        });

        // --- VISUALIZAR INFORMAÇÕES (OLHO / "i") ---
        const botoesInfo = document.querySelectorAll("button[title='Informações']");
        botoesInfo.forEach(btn => {
            btn.onclick = (e) => {
                const linha = e.target.closest("tr");
                
                const codigoAtual = linha.cells[1].innerText;
                const categoriaAtual = linha.cells[2].innerText;
                const descricaoAtual = linha.cells[3].innerText;

                document.getElementById('codigo').value = codigoAtual;
                document.getElementById('categoria').value = categoriaAtual;
                document.getElementById('descricao').value = descricaoAtual;

                document.getElementById('modalDespesaLabel').innerText = `Informações da Despesa: ${codigoAtual}`;

                // Bloqueia os campos (Apenas Leitura)
                const inputs = formDespesa.querySelectorAll('input, select, textarea');
                inputs.forEach(input => input.disabled = true);

                // Esconde o botão de salvar
                const btnSalvar = formDespesa.querySelector('button[type="submit"]');
                if (btnSalvar) btnSalvar.classList.add('d-none');

                const meuModal = new bootstrap.Modal(document.getElementById('modalCadastroDespesa'));
                meuModal.show();

                // Reseta as configurações ao fechar o modal
                document.getElementById('modalCadastroDespesa').addEventListener('hidden.bs.modal', function () {
                    inputs.forEach(input => input.disabled = false);
                    if (btnSalvar) btnSalvar.classList.remove('d-none');
                    document.getElementById('modalDespesaLabel').innerText = "Cadastrar Tipo de Despesa";
                }, { once: true });
            };
        });

        // Apagar linha da tabela
        const botoesApagar = document.querySelectorAll("button[title='Apagar']");
        botoesApagar.forEach(btn => {
            btn.onclick = (e) => {
                const linha = e.target.closest("tr");
                const codDespesa = linha.querySelector("td:nth-child(2)").innerText;
                if (confirm(`Deseja desativar/remover o tipo de despesa ${codDespesa}?`)) {
                    linha.remove();
                }
            };
        });
    }

    // Inicializa as ações na primeira carga da página
    configurarBotoesAcao();
});