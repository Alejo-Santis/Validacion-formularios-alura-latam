export function validate(input) {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo email no puede estar vacío",
    typeMismatch: "El email no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un número y no puede contener caracteres especiales",
  },
  nacimiento: {
    valueMissing: "El campo fecha de nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "El campo número telefonico no puede estar vacío",
    patternMismatch: "El formato requerido es xxxxxxxxxx 10 números",
  },
  direccion: {
    valueMissing: "El campo dirección no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "El campo dirección no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 5 a 15 caracteres",
  },
  estado: {
    valueMissing: "El campo dirección no puede estar vacío",
    patternMismatch: "El estado debe contener entre 5 a 20 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaForm = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaForm)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
