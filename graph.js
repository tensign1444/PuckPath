// Listen for window resize event
window.addEventListener('resize', function() {
    centerGraph(); // Recenter the graph on window resize
});

function graphData(data) {
    console.log("Received data:", data);

    window.cy = cytoscape({
        container: document.getElementById('container'),
        layout: {
            name: 'circle',
            cols: 3
        },
        style: fetch('cy-style.json').then(function(res){
            return res.json();
        }),
        elements: data
    }); // cy init

    cy.userZoomingEnabled(false);
    centerGraph(); // Center the graph initially

    console.log("Cytoscape initialized");
}

function centerGraph() {
    cy.center();
}


function sendData() {
    document.getElementById("puckPathForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        var player1 = document.getElementsByName("player1")[0].value;
        var player2 = document.getElementsByName("player2")[0].value;
        var apiUrl = "https://puckpathapi.azurewebsites.net/Connection/find/";
        var fullUrl = apiUrl + encodeURIComponent(player1) + "/" + encodeURIComponent(player2);

        try {
            const response = await fetch(fullUrl);
            const data = await response.json();

            console.log(data);
            graphData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    });
}
