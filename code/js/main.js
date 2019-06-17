window.onload = visualizations();

function visualizations() {
  fetch("/data/dataproject.json")
    .then(response => response.json())
    .then(json => {

        initializeworldmap(json, 1987);
        initializelinegraph();
        // initializepiechart();
        // initializedonutchart();
        timeslider(json);

        // initializelinegraph();
        // worldmap(json, 1987);
        // timeslider(json);

    });
}
