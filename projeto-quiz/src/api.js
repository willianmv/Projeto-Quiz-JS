//Requisição POST - salvar os dados do form
export async function createResult(name, description) {
    const body = JSON.stringify({name, description});

    await fetch('http://localhost:3000/results', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body
    })
}

//Requisição GET - recuperar dados do banco (results)
export async function fetchResults() {
    const results = await fetch('http://localhost:3000/results')
    .then((response) => response.json());
    return results;
}

//Requisição DELETE - deletar por ID do resultado
export async function deleteResult(resultId){
    await fetch(`http://localhost:3000/results/${resultId}`, {method: "DELETE" });
}

//Requisição GET - recuperar dados do banco (questions)
export async function fetchQuestions(){
    return await fetch('http://localhost:3000/questions').then((response) => response.json());
}

//Requisição POST - cria pergunta padrão
export async function createQuestion(text = 'Escreva sua pergunta...', 
    points = {
        fullyDisagree: null,
        partiallyDesagree: null,
        dontKnow: null, 
        partiallyAgree: null,
        fullyAgree: null
    }){
        const body = JSON.stringify({text: text, points: points});

        await fetch('http://localhost:3000/questions', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: body
        })
}

//Requisição PUT - atualizar dados da pergunta
export async function updateQuestion(questionId, text, points){
    const body = JSON.stringify({text, points});
    await fetch(`http://localhost:3000/questions/${questionId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: body
    });
}

//Requisição DELETE - deletar por ID da pergunta
export async function deleteQuestion(questionId){
    await fetch(`http://localhost:3000/questions/${questionId}`, {method: "DELETE"});
}