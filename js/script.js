// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const modalElement = document.getElementById('loginModal');

    // Instância do Modal
    const loginModal = new bootstrap.Modal(modalElement);

    // botão do Modal
    const btnLogin = document.getElementById('btnLogin');

    // evento clique
    btnLogin.addEventListener('click', () => {
        loginModal.show();
    });
});

// SESSÃO DE GERENCIAMENTO DE TURMAS
let contador = 1;

let linhaEditando = null;

function salvarTurma() {

    const nomeTurma = document.getElementById("nomeTurma").value;
    const curso = document.getElementById("curso").value;
    const disciplina = document.getElementById("disciplina").value;
    const professor = document.getElementById("professor").value;
    const periodo = document.getElementById("periodo").value;
    const sala = document.getElementById("sala").value;
    const vagas = parseInt(document.getElementById("vagas").value);
    const ocupadas = parseInt(document.getElementById("ocupadas").value);

    if (
        nomeTurma === "" ||
        curso === "" ||
        disciplina === "" ||
        professor === "" ||
        periodo === "Selecione" ||
        sala === "" ||
        isNaN(vagas) ||
        isNaN(ocupadas)
    ) {

        alert("Preencha todos os campos.");
        return;
    }

    if (ocupadas > vagas) {

        alert("As vagas ocupadas não podem ser maiores que o total de vagas.");
        return;
    }

    const disponiveis = vagas - ocupadas;

    let status = "";

    if (disponiveis > 0) {

        status = `
            <span class="badge bg-success">
                ATIVA
            </span>
        `;
    }

    else {

        status = `
            <span class="badge bg-danger">
                LOTADA
            </span>
        `;
    }

    const tabela = document.getElementById("tabelaTurmas");

    if (linhaEditando !== null) {

        const numeroLinha = linhaEditando.cells[0].innerText;

        linhaEditando.innerHTML = `

            <td>${numeroLinha}</td>

            <td>${nomeTurma}</td>

            <td>${curso}</td>

            <td>${disciplina}</td>

            <td>${professor}</td>

            <td>${periodo}</td>

            <td>${sala}</td>

            <td>${vagas}</td>

            <td>${ocupadas}</td>

            <td>${disponiveis}</td>

            <td>${status}</td>

            <td>

                <div class="d-flex justify-content-end gap-2">

                    <button class="btn btn-sm btn-outline-primary"
                        onclick="editarTurma(this)">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <button class="btn btn-sm btn-outline-danger"
                        onclick="excluirTurma(this)">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </td>

        `;

        linhaEditando = null;
    }

    else {

        tabela.innerHTML += `

            <tr>

                <td>${contador}</td>

                <td>${nomeTurma}</td>

                <td>${curso}</td>

                <td>${disciplina}</td>

                <td>${professor}</td>

                <td>${periodo}</td>

                <td>${sala}</td>

                <td>${vagas}</td>

                <td>${ocupadas}</td>

                <td>${disponiveis}</td>

                <td>${status}</td>

                <td>

                    <div class="d-flex justify-content-end gap-2">

                        <button class="btn btn-sm btn-outline-primary"
                            onclick="editarTurma(this)">

                            <i class="bi bi-pencil"></i>

                        </button>

                        <button class="btn btn-sm btn-outline-danger"
                            onclick="excluirTurma(this)">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

        contador++;
    }

    limparFormulario();
};

function editarTurma(botao) {

    linhaEditando = botao.closest("tr");

    const colunas = linhaEditando.querySelectorAll("td");

    document.getElementById("nomeTurma").value = colunas[1].innerText;
    document.getElementById("curso").value = colunas[2].innerText;
    document.getElementById("disciplina").value = colunas[3].innerText;
    document.getElementById("professor").value = colunas[4].innerText;
    document.getElementById("periodo").value = colunas[5].innerText;
    document.getElementById("sala").value = colunas[6].innerText;
    document.getElementById("vagas").value = colunas[7].innerText;
    document.getElementById("ocupadas").value = colunas[8].innerText;
};

function excluirTurma(botao) {

    botao.closest("tr").remove();
};

function limparFormulario() {

    document.getElementById("nomeTurma").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("disciplina").value = "";
    document.getElementById("professor").value = "";
    document.getElementById("periodo").selectedIndex = 0;
    document.getElementById("sala").value = "";
    document.getElementById("vagas").value = "";
    document.getElementById("ocupadas").value = "";
};
