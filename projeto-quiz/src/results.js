import { createResult, deleteResult, fetchResults } from "./api";
import { button, listItem } from "./elements";

//Carrega os resultados da API para uma lista no HTML
export async function loadResults(ul){
    ul.innerHTML = '';
    const results = await fetchResults();

    results.forEach((result) =>{
        const li = listItem("", {
          id: `result-${result.id}`,
          innerHTML: `<h3>${result.name}</h3><p>${result.description}</p>`  
        });

        //Cria botão para exluir o respectivo elemento
        const deleteButton = button("Excluir Resultado", {
            type: "button",
            className: "",
            onClick: async () => {
                await deleteResult(result.id);
                li.remove();
            }
        });

        li.append(deleteButton);
        ul.append(li);
    })
}

//Captura os dados do form e passa para API
export function addSubmitResultListener(form){
    form.addEventListener('submit', async (event) =>{
        event.preventDefault();

        const formData = new FormData(form);

        const nameField = formData.get('name');
        const descriptionFiled = formData.get('description');

       await createResult(nameField, descriptionFiled);

       form.reset();
       loadResults(document.getElementById('resultsList'));
    })
}