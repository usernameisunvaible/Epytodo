
function check_pass() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/user/password");
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8=');
    xhr.setRequestHeader( "Authorization", sessionStorage.getItem("token"))

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                let rep = JSON.parse(xhr.response);
                for (let i = 0; i < rep.length; ++i) {

                    add_todo_dashboard(rep[i].title, rep[i].description, rep[i].due_time, rep[i].status, rep[i].id)
                }
            } else {
                document.getElementById("wrong").innerHTML = "Bad Password"
            }
        }
    }
    let obj = {"msg" : document.getElementById("password").value}
    xhr.send(JSON.stringify(obj))
}