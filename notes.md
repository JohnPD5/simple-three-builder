# Notes
    Il posizionamento degli oggetti 3D di THREE.js,
    adesso viene gestito da CANNON.js quindi, in pratica
    muovo gli oggetti "fisici" di CANNON nel suo "mondo",
    poi aggiorno gli oggetti di THREE prendendo i dati da CANNON.

    1) Muovo gli oggetti CANNON
    2) Prendo i dati della posizione dell'oggetto CANNON
    3) Copio i dati presi dall'oggetto CANNON e li metto
    come dati della posizione dell'oggetto THREE