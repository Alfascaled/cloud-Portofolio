const fadeElements =
    document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {

    fadeElements.forEach(el => {

        const position =
            el.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {
            el.classList.add("show");
        }

    });

});

async function loadProjects() {

    const response =
        await fetch("/api/projects");

    const projects =
        await response.json();

    const container =
        document.getElementById("projectList");

    container.innerHTML = "";

    projects.forEach(project => {

        container.innerHTML += `

<div class="project">

<h3>${project.title}</h3>

<p>${project.description}</p>

<button
onclick="deleteProject(${project.id})">

Delete

</button>

</div>

`;

    });

}

async function addProject() {

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    await fetch("/api/projects", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            description
        })

    });

    loadProjects();

}

async function deleteProject(id) {

    await fetch(
        `/api/projects/${id}`,
        {
            method: "DELETE"
        }
    );

    loadProjects();

}

async function sendMessage() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const message =
        document.getElementById("message").value;

    await fetch("/api/messages", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            message
        })

    });

    alert("Message Sent");

}

loadProjects();