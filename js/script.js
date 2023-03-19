const nombre = document.getElementById("nombreInput");
const apellido = document.getElementById("apellidoInput");
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const cuerpoTabla = document.getElementById("cuerpoTabla");

const agregarUsuario = () => {
  const usuario = {
    id: crypto.randomUUID(),
    nombre: nombre.value,
    apellido: apellido.value,
  };

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
};

const mostrarUsuarios = () => {
  cuerpoTabla.innerHTML = "";
  usuarios.forEach((usuario) => {
    cuerpoTabla.innerHTML += `<tr>
        <th scope="row">${usuario.id}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>
        <button
          type="button"
          class="btn btn-danger"
          onclick="eliminarUsuario('${usuario.id}')"
        >
          Eliminar
        </button><td>
    </tr>`;
  });
};

const eliminarUsuario = (id) => {
    const confirmacion = confirm("¿Está seguro de que desea eliminar este usuario?");
    if (confirmacion) {
      usuarios = usuarios.filter(usuario => usuario.id !== id);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarUsuarios();
    }
  };
  