import { fetchResults } from './src/api';
import { createEmptyQuestion, loadQuestionsManager } from './src/questions';
import { addSubmitResultListener, loadResults } from './src/results';
import './style.css'

document.addEventListener('DOMContentLoaded', async function(){
    
    const newResultForm = document.getElementById('newResultForm');
    if(newResultForm) addSubmitResultListener(newResultForm);

    const results = await fetchResults();

    const resultList = document.getElementById('resultsList');
    if(resultList) loadResults(resultList);

    const questionsManager = document.getElementById('questionsManager');
    if(questionsManager) loadQuestionsManager(questionsManager);

    const newQuestionBtn = document.getElementById('newQuestion');
    if(newQuestionBtn) newQuestionBtn.addEventListener('click', () =>createEmptyQuestion(questionsManager, results));


})
