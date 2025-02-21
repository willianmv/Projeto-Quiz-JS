import { createQuestion } from './src/api';
import { addSubmitResultListener, loadResults } from './src/results';
import './style.css'

document.addEventListener('DOMContentLoaded', function(){
    
    const newResultForm = document.getElementById('newResultForm');
    if(newResultForm) addSubmitResultListener(newResultForm);


    const resultList = document.getElementById('resultsList');
    if(resultList) loadResults(resultList);

    const newQuestionBtn = document.getElementById('newQuestion');
    if(newQuestionBtn) newQuestionBtn.addEventListener('click', () =>createQuestion());

})
