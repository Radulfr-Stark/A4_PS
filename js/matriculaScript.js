// DADOS SIMULADOS

const turmasDisponiveis = [
    {
        id_turma: 1,
        nome_curso: "Análise e Desenvolvimento de Sistemas",
        nome_turma: "ADS1A",
        nome_setor_turma: "FIPP",
        nome_cordenador: "Fulano da Silva",
        num_vagas: 20,
        num_alunos: 3,
        data_turma: 2026,
        desc_curso: "Focado no desenvolvimento rápido, prático e eficiente de softwares, aplicativos e gestão de banco de dados para o mercado.",
        alunos_curso: [
            {
                id_matricula_rm: "20260101",
                id_aluno: 101,
                nome_aluno: "Victor Lucas Jurasseke Sales",
                status_aluno: "Ativo"
            },
            {
                id_matricula_rm: "20260102",
                id_aluno: 102,
                nome_aluno: "Ana Beatriz Souza",
                status_aluno: "Ativo"
            },
            {
                id_matricula_rm: "20260103",
                id_aluno: 103,
                nome_aluno: "Carlos Eduardo Lima",
                status_aluno: "Trancado"
            }
        ]
    },
    {
        id_turma: 2,
        nome_curso: "Engenharia de Software",
        nome_turma: "EDS1A",
        nome_setor_turma: "FIPP",
        nome_cordenador: "Fulano da Silva",
        num_vagas: 24,
        num_alunos: 2,
        data_turma: 2026,
        desc_curso: "Formação completa na arquitetura, especificação, testes e gerência de projetos de software de grande escala.",
        alunos_curso: [
            {
                id_matricula_rm: "20260201",
                id_aluno: 201,
                nome_aluno: "Mariana Costa Rodrigues",
                status_aluno: "Ativo"
            },
            {
                id_matricula_rm: "20260202",
                id_aluno: 202,
                nome_aluno: "Gabriel Henrique Oliveira",
                status_aluno: "Pendente"
            }
        ]
    },
    {
        id_turma: 3,
        nome_curso: "Ciência da Computação",
        nome_turma: "CC1B",
        nome_setor_turma: "FIPP",
        nome_cordenador: "Ciclana de Souza",
        num_vagas: 30,
        num_alunos: 3,
        data_turma: 2026,
        desc_curso: "Foco científico e matemático no desenvolvimento de algoritmos complexos, inteligência artificial e infraestrutura de TI.",
        alunos_curso: [
            {
                id_matricula_rm: "20260301",
                id_aluno: 301,
                nome_aluno: "Julia Martins Fernandes",
                status_aluno: "Ativo"
            },
            {
                id_matricula_rm: "20260302",
                id_aluno: 302,
                nome_aluno: "Lucas Rafael Almeida",
                status_aluno: "Ativo"
            },
            {
                id_matricula_rm: "20260303",
                id_aluno: 303,
                nome_aluno: "Beatriz Araujo Silva",
                status_aluno: "Ativo"
            }
        ]
    },
    {
        id_turma: 5,
        nome_curso: "Sistemas de Informação",
        nome_turma: "SI3A",
        nome_setor_turma: "FIPP",
        nome_cordenador: "Ciclana de Souza",
        num_vagas: 40,
        num_alunos: 0,
        data_turma: 2026,
        desc_curso: "Une tecnologia e negócios, preparando o profissional para gerenciar o fluxo de informações e soluções tecnológicas nas empresas.",
        alunos_curso: [] // Turma vazia conforme o num_alunos: 0
    }
];



// altera a tela da página
const alterarTela = (telaRenderizar) => {

    const elementoTelaTurmas = document.querySelector("#gerenciar-turmas-disponiveis")
    const elementoTelaMatricula = document.querySelector("#gerenciar-matriculas")
    // mostra a tela turma, esconde a tela matricula 

    // Eu sei que como é só 2 div é pouca coisa, mas se precisar aumentar, só mapear num objeto.
    if (telaRenderizar == "TURMAS") {
        elementoTelaTurmas.classList.remove("d-none")
        elementoTelaMatricula.classList.add("d-none")
    } else {
        elementoTelaMatricula.classList.remove("d-none")
        elementoTelaTurmas.classList.add("d-none")
    }


}


// CARREGA TODAS AS TURMAS QUE PODEM EFETUAR MATRICULA
const carregarTurmasDisponiveis = () => {

    // Busca o id que vai carregar as turmas

    const elementoTurmasDisponiveis = document.getElementById("data-turmas")

    turmasDisponiveis.forEach(element => {


        const {
            id_turma,
            nome_curso,
            nome_turma,
            nome_setor_turma,
            nome_cordenador,
            num_vagas,
            num_alunos,
            data_turma,
            alunos_curso
        } = element;

        const cardTurma = document.createElement("div")
        cardTurma.classList.add("col-12", "col-lg-6")

        cardTurma.innerHTML = `
                        <div class="border rounded shadow-sm">
                            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 p-3">

                                <h5 class="mb-0">
                                ${nome_curso}
                                </h5>

                                <div class="d-flex gap-2 flex-wrap">
                                    <span class="badge bg-primary">${nome_turma}</span>
                                    <span class="badge bg-success">${nome_setor_turma}</span>
                                    <span class="badge bg-warning">${data_turma}</span>
                                </div>

                            </div>
                            <div class="row border-top g-3 px-3 pb-3 m-0">

                                <div class="col-12 col-md-6">
                                    <div class="rounded h-100">
                                        <span class="titleRow">Num. Vagas</span>
                                        <p class="valueRow p-0">${num_vagas} vaga(s) disponíveis</p>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="rounded h-100">
                                        <span class="titleRow">Num. Alunos Matriculados</span>
                                        <p class="valueRow p-0">${num_alunos} aluno(s) matriculados</p>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="rounded h-100">
                                        <span class="titleRow">Coordenador Associado</span>
                                        <p class="valueRow p-0">${nome_cordenador}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-end col-12 p-3">
                                <button type="button" class="btn btn-dark btn-gerenciar-matriculas">Gerenciar Matriculas</button> 
                            </div>
                        </div>
`


        // BOTAÕ DE GERENCIAR
        const botaoGerenciarMatricula = cardTurma.querySelector('.btn-gerenciar-matriculas');

        // 4. Pendura a função nele passando o ID ou os dados que precisar
        botaoGerenciarMatricula.addEventListener('click', () => {
            carregarInfomacaoTurma(id_turma)
            alterarTela("MATRICULA"); // Passando o id_turma por exemplo
        });



        elementoTurmasDisponiveis.appendChild(cardTurma)

    });

}

// Carrega as informações da turma em especifico na tela turmas
const carregarInfomacaoTurma = (id_turma) => {

    const elementoTelaMatricula = document.querySelector("#gerenciar-matriculas")
    elementoTelaMatricula.innerHTML = "" // se existir alguma section vazia, remove-a 

    const turmaEncontrada = turmasDisponiveis.find((t) => t.id_turma == id_turma)

    // só por capricho
    if (!turmaEncontrada || !elementoTelaMatricula) {
        alert("Ops, ocorreu um erro!")
        alterarTela("TURMAS")
    }
    const {
        nome_curso,
        nome_turma,
        nome_setor_turma,
        nome_cordenador,
        num_vagas,
        num_alunos,
        data_turma,
        alunos_curso,
        desc_curso,
    } = turmaEncontrada;


    const sectionInformacaoTurma = document.createElement("section")

    sectionInformacaoTurma.innerHTML = `
    <section>
    <div class="my-3">
    <button id="voltar-tela" type="button" class="btn btn-dark"><i class="bi bi-reply"></i></button>
    </div>

                <!-- HEADER INFORMATIVO -->
                <div class="m-0 p-0 d-flex gap-2 align-items-center ">

                    <h3 class="text-uppercase"><i class="bi bi-mortarboard-fill"></i> ${nome_curso}</h3>
                    <span class="badge bg-primary">${nome_turma}</span>
                    <span class="badge bg-success">${nome_setor_turma}</span>
                    <span class="badge bg-warning">${data_turma}</span>
                </div>

                <!-- OUTRAS INFORMAÇÕES DO CURSO/TURMA -->
                <div class="p-3 my-2 border rounded">
                    <div class="row">

                        <div class="col-12 col-md-6 mb-2 mb-md-0">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-person-workspace me-3 fs-4"></i>
                                <span class="m-0 ">Coordenador ${nome_cordenador}</span>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-person-plus me-3 fs-4"></i>
                                <p class="mb-0 ">
                                    ${num_alunos}/${num_vagas} vagas
                                </p>
                            </div>
                        </div>

                        <div class="col-12 mt-3">
                            <hr class=" opacity-25 my-2">
                            <div class="d-flex align-items-center"> <i class="bi bi-rocket  me-3 fs-4"></i>
                                <p class="mb-0  small">
                                ${desc_curso}
                                </p>
                            </div>
                        </div>

                    </div>
                    </div>

                    <div class="d-flex gap-3">
                        <button class="btn btn-dark" type="submit">Consultar</button>
                        <button id="btn-matricular" class="btn btn-light border" type="button">Matricular Aluno</button>
                    </div>
                    
                    
            </section>

            <!-- MATRICULADOS SÓ DAR UM MAP NO CAMPO ALUNOS MATRICULADOS DEVOLVENDO UM TR COM AS INFOS DOS ALUNOS -->
            <section class="my-3">
            
                <div id="section-table" class="d-none">
                    <h5>Usuários Matriculados</h5>
                    <table class="table border table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 5%;">#</th>
                                <th scope="col" style="width: 10%;">RM</th>
                                <th scope="col">Nome</th>
                                <th scope="col" style="width: 15%;">Status</th>
                                <th scope="col" class="text-end" style="width: 20%;">Funcionalidades</th>
                            </tr>
                        </thead>
                        <tbody id="tb-data-matriculas">
                        </tbody>
                        </table>
                </div>

            </section>
                    
                    
                    
                    `

    //botão de efetuar matricula
    //botão de cancelar matricula dos usuários


    // SE HOUVER ALUNOS MATRICULADOS MOSTRA A TABELA
    if (Array.isArray(alunos_curso) && alunos_curso.length > 0) {

        // Pega a seção que vai a table de matriculados
        const elementoSectionTable = sectionInformacaoTurma.querySelector("#section-table")

        // mostra a tabela já que possui alunos matriculados
        elementoSectionTable.classList.remove('d-none')



        // Pega a table de matriculas dentro da seção de table
        const elementoTableData = elementoSectionTable.querySelector('#tb-data-matriculas')
        alunos_curso.forEach((aluno) => {
            const {
                id_matricula_rm,
                id_aluno,
                nome_aluno,
                status_aluno
            } = aluno

            const trAluno = document.createElement('tr')

            trAluno.innerHTML = `  
        <th scope="row">${id_aluno}</th>
            <td>${id_matricula_rm}</td>
            <td>${nome_aluno}</td>
            <td><span class="badge bg-success">${status_aluno}</span></td>
            <td>
            <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-sm btn-outline-info" title="Informações"><i class="bi bi-info-circle"></i></button>
            <button class="btn btn-sm btn-outline-primary" title="Editar"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-cancelar-matricula" title="Apagar"><i class="bi bi-x"></i></button>
            </div>
            </td>`

            const botaoCancelarMatricula = trAluno.querySelector(".btn-cancelar-matricula")
            botaoCancelarMatricula.addEventListener("click", () => {
                cancelarMatricula(id_matricula_rm)
            })


            elementoTableData.append(trAluno)


        })
    }


    // COLOCA UM EVENTO NO BOTÃO DE VOLTAR PARA ESVAZIAR A TELA E VOLTAR A APARECER TURMASS
    const botaoVoltarTela = sectionInformacaoTurma.querySelector('#voltar-tela');
    // 4. Pendura a função nele passando o ID ou os dados que precisar
    botaoVoltarTela.addEventListener('click', () => {
        elementoTelaMatricula.innerHTML = "" // esvazeia a tela
        alterarTela("TURMAS"); // altera para a tela de turmas
    });


    const botaoMatricular = sectionInformacaoTurma.querySelector("#btn-matricular")
    botaoMatricular.addEventListener('click', () => {
        realizarMatricula(id_turma)
    })



    // ADICIONA O ELEMENTO DA TURMA NA SECTION DA INFORMAÇÃO DAS TURMAS
    elementoTelaMatricula.appendChild(sectionInformacaoTurma)


}


///////////////////////////////////////////

// MODAIS

// MODAL DE REALIZAR MATRICULA DE USUÁRIO X NO CURSO ESCOLHIDO
const realizarMatricula = (id_turma) => {
    const turmaEscolhida = turmasDisponiveis.find((p) => p.id_turma == id_turma);

    if (!turmaEscolhida) {
        return Swal.fire("Erro", "Não foi possível achar a turma!", "error");
    }

    Swal.fire({
        html: `
            <div class="text-start p-2">
                <p class="text-secondary fw-bold text-center">
                    <i class="bi bi-mortarboard-fill"></i> ${turmaEscolhida.nome_curso}
                </p>
                <div class="mb-3 border p-3 rounded">
                    <label for="ra-aluno" class="form-label fw-bold text-secondary">
                        <i class="bi bi-card-text me-1"></i> Digite o RA do aluno:
                    </label>
                    <input 
                        type="text" 
                        id="ra-aluno" 
                        class="form-control" 
                        placeholder="Ex: 20260101"
                        autocomplete="off"
                        maxlength="15"
                    >
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonColor: "#000000",
        cancelButtonColor: "#ff0000",
        confirmButtonText: "Matricular",
        cancelButtonText: "Voltar",

        // QUANDO ABRE O MODAL, ELE TOCA ESSA FUNÇÃO, BASICAMENTE ELE VAI IMPLEMENTAR UM ESCUTADOR NO INPUT BEM NA HORA QUE ELE É CRIADO NO DOM
        didOpen: () => {
            const inputRA = document.getElementById('ra-aluno');

            // Adiciona o listener direto no input do modal
            inputRA.addEventListener('input', (e) => {
                // O regex \D (D maiúsculo) significa "tudo que NÃO for número"
                // O replace vai trocar qualquer letra ou símbolo por "" (nada) em tempo real

                e.target.value = e.target.value.replace(/\D/g, '');
            });
        },

        preConfirm: () => {
            const raInput = document.getElementById('ra-aluno').value.trim();

            // Como o input já barra as letras, aqui só checamos se não enviou vazio    

            if (raInput === "") {
                Swal.showValidationMessage("O campo RA não pode ficar vazio!");
                return false;
            }

            return raInput;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const raValidado = result.value;
            Swal.fire({
                title: "Sucesso!",
                text: `Aluno com RA ${raValidado} matriculado na turma.`,
                icon: "success"
            });
        }
    });
}


const cancelarMatricula = (id_matricula_rm) => {
    let turmaDono = null;
    let alunoEncontrado = null;

    // 1. Procura em todas as turmas qual delas tem o aluno com esse RM
    for (const turma of turmasDisponiveis) {
        alunoEncontrado = turma.alunos_curso.find(aluno => aluno.id_matricula_rm == id_matricula_rm);

        if (alunoEncontrado) {
            turmaDono = turma; // Guardamos a turma onde o aluno estuda
            break; // Já achamos, podemos parar o loop
        }
    }

    // Se varreu tudo e não achou o RM
    if (!alunoEncontrado || !turmaDono) {
        return Swal.fire("Erro", "Matrícula não encontrada no sistema!", "error");
    }

    // 2. Abre o modal perguntando se deseja cancelar
    Swal.fire({
        title: "Cancelar Matrícula?",
        html: `
            <div class="text-start p-2">
                <p class="mb-2 text-center text-danger fw-bold">
                    <i class="bi bi-exclamation-triangle-fill"></i> Atenção! Esta ação não pode ser desfeita.
                </p>
                <div class="border p-3 rounded bg-light">
                    <p class="mb-1"><strong>Aluno:</strong> ${alunoEncontrado.nome_aluno}</p>
                    <p class="mb-1"><strong>RM:</strong> ${alunoEncontrado.id_matricula_rm}</p>
                    <p class="mb-0"><strong>Curso:</strong> ${turmaDono.nome_curso} (${turmaDono.nome_turma})</p>
                </div>
            </div>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545", // Vermelho do Bootstrap (Danger)
        cancelButtonColor: "#6c757d",  // Cinza do Bootstrap (Secondary)
        confirmButtonText: "Sim, cancelar matrícula",
        cancelButtonText: "Voltar"
    }).then((result) => {
        if (result.isConfirmed) {

            turmaDono.alunos_curso = turmaDono.alunos_curso.filter(
                aluno => aluno.id_matricula_rm != id_matricula_rm
            );

            turmaDono.num_alunos = turmaDono.alunos_curso.length;

            // Sucesso!
            Swal.fire({
                title: "Cancelada!",
                text: `A matrícula do aluno ${alunoEncontrado.nome_aluno} foi removida.`,
                icon: "success"
            }).then(() => {
                carregarInfomacaoTurma(turmaDono.id_turma);
            });
        }
    });
}


// init
(() => {
    carregarTurmasDisponiveis()

})()