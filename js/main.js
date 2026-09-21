function cargarPagina(pagina) {
    fetch('pages/' + pagina)
        .then(response => {
            if (!response.ok) {
                throw new error('error al cargar la pagina');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('contenido').innerHTML = data;
            localStorage.setItem("paginaActual", pagina);
        })
        .catch(error => {
            document.getElementById('contenido').innerHTML =
                "<p>error cargando el contenido</p>";
            console.error(error);
        });

}

document.addEventListener("DOMContentLoaded", function() {
    const paginaGuardada = localStorage.getItem("paginaActual");
    if(paginaGuardada) {
        cargarPagina(paginaGuardada);
    }  else {
        cargarPagina("inicio.html");
    }

});


document.addEventListener("DOMContentLoaded", () => {
   

    const loginScreen = document.getElementById("loginScreen");
    const appContent = document.getElementById("appContent");

    const nombreGuardado = localStorage.getItem("nombreUsuario");

    if (nombreGuardado) {

        loginScreen.style.display = "none";
        appContent.style.display = "block";

    }

    
document.getElementById("formLogin").addEventListener("submit", function(e) {
     //alert("bienvenido a mi sitio web");

    e.preventDefault();

    const nombre = document.getElementById("inputNombre").value.trim();

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if(nombre === "" || !regex.test(nombre)) {

        alert("Ingrese un nombre válido");
        const alertContainer = document.getElementById("alertContainer");

        alertContainer.innerHTML = `
         <div class="alert alert-danger alert-dismissible fade show" role="alert">
           Ingrese un nombre válido
           <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
         </div>
        `;

        setTimeout(() => {
            alertContainer.innerHTML = "";
        }, 3000);

    }else{

        document.getElementById("nombre").innerHTML = 
        "Hola, " + nombre;

        localStorage.setItem("nombreUsuario", nombre);

        document.getElementById("loginScreen").style.display = "none";

        document.getElementById("appContent").style.display = "block";
    }

});


});


document.addEventListener("DOMContentLoaded", function () {
    const videoModal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const videoTitle = document.getElementById("videoModalTitle");

    if (videoModal) {
        videoModal.addEventListener("show.bs.modal", function (event) {
            const button = event.relatedTarget;

            const videoUrl = button.getAttribute("data-video");
            const title = button.getAttribute("data-title");

            videoTitle.textContent = title;

            let separator = videoUrl.includes("?") ? "&" : "?";
            videoFrame.src = videoUrl + separator + "autoplay=1";
        });

        videoModal.addEventListener("hidden.bs.modal", function () {
            videoFrame.src = "";
        });
    }
});
