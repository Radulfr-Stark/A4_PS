document.addEventListener("DOMContentLoaded", () => {
    const formAluno = document.getElementById('formAluno');
    const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];
    
    // Contador para o ID da tabela
    let proximoId = 2;

    // Processamento do Formulário de Cadastro
    formAluno.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura dos Inputs
        const nome = document.getElementById('nome').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const email = document.getElementById('email').value.trim();
        const dataNasc = document.getElementById('dataNascimento').value;
        const genero = document.getElementById('genero').value;
        const cep = document.getElementById('cep').value.trim();
        const logradouro = document.getElementById('logradouro').value.trim();
        const numero = document.getElementById('numero').value.trim();

        const alertaErro = document.getElementById('alertaErro');
        const alertaSucesso = document.getElementById('alertaSucesso');

        // Reseta alertas
        alertaErro.classList.add('d-none');
        alertaSucesso.classList.add('d-none');
        alertaErro.innerHTML = "";

        let erros = [];

        // Validações básicas obrigatórias
        if (!nome || !cpf || !email || !dataNasc || !genero || !cep || !logradouro || !numero) {
            erros.push("Por favor, preencha todos os campos obrigatórios (*).");
        }
        if (cpf && (cpf.length !== 11 || isNaN(cpf))) {
            erros.push("O CPF deve conter exatamente 11 números.");
        }
        if (cep && (cep.length !== 8 || isNaN(cep))) {
            erros.push("O CEP deve conter exatamente 8 números.");
        }

        // Se houverem erros de validação
        if (erros.length > 0) {
            alertaErro.innerHTML = erros.join("<br>");
            alertaErro.classList.remove('d-none');
            return;
        }
        
        // Verifica se esta editando uma linha existente
        if (formAluno.dataset.linhaEditando) {
            const index = formAluno.dataset.linhaEditando;
            const linhaParaEditar = document.getElementById('tabelaAlunos').rows[index];
            
            // Atualiza os dados da linha existente
            linhaParaEditar.cells[1].innerText = cpf;
            linhaParaEditar.cells[2].innerText = nome;
            linhaParaEditar.cells[3].innerText = email;
            
            // Limpa a marcação de edição
            delete formAluno.dataset.linhaEditando;
            document.getElementById('modalCadastroLabel').innerText = "Cadastrar Novo Aluno";
        } else {
            // Se não estiver editando, cria uma NOVA linha 
            const novaLinha = tabelaAlunos.insertRow();
            novaLinha.innerHTML = `
                <th scope="row">${proximoId++}</th>
                <td>${cpf}</td>
                <td>${nome}</td>
                <td>${email}</td>
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

        // Se tudo estiver certo, injeta a nova linha na tabela!
        const novaLinha = tabelaAlunos.insertRow();
        novaLinha.innerHTML = `
            <th scope="row">${proximoId++}</th>
            <td>${cpf}</td>
            <td>${nome}</td>
            <td>${email}</td>
            <td><span class="badge bg-success">ATIVO</span></td>
            <td>
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-sm btn-outline-info" title="Informações"><i class="bi bi-info-circle"></i></button>
                    <button class="btn btn-sm btn-outline-primary" title="Editar"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" title="Apagar"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        `;

        // Ativa novamente os eventos de exclusão nas novas linhas
        configurarBotoesAcao();

        // Exibe mensagem de sucesso e limpa o formulário
        alertaSucesso.classList.remove('d-none');
        formAluno.reset();

        // Fecha a janela do modal após 1.5 segundos automaticamente
        setTimeout(() => {
            const modalElement = document.getElementById('modalCadastroAluno');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
            alertaSucesso.classList.add('d-none');
        }, 1500);
    });

    // Função para tratar interações de consulta, exclusão e EDIÇÃO
    function configurarBotoesAcao() {
        // Botão Consultar
        document.getElementById('btnConsultar').onclick = () => {
            alert("Buscando dados na base simulada do SCA...");
        };

        // --- EDITAR ALUNO ---
        const botoesEditar = document.querySelectorAll("button[title='Editar']");
        botoesEditar.forEach(btn => {
            btn.onclick = (e) => {
                // Encontra a linha correspondente ao botão clicado
                const linha = e.target.closest("tr");
                
                // Captura os dados atuais da tabela
                const cpfAtual = linha.cells[1].innerText;
                const nomeAtual = linha.cells[2].innerText;
                const emailAtual = linha.cells[3].innerText;

                // Preenche o formulário do Modal com os dados capturados
                document.getElementById('nome').value = nomeAtual;
                document.getElementById('cpf').value = cpfAtual;
                document.getElementById('email').value = emailAtual;
                
                // Preenche dados fictícios nos outros campos para validação passar
                document.getElementById('dataNascimento').value = "2000-01-01";
                document.getElementById('genero').value = "Masculino";
                document.getElementById('cep').value = "12345678";
                document.getElementById('logradouro').value = "Rua Simulada para Edição";
                document.getElementById('numero').value = "123";

                // Altera o título do Modal para o usuário saber que está editando
                document.getElementById('modalCadastroLabel').innerText = `Editar Aluno: ${nomeAtual}`;

                // Guarda a linha que está sendo editada direto no formulário para usar depois
                formAluno.dataset.linhaEditando = linha.rowIndex;

                // Abre o Modal programaticamente pelo Bootstrap
                const meuModal = new bootstrap.Modal(document.getElementById('modalCadastroAluno'));
                meuModal.show();
            };
        });

        // Apagar linha da tabela
        const botoesApagar = document.querySelectorAll("button[title='Apagar']");
        botoesApagar.forEach(btn => {
            btn.onclick = (e) => {
                const linha = e.target.closest("tr");
                const nomeAluno = linha.querySelector("td:nth-child(3)").innerText;
                if (confirm(`Deseja remover o aluno ${nomeAluno} do sistema?`)) {
                    linha.remove();
                }
            };
        });
    }


    // --- VISUALIZAR INFORMAÇÕES ---
        const botoesInfo = document.querySelectorAll("button[title='Informações']");
        botoesInfo.forEach(btn => {
            btn.onclick = (e) => {
                const linha = e.target.closest("tr");
                
                // Captura os dados da linha
                const cpfAtual = linha.cells[1].innerText;
                const nomeAtual = linha.cells[2].innerText;
                const emailAtual = linha.cells[3].innerText;

                // Preenche o formulário com os dados
                document.getElementById('nome').value = nomeAtual;
                document.getElementById('cpf').value = cpfAtual;
                document.getElementById('email').value = emailAtual;
                
                // Dados fictícios complementares
                document.getElementById('dataNascimento').value = "2000-01-01";
                document.getElementById('genero').value = "Masculino";
                document.getElementById('cep').value = "12345678";
                document.getElementById('logradouro').value = "Rua Simulada";
                document.getElementById('numero').value = "123";

                // Altera o título para modo de visualização
                document.getElementById('modalCadastroLabel').innerText = `Informações do Aluno: ${nomeAtual}`;

                // DESABILITA todos os campos para bloquear a digitação (Apenas Leitura)
                const inputs = formAluno.querySelectorAll('input, select, textarea');
                inputs.forEach(input => input.disabled = true);

                // ESCONDE o botão de salvar para o usuário só poder clicar em Cancelar/Fechar
                const btnSalvar = formAluno.querySelector('button[type="submit"]');
                if (btnSalvar) btnSalvar.classList.add('d-none');

                // Abre o Modal
                const meuModal = new bootstrap.Modal(document.getElementById('modalCadastroAluno'));
                meuModal.show();

                // Quando o modal for fechado, essa função limpa o estado e reabilita os campos para os outros botões funcionarem normalmente
                document.getElementById('modalCadastroAluno').addEventListener('hidden.bs.modal', function () {
                    inputs.forEach(input => input.disabled = false);
                    if (btnSalvar) btnSalvar.classList.remove('d-none');
                    document.getElementById('modalCadastroLabel').innerText = "Cadastrar Novo Aluno";
                }, { once: true }); // Executa apenas uma vez por clique
            };
        });

    // Inicializa as ações na primeira carga da página
    configurarBotoesAcao();
});