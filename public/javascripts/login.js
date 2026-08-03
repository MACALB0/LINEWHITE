document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicio listo");
  const btnLogin = document.getElementById("btn_login");

  btnLogin.addEventListener("click", () => {
    login();
  });
});

function login() {
  // Tu lógica aquí
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  if (!usuario || !contrasena) {
    alert("Debe ingresar usuario y contraseña");
    return;
  }

  
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: usuario,
      contrasena: contrasena
    }),
  })

  .then(async (res) => {
  const data = await res.json();

  console.log("Status:", res.status);
  console.log("Respuesta:", data);

  if (!res.ok) {
    throw data;
  }

  return data;
})

  .then((data) => {

    console.log("Respuesta:", data);

    if (data.ok) {

      window.location.href = "/index";

    } else {

      const card = document.getElementById("shake-card");

      if(card){
        card.classList.add("shake");

        setTimeout(()=>{
          card.classList.remove("shake");
        },500);
      }


      alert(data.message || "Usuario o contraseña incorrectos");
    }

  })

  .catch((err) => {
  console.error("Error login:", err);

  alert(err.message || "Ocurrió un error");
});
}
