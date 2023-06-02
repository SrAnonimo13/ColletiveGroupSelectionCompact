const SelectUser = document.getElementById("select-user");
const FavoritesSelection = document.querySelectorAll(".favorite-selection");

const Form = document.querySelector("form");

Form.addEventListener('submit', async e => {
    e.stopPropagation();
    e.preventDefault();

    const formValues = getFormValues(Form);

    console.log(formValues)

    const response = await fetch(API_ROUTES.editUser + '/' + formValues.current_username, {
        body: JSON.stringify({
            favorites: [
                formValues['favorite-0'],
                formValues['favorite-1'],
                formValues['favorite-2'],
                formValues['favorite-3'],
                formValues['favorite-4']
            ]
        }),
        method: 'PUT',
        headers: RequestHeaders
    }).then(async e => await e.json());
    
    console.log(response)
    
    alert("Formulario preechido");

    window.location.replace('/');
})

const states = new Proxy({
    currentUserName: users[0],
    favorites: [
        users[1],
        users[2],
        users[3],
        users[4],
        users[5]
    ]
}, {});

function getUsersNotUsed() {
    return users.filter(user => !(
        states.favorites
            .map(e => e.id)
            .includes(user.id)
        ||
        states.currentUserName.id == user.id
    ))
}

function optionsTag(id, value, props = {}) {
    return `<option value="${id}" ${Object?.keys(props)?.map(key => {
        const propValue = props[key]

        if (propValue === true)
            return `${key}`;

        if (propValue === false)
            return;

        return `${key}="${propValue}"`
    }) ?? ''}>${value}</option>`
}

function showUserNameOptions() {
    SelectUser.innerHTML = "";

    SelectUser.innerHTML += optionsTag(states.currentUserName.id, states.currentUserName.name);
    SelectUser.innerHTML += getUsersNotUsed().map(v => optionsTag(v.id, v.name)).join('\n');
}

function showFavoritesUsersOptions() {
    FavoritesSelection.forEach((v, i) => {
        v.innerHTML = "";

        const currentFavorite = states.favorites[i]

        v.innerHTML += optionsTag(currentFavorite.id, currentFavorite.name, { selected: true });
        v.innerHTML += getUsersNotUsed().map(user => optionsTag(user.id, user.name)).join('\n');
    })
}

showUserNameOptions();
showFavoritesUsersOptions();

function handleOnChange(e) {
    if (e.target.id == "select-user") {
        const select = e.target;

        const optionSelected = select.options[select.selectedIndex];

        states.currentUserName = {
            id: optionSelected.value,
            name: optionSelected.text
        }
    }

    if (e.target.className == "favorite-selection") {
        const select = e.target;

        const optionIndex = select.id.split('-')[2];
        const optionSelected = select.options[select.selectedIndex];

        states.favorites[optionIndex] = {
            id: optionSelected.value,
            name: optionSelected.text
        }
    }

    showUserNameOptions();
    showFavoritesUsersOptions();
}

SelectUser.addEventListener('change', handleOnChange);
FavoritesSelection.forEach(v => v.addEventListener('change', handleOnChange));