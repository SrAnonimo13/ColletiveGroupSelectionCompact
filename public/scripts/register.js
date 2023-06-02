const form = document.querySelector('form#register-from');

form.addEventListener('submit', handleSubmit);

/**@param {SubmitEvent} e  */
async function handleSubmit(e) {
    e.preventDefault();

    const elements = getFormValues(e.target);

    const namesArray = elements.names.split('\n');

    if(namesArray.length < 6) {
        alert('E Nessesario no minimo 6 nomes!')
        return;
    }

    const response = await fetch(API_ROUTES.registerClass, {
        method: "POST",
        headers: RequestHeaders,
        body: JSON.stringify({names: namesArray})
    }).then(async e => await e.json());

    window.location.replace(`/selection?id=${response.id}`);
}