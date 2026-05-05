// .json:JavaScript Object Notification

// API: chiavi che ci permettono di raggiungere un .json online

// fetch(): chiamata asincrona che collega il nostro json e da esso estrarne il dato sottoforma di Promise.

// .then(): questo metodo permette di convertire la Promise nel dato strutturale e di poterlo utilizzare come tale su javascript
// Passaggi
// 1-fetch(): collego .json e ottengo una promise
// 2-.then(): converto la promis in un dato strutturale in JS
// 3-.then(): utilizzare il dato ottenuto

// .json: è un metodo delle promise che mi permette di convertirla in Oggetto JS





fetch("./annunci.json").then((response) => response.json()).then((data) => {

    data.sort((a, b) => a.price - b.price);


    let radioWrapper = document.querySelector("#radioWrapper")
    let cardWrapper = document.querySelector("#cardWrapper")

    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category)

        // METODO CON FOR EACH...il !davanti unquie è un not, grazie a quello includes diventa not includes
        // let uniqueCategories=[]
        // categories.forEach((category)=>{
        //     if(!uniqueCategories.includes(category)){
        //         uniqueCategories.push(category)
        //     }

        // })
        // Con METODO SET 
        // Set():classe che mi restituisce partendo da un array un nuovo oggetto di tipo Set il quale contiene solo valori univoci
        // Array.from():Mi permette di convertire un array-like in un array
        let uniqueCategories = Array.from(new Set(categories))

        uniqueCategories.forEach((category) => {
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="Categories" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
            `;
            radioWrapper.appendChild(div)
        })
    }
    radioCreate()


    function showCards(array) {
        cardWrapper.innerHTML = ""
        array.forEach((annuncio) => {
            let div = document.createElement("div");
            div.classList.add("card-custom");
            div.innerHTML = `<p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                    <p class="h4">${annuncio.category}</p>
                    <p class="lead">${annuncio.price} €</p>`

            cardWrapper.appendChild(div)
        })
    }

    function truncateWord(string) {
        if (string.length > 15) {
            return string.split(" ")[0] + "...";
        } else {
            return string
        }
    }
    let radioButtons = document.querySelectorAll(".form-check-input")
    function filterByCategory(array) {
        // In questa funzione devo ottenere un nuovo array partendo da data e gli elementi del nuovo array dovranno soddisfare per la quale la loro category,sia uguale alla categoria che stiamo passando alla funzione
        
        let categoria= Array.from(radioButtons).find((button)=>button.checked).id
    //    Stesso metodo splittato in passaggi
        // let arrayFromNodeList= Array.from(radioButtons)
        // let button =arrayFromNodeList.find((button)=>button.checked)
        // let categoria= button.id
        

        if (categoria != "All") {
            let filtered = data.filter((annuncio) => annuncio.category == categoria)
            
            
            return filtered
        } else {
            return array
        }

    }

    radioButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setPriceInput(filterByCategory(data))
               globalFilter()

        })
    })
    showCards(data)

    let priceInput = document.querySelector("#priceInput")
    let priceValue = document.querySelector("#priceValue")

    function setPriceInput(array) {
        // dopo aver catturato l'input voglio settare come proprietà max dello stesso il valore più alto tra i price di ogni prodotto.Per farlo avrò quindi bisogno di un array che contenga solo i prezzi, a quel punto lo ordino in maniera crescente o decrescente e prendermi l'elemento con il valore più alto.

        // Il + davanti rende le stringhe numeri

        let prices = array.map((annuncio) => +annuncio.price)
        prices.sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice
        priceInput.value = maxPrice
        priceValue.innerHTML = maxPrice

    }

    setPriceInput(filterByCategory(data))


    function filterByPrice(array) {
        let filtered = array.filter((annuncio) => +annuncio.price <= priceInput.value);
        
        priceValue.innerHTML = priceInput.value
        return filtered

    }
    priceInput.addEventListener("input", () => {

            globalFilter()

    })

    let wordInput = document.querySelector("#wordInput")

    function filterByWord(array) {
        let filtered = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered


    }
    wordInput.addEventListener("input", () => {
            globalFilter()

        // Quello di cui abbiamo bisogno è che ad ogni evento scattino tutte e tre le funzioni concatenandosi una all'altra e non partendo da data
    })
    function globalFilter(){
        let filteredByCategory=filterByCategory(data);   //array filtrato per categoria
        let filteredByPrice=filterByPrice(filteredByCategory); //prezzo
        let filteredByWord=filterByWord(filteredByPrice) // array filtrato per categoria prezzo e parola
        showCards(filteredByWord)
    }


    // globalFilter()
})
