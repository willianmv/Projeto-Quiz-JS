export function addSubmitResultListener(form){
    form.addEventListener('submit', async (event) =>{
        event.preventDefault();

        const formData = new FormData(form);

        const nameField = formData.get('name');
        const descriptionFiled = formData.get('description');

        console.log({nameField, descriptionFiled});
    })
}