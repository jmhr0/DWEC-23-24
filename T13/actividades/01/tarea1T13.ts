// Interfaz para definir los métodos add() y rest()
interface Botones {
    add(): void;
    rest(): void;
}

// Clase principal
class GrupoBot implements Botones {
    private contador: number;

    constructor() {
        this.contador = 0;
    }

    // Método para añadir botones
    add(): void {
        this.contador++;
        new Boton(this.contador); // Instancia de la clase Boton sin métodos
    }

    // Método para quitar botones
    rest(): void {
            $("button:last-child").remove();
            this.contador--;
        
    }
}

// Clase boton
class Boton {
    constructor(contador: number) {
        const button = $("<button>", {
            text: "Botón " + contador,
            click: () => alert("Mensaje: Has pulsado el botón " + contador)
        });
        $("body").append(button);
    }
}

// Instancia de la clase principal
const grupoBot = new GrupoBot();

// Evento para añadir botón
$("#añadirBoton").on("click", () => grupoBot.add());

// Evento para quitar botón
$("#quitarBoton").on("click", () => grupoBot.rest());
