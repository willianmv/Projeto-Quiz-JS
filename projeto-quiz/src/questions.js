import { createQuestion, deleteQuestion, fetchQuestions, fetchResults, updateQuestion } from "./api";
import { button, div, h3, input, label, option, select } from "./elements";

//Cria uma nova pergunta na API e um formulário para a mesma
export async function createEmptyQuestion(managerElement, results) {
    const question = await createQuestion();
    
    createQuestionForm(managerElement, question, results );
}

//Carrega os dados da API para a div de forms
export async function loadQuestionsManager(managerElement) {
    managerElement.innerHTML = '';
    const questions = await fetchQuestions();
    const results = await fetchResults();

    questions.forEach((question) => createQuestionForm(managerElement, question, results));
}

//Criar formulário dinamicamente
function createQuestionForm(managerElement, question, results){
    const questionForm = document.createElement('form');
    questionForm.classList.add('questionForm');

    questionForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        const text = formData.get('text');

        const points = {};
        points.fullyDisagree = formData.get("fullyDisagree");
        points.partiallyDisagree = formData.get("partiallyDisagree");
        points.dontKnow = formData.get("dontKnow");
        points.partiallyAgree = formData.get("partiallyAgree");
        points.fullyAgree = formData.get("fullyAgree");

        await updateQuestion(question.id, text, points);
        alert('Pergunta atualizada com sucesso!');
    } )

    const questionFormTitle = h3(`Pergunta ID: ${question.id}`);
    const questionTextLabel = label(`Texto da pergunta: `, `question-${question.id}-text`);
    const questionTextInput = input('text', {
        id: `question-${question.id}-text`,
        name: 'text',
        value: question.text
    });

    const fullyDisagreeField = createAlternativeField({
        labelText: 'Discordo Completamente',
        fieldId: `question-${question.id}-fully-disagree`,
        fieldName: 'fullyDisagree'
    }, question, results);

    const partiallyDesagreeField = createAlternativeField({
        labelText: 'Discordo Parcialmente',
        fieldId: `question-${question.id}-partially-disagree`,
        fieldName: 'partiallyDisagree'
    }, question, results);

    const dontKnoweField = createAlternativeField({
        labelText: 'Não sei',
        fieldId: `question-${question.id}-dont-know`,
        fieldName: 'dontKnow'
    }, question, results);

    const partiallyAgreeField = createAlternativeField({
        labelText: 'Concordo Parcialmente',
        fieldId: `question-${question.id}-partially-agree`,
        fieldName: 'partiallyAgree'
    }, question, results);

    const fullyAgreeField = createAlternativeField({
        labelText: 'Concordo Completamente',
        fieldId: `question-${question.id}-fully-agree`,
        fieldName: 'fullyAgree'
    }, question, results);

    const buttonGroup = div({className: 'button-group'});
    const submitBtn = button('Salvar Pergunta', {type: 'submit'});
    const deleteBtn = button('Excluir Pergunta', {
        type: 'button',
        onClick: async () => {
            await deleteQuestion(question.id);
            questionForm.remove();
        }
    });

    buttonGroup.append(submitBtn, deleteBtn);

    questionForm.append(
        questionFormTitle, 
        questionTextLabel, 
        questionTextInput, 
        fullyDisagreeField,
        partiallyDesagreeField,
        dontKnoweField,
        partiallyAgreeField,
        fullyAgreeField,
        buttonGroup);

    managerElement.append(questionForm);
}

//Cria campos de select
function createAlternativeField(alternative, question, results){
    const container = div({className: 'inline-block'});

    const fieldLabel = label(alternative.labelText, alternative.fieldId);
    const fieldSelect = select(alternative.fieldId, alternative.fieldName);

    const defaultOption = option('Selecione...', {select: true, disabled: true});
    fieldSelect.options.add(defaultOption);

    //Para comparar os id transformei da base 16 para 10
    results.forEach((result) => {
        const resultOption = option(result.name, {
            value: parseInt(result.id, 16),
            selected: question.points[alternative.fieldName] === parseInt(result.id, 16),
        });
        fieldSelect.options.add(resultOption);
    })

    container.append(fieldLabel, fieldSelect);
    return container;
}