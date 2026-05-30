document
.getElementById("formHorario")
.addEventListener("submit", function(event){

    event.preventDefault();

    let turma = document.getElementById("turma").value;
    let disciplina = document.getElementById("disciplina").value;
    let professor = document.getElementById("professor").value;
    let dia = document.getElementById("dia").value;
    let inicio = document.getElementById("inicio").value;
    let fim = document.getElementById("fim").value;

    let mensagem = document.getElementById("mensagem");

    if(
        turma === "" ||
        disciplina === "" ||
        professor === "" ||
        dia === "" ||
        inicio === "" ||
        fim === ""
    ){
        mensagem.innerHTML =
            '<div class="alert alert-danger">Preencha todos os campos.</div>';
        return;
    }

    if(fim <= inicio){
        mensagem.innerHTML =
            '<div class="alert alert-danger">O horário final deve ser maior que o inicial.</div>';
        return;
    }

    mensagem.innerHTML =
        '<div class="alert alert-success">Horário cadastrado com sucesso!</div>';

    document.getElementById("formHorario").reset();

});