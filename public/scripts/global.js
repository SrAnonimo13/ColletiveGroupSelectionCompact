const BaseApiRoute = window.location.origin + '/api'

const API_ROUTES = {
    registerClass: BaseApiRoute + '/group',
    getClass: BaseApiRoute + '/group',
    editUser: BaseApiRoute + '/users'
}

const RequestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function getFormValues(form){
    const final = {}

    for(const element of form){
        if(element?.type == "submit") continue;
    
        final[element.name || element.nodeName] = element?.value ?? element.innerText;
    }

    return final;
}