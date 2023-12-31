function cargaEstudiantes() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/estudiantes");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["nombre"] + "</td>";
        trHTML += "<td>" + object["apellido"] + "</td>";
        trHTML += "<td>" + object["correo"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="actualizarEstudiante(' + object["id"] + ')">Editar</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-secondary" onclick="mostrarNotasEstudiante(' + object.id + ',\'' + object.nombre + '\',\'' + object.apellido + '\')">Notas</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="borrarEstudiante(' + object["id"] + ')">Borrar</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

cargaEstudiantes();
function edicionEstudiante() {
  Swal.fire({
    title: "Crear Estudiante",
    html:
      '<input id="id" type="hidden">' +
      '<input id="nombre" class="swal2-input"  placeholder="Nombre">' +
      '<input id="apellido" class="swal2-input" placeholder="Apellido">' +
      '<input id="correo" class="swal2-input" placeholder="Correo">',
    focusConfirm: false,
    preConfirm: () => {
      creaEstudiante();
    },
  });
}


function edicionNotas() {
  Swal.fire({
    title: "Crear Nota",
    html:
      '<input id="id" type="hidden">' +
      '<input id="observacion" class="swal2-input"  placeholder="Observacion">' +
      '<input id="valor" class="swal2-input" placeholder="Valor">' +
      '<input id="porcentaje" class="swal2-input" placeholder="Porcentaje">' +
      '<input id="estudiante_id" class="swal2-input" placeholder="Estudiante_id">',
    focusConfirm: false,
    preConfirm: () => {
      creaNota();
    },
  });
}

function creaEstudiante() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const correo = document.getElementById("correo").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8080/api/crea");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      nombre: nombre,
      apellido: apellido,
      correo: correo
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      cargaEstudiantes();
    }
  };
}

function creaNota() {
  const observacion = document.getElementById("observacion").value;
  const valor = document.getElementById("valor").value;
  const porcentaje = document.getElementById("porcentaje").value;
  const estudiante_id = document.getElementById("estudiante_id").value;


  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8080/api/nota/crea");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      observacion: observacion,
      valor: valor,
      porcentaje: porcentaje,
      estudiante_id: estudiante_id
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      cargaEstudiantes();
    }
  };
}


function mostrarNotasEstudiante(id, nombre, apellido) {
  var prueba;
  var val;
  var val2;
  var final = 0;
  var finalPor = 0;
  console.log("Flga");
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/estudiante/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(nombre);
      console.log(apellido);
      document.getElementById("notaEstudianteTexto").innerHTML = '<h2>Nota del Estudiante Teoria de La Computacion: ' + nombre + ' ' + apellido + '</h2>';
      //notaText.innerHTML = "Notas del estudiante " + nombre;
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects["notas"]) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["observacion"] + "</td>";
        trHTML += "<td>" + object["valor"] + "</td>";
        trHTML += "<td>" + object["porcentaje"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="actualizarNota(' + object["id"] + ')">Editar</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="borrarNota(' + object["id"] + ')">Borrar</button></td>';
        trHTML += "</tr>";

      }
      document.getElementById("mytableNotas").innerHTML = trHTML;

      for (var i = 0; i < objects["notas"].length; i++) {
        prueba = objects["notas"][i];
        val = prueba["valor"];
        final = final + val;
      }


      for (var i = 0; i < objects["notas"].length; i++) {
        prueba = objects["notas"][i];
        val2 = prueba["porcentaje"];
        finalPor = finalPor + val2;
      }

      final = (final / objects["notas"].length) * (finalPor / 100);

      // prueba = objects["notas"][0];
      // val = prueba["porcentaje"]; 
      // console.log(val);

    }
    document.getElementById("notaPromedioEstudiante").innerHTML = '<h2>Con el porcentaje acumulado del ' + finalPor + '% la nota es de: ' + final + '</h2>';
  };


}

function actualizarEstudiante(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/estudiante/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const obj = JSON.parse(this.responseText);
      console.log(obj.nombre);
      Swal.fire({
        title: "Editar Estudiante",
        html:
          '<input id="id" type="hidden" value=' +
          obj.id +
          ">" +
          '<input id="nombre" class="swal2-input" placeholder="Nombre" value="' +
          obj.nombre +
          '">' +
          '<input id="apellido" class="swal2-input" placeholder="Apellido" value="' +
          obj.apellido +
          '">' +
          '<input id="correo" class="swal2-input" placeholder="Correo" value="' +
          obj.correo +
          '">',
        focusConfirm: false,
        preConfirm: () => {
          editarEstudiante(obj.id);
        },
      });
    }
  };
}

function editarEstudiante(id) {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const correo = document.getElementById("correo").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:8080/api/act/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      cargaEstudiantes();
    }
  };
}

function borrarEstudiante(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:8080/api/borra/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.status == 204) {
      Swal.fire("Estudiante Borrado");
      cargaEstudiantes();
    }
  };
}

// function editarNota(id) {
//   const nombre = document.getElementById("observaciones").value;
//   const apellido = document.getElementById("valor").value;
//   const correo = document.getElementById("porcentaje").value;

//   const xhttp = new XMLHttpRequest();
//   xhttp.open("PUT", "http://localhost:8080/api/act/" + id);
//   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhttp.send(
//     JSON.stringify({
//       id: id,
//       nombre: nombre,
//       apellido: apellido,
//       correo: correo,
//     })
//   );
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       const objects = JSON.parse(this.responseText);
//       Swal.fire(objects["message"]);
//       cargaEstudiantes();
//     }
//   };
// }

function borrarNota(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:8080/api/nota/borra/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.status == 204) {
      Swal.fire("Nota Borrada");
      cargaEstudiantes();
    }
  };
}

function actualizarNota(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/nota/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const obj = JSON.parse(this.responseText);
      console.log(obj.nombre);
      Swal.fire({
        title: "Editar Nota",
        html:
          '<input id="id" type="hidden" value=' +
          obj.id +
          ">" +
          '<input id="observaciones" class="swal2-input" placeholder="Nombre" value="' +
          obj.observaciones +
          '">' +
          '<input id="valor" class="swal2-input" placeholder="Apellido" value="' +
          obj.valor +
          '">' +
          '<input id="porcentaje" class="swal2-input" placeholder="Correo" value="' +
          obj.porcentaje +
          '">',
        focusConfirm: false,
        preConfirm: () => {
          var observacion = document.getElementById('observaciones').value;
          var valor = document.getElementById('valor').value;
          var porcentaje = document.getElementById('porcentaje').value;
          console.log("Flag");
          console.log(obj);
          editarNota(obj.id, observacion, valor, porcentaje);
        },
      });
    }
  };
}

function editarNota(id, observacion, valor, porcentaje) {
  console.log(id);
  console.log(observacion);
  console.log(valor);
  console.log(porcentaje);

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:8080/api/nota/act/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
      observacion: observacion,
      valor: valor,
      porcentaje: porcentaje,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      cargaEstudiantes();
    }
  };
}



