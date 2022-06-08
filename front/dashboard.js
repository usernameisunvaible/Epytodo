window.onload = load_todos()

function load_todos() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/user/todos");
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
                window.location.href = "/home.html"
            }
        }
    }
    xhr.send()
}

function add_new_todo() {
    let title = document.getElementById("title_input").value
    let dead_line = document.getElementById("dead_line_input").value
    let desc = document.getElementById("desc_input").value
    let status = document.getElementById("status_input").value
    let uid = document.getElementById("uid_input").value
    dead_line = dead_line.replace("T", " ")
    dead_line += ":00"
    let obj = {"title" : title, "description" : desc, "due_time" : dead_line, "user_id" : parseInt(uid), "status" : status}
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "todos", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8=');
    xhr.setRequestHeader( "Authorization", sessionStorage.getItem("token"));

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                window.location.href = "/dashboard.html"
            } else {
                document.getElementById("wrong").innerHTML = "Something gone wrong"
            }
        }
    }
    xhr.send(JSON.stringify(obj))

}



function add_todo_dashboard (title, desc, dead_line, status, todo_id) {
    var newDiv = document.createElement("div");
    newDiv.className = "todo_container"

    var del_button = document.createElement("input")
    del_button.className = "del_button"
    del_button.type = "image"
    del_button.src = "del.png"
    del_button.onclick = function () {
        // console.log(todo_id)
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/todos/" + todo_id);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8=');
        xhr.setRequestHeader( "Authorization", sessionStorage.getItem("token"))
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 201) {
                    window.location.href = "/dashboard.html"
                } else {
                    document.getElementById("wrong").innerHTML = "Something gone wrong"
                }
            }
        }
        xhr.send()
      };
    newDiv.appendChild(del_button)
    var vtitle = document.createElement("h3");
    vtitle.innerHTML = title
    vtitle.className = "title"
    newDiv.appendChild(vtitle)
    var vdesc = document.createElement("p");
    vdesc.innerHTML = desc
    vdesc.className = "desc"
    newDiv.appendChild(vdesc)
    var vdeli = document.createElement("p");
    vdeli.innerHTML = "due time : "+ dead_line
    vdeli.className = "dead_line"
    newDiv.appendChild(vdeli)
    var vstatus = document.createElement("p");
    vstatus.innerHTML = "status : "+ status
    vstatus.className = "status"
    newDiv.appendChild(vstatus)
    var currentDiv = document.getElementById('main_div');
    currentDiv.appendChild(newDiv);
}
