// Clase principal
var GrupoBot = /** @class */ (function () {
    function GrupoBot() {
        this.contador = 0;
    }
    // Método para añadir botones
    GrupoBot.prototype.add = function () {
        this.contador++;
        new Boton(this.contador); // Instancia de la clase Boton sin métodos
    };
    // Método para quitar botones
    GrupoBot.prototype.rest = function () {
        $("button:last-child").remove();
        this.contador--;
    };
    return GrupoBot;
}());
// Clase para crear botones
var Boton = /** @class */ (function () {
    function Boton(contador) {
        var button = $("<button>", {
            text: "Botón " + contador,
            click: function () { return alert("Mensaje: Has pulsado el botón " + contador); }
        });
        $("body").append(button);
    }
    return Boton;
}());
// Instancia de la clase principal
var grupoBot = new GrupoBot();
// Evento para añadir botón
$("#añadirBoton").on("click", function () { return grupoBot.add(); });
// Evento para quitar botón
$("#quitarBoton").on("click", function () { return grupoBot.rest(); });
