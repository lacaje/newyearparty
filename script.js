submitBtn.addEventListener('click', () => {
  const nome = document.getElementById('nome').value.trim();
  const cognome = document.getElementById('cognome').value.trim();
  const sesso = document.getElementById('sesso').value;
  const anno = document.getElementById('anno').value.trim();
  const insta = document.getElementById('instagram').value.trim();
  const tel = document.getElementById('telefono').value.trim();

  if (!nome || !cognome || !sesso || !anno || !insta || !tel) {
    msg.style.color = 'red';
    msg.textContent = "Compila tutti i campi!";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Invio in corso...";

  // Il JSON deve avere i nomi delle colonne esatti
  const payload = {
    data: [
      {
        "NOME": nome,
        "COGNOME": cognome,
        "SESSO": sesso,
        "ANNO DI NASCITA": anno,
        "INSTAGRAM": insta,
        "TELEFONO": tel
      }
    ]
  };

  fetch('https://sheetdb.io/api/v1/0el2b6c0k82lp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (res.ok) {
      msg.style.color = 'limegreen';
      msg.textContent = "Registrazione avvenuta!";
      localStorage.setItem('prenotato', 'true');
      prenotaBtn.disabled = true;
      prenotaBtn.textContent = "Registrazione già inviata";
      setTimeout(() => { formPopup.style.display = 'none'; }, 1500);
    } else {
      msg.style.color = 'red';
      msg.textContent = "Errore dal server, riprova";
    }
  })
  .catch((err) => {
    msg.style.color = 'red';
    msg.textContent = "Errore di connessione";
    console.error("Errore fetch:", err);
    submitBtn.disabled = false;
    submitBtn.textContent = "Invia";
  });
});
