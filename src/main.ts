/* 
    Utilizzare async/await per creare la funzione getChefBirthday(id). 
    Questa funzione accetta un id di una ricetta e deve:
        - Recuperare la ricetta da https://dummyjson.com/recipes/{id}
        - Estrarre la proprietà userId dalla ricetta
        - Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
        - Restituire la data di nascita dello chef
    
    Note:
    Scrivi la funzione getChefBirthday(id), che deve:
        - Essere asincrona (async).
        - Utilizzare await per chiamare le API.
        - Restituire una Promise con la data di nascita dello chef.
        - Gestire gli errori con try/catch
*/

/* 
    Funzione asincrona che, partendo dall'id di una ricetta, 
    restituisce una promise con la data di nascita dello chef */
async function getChefBirthday(id: number): Promise<string> {

  // Recupera ricetta + informazioni chef
  const ricetta: { userId: number } = await fetchJson(`https://dummyjson.com/recipes/${id}`);       // Recupera ricetta
  const userId = ricetta.userId;                                                                    // Estrae userId da ricetta
  const user: { birthDate: string } = await fetchJson(`https://dummyjson.com/users/${userId}`);     // Recupera le informazioni dello chef 

  return user.birthDate;
}

/* 
    Funzione di utilità asincrona che, a seguito di una chiamata API,
    restituisce una promise con il JSON della risposta (convertito in oggetto) */
async function fetchJson<T>(url: string): Promise<T> {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Errore HTTP: ${response.status}`);
  }

  const data: T = await response.json();

  return data;
}


/* 
    Funzione asincrona che recupera la data di nascita dello chef
    gestendo eventuali errori */
(async () => {

  try {
    const birthDate = await getChefBirthday(1);
    console.log("Data di nascita dello chef:", birthDate);
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Errore:", error.message);
    }
  } 
  finally {
    console.log("Fine!");
  }

})();
