function login_regiset_submit(id_list, next_url, route){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", route, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8=');
    var j = {}
    for (let i = 0; i < id_list.length; ++i) {
        j[id_list[i]] = document.getElementById(id_list[i]).value
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                let res = JSON.parse(xhr.response)
                sessionStorage.setItem("token", res.token)
                window.location.href = next_url
            } else {
                document.getElementById("wrong").innerHTML = "Bad informations"
            }
        }
    }
    xhr.send(JSON.stringify(j))
}



