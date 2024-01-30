document.addEventListener("DOMContentLoaded", function () {
    const player1Input = document.getElementsByName("player1")[0];
    const player2Input = document.getElementsByName("player2")[0];

    player1Input.addEventListener("input", function () {
        updateAutocomplete(player1Input, "player1Autocomplete");
    });

    player2Input.addEventListener("input", function () {
        updateAutocomplete(player2Input, "player2Autocomplete");
    });

    let names = []; // To store the names fetched from the API

    fetch("https://puckpathapi.azurewebsites.net/Connection/getall")
        .then(res => res.json())
        .then(data => {
            names = data;
        });

    function updateAutocomplete(inputElement, autocompleteId) {
        const inputValue = inputElement.value.toLowerCase();
        const matchingNames = names
            .filter(name => name.toLowerCase().includes(inputValue))
            .slice(0, 5); // Get the first 5 names

        const autocompleteElement = document.getElementById(autocompleteId);
        autocompleteElement.innerHTML = "";

        matchingNames.forEach(name => {
            const listItem = document.createElement("div");
            listItem.textContent = name;
            listItem.classList.add("autocomplete-item");
            listItem.addEventListener("click", function () {
                inputElement.value = name;
                autocompleteElement.innerHTML = ""; // Clear the autocomplete after selecting a name
            });
            autocompleteElement.appendChild(listItem);
        });
    }

});
