document
.getElementById("formDisciplina")
.addEventListener("submit", function(event){

    event.preventDefault();

    let nome = document.getElementById("nomeDisciplina").value;
    let codigo = document.getElementById("codigo").value;
    let carga = document.getElementById("cargaHoraria").value;
    let professor = document.getElementById("professor").value;
    let periodo = document.getElementById("periodo").value;
    let status = document.getElementById("status").value;

    let mensagem = document.getElementById("mensagem");

    if(
        nome === "" ||
        codigo === "" ||
        carga === "" ||
        professor === "" ||
        periodo === "" ||
        status === ""
    ){
        mensagem.innerHTML =
        '<div class="alert alert-danger">Preencha todos os campos.</div>';
        return;
    }

    if(carga <= 0){
        mensagem.innerHTML =
        '<div class="alert alert-danger">Carga horária inválida.</div>';
        return;
    }

    mensagem.innerHTML =
    '<div class="alert alert-success">Disciplina cadastrada com sucesso!</div>';

    document.getElementById("formDisciplina").reset();

});