const nombre = document.getElementById("nombreInput");
const apellido = document.getElementById("apellidoInput");
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const cuerpoTabla = document.getElementById("cuerpoTabla");
const idInput = document.getElementById("idInput");

const btnAgregar = document.getElementById("btnAgregar");
const btnEditar = document.getElementById("btnEditar");

// check empty fields 
const checkEmpty = () => {
  if (nombre.value.trim() === "" || apellido.value.trim() === "") {
    alert("Por favor ingrese un nombre y un apellido para el usuario.");
    return true; 
  }
  return false; 
}

// focus on first field "first name" 

function focusInput() {
  var input = document.getElementById("nombreInput");
  input.focus();
  input.select();
}



//add user
const agregarUsuario = () => {
  if (checkEmpty()){
    return;
  }

  const usuario = {
    id: crypto.randomUUID(),
    nombre: nombre.value,
    apellido: apellido.value,
  };

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  nombre.value = "";
  apellido.value = "";
  mostrarUsuarios();
};

//show records function
const mostrarUsuarios = () => {
  cuerpoTabla.innerHTML = "";
  let counter = 0;
  usuarios.forEach((usuario) => {
    counter++;
    cuerpoTabla.innerHTML += `<tr>
        <td>${counter}</td>
        <td
        class="text-field">${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>
        <div style="white-space: nowrap;">
        <button
        type="button"
        title="Editar"
        class="btn btn-outline-info"
        onclick="editarUsuario('${usuario.id}')"
        >
        <i class="bi bi-pencil"></i>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        </button>
        
        <button
        title="Eliminar"
        type="button"
        class="btn btn-outline-danger"
        onclick="eliminarUsuario('${usuario.id}')"
        >
        <i class="bi bi-trash"></i>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        </button>
        </div>
        </td>
        <td>
          <input type="checkbox" name="seleccionarUsuario" value="${usuario.id}">
        </td>
      </tr>`;
  });
};

//show function at window loading
window.addEventListener("load", mostrarUsuarios());

// delete function
const eliminarUsuario = (id) => {
  const confirmacion = confirm(
    "¿Está seguro de que desea eliminar este usuario?"
  );
  if (confirmacion) {
    usuarios = usuarios.filter((usuario) => usuario.id !== id);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuarios();
  }
};

// update user name and last name with prompt, not ideal but it works

// const editarUsuario = (id) => {
//   const usuario = usuarios.find((u) => u.id === id);

//   if (usuario) {
//     const nuevoNombre = prompt(
//       "Ingrese el nuevo nombre del usuario",
//       usuario.nombre
//     );
//     const nuevoApellido = prompt(
//       "Ingrese el nuevo apellido del usuario",
//       usuario.apellido
//     );

//     if (nuevoNombre && nuevoApellido) {
//       usuario.nombre = nuevoNombre;
//       usuario.apellido = nuevoApellido;

//       localStorage.setItem("usuarios", JSON.stringify(usuarios));
//       mostrarUsuarios();
//     }
//   }
// };

//sticky footer function

function isScrolledToBottom() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  return scrollTop + clientHeight >= scrollHeight;
}

const footer = document.querySelector(".sticky-footer");

window.addEventListener("scroll", () => {
  if (isScrolledToBottom()) {
    footer.style.display = "block";
  } else {
    footer.style.display = "none";
  }
});

// download table as csv

const downloadTableAsCSV = () => {
  const confirmacion = confirm("Deseas descargar la lista?");
  if (confirmacion) {
    const filename = "usuarios.csv";
    const rows = Array.from(cuerpoTabla.querySelectorAll("tr"));
    const csv = rows
      .map((row) =>
        Array.from(row.querySelectorAll("td"))
          .map((td) => td.innerText)
          .join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
};

// //segunda funcion edicion

const editarUsuario = (id) => {

  btnAgregar.style.display = "none";
  btnEditar.style.display = "inline";

  const usuario = usuarios.find((usuario) => usuario.id === id);
  idInput.value = usuario.id;
  nombre.value = usuario.nombre;
  apellido.value = usuario.apellido;
  focusInput();
};

const confirmarEdicion = () => {
  if (checkEmpty()){
    return;
  }
  const usuario = usuarios.find((usuario) => usuario.id === idInput.value);
  usuario.nombre = nombre.value;
  usuario.apellido = apellido.value;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  btnAgregar.style.display = "inline";
  btnEditar.style.display = "none";

  idInput.value = "";
  nombre.value = "";
  apellido.value = "";

  mostrarUsuarios();
};



