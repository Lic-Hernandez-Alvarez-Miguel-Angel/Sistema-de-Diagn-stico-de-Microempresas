// Clase Node que define un nodo del árbol
class Node {
    constructor(question) {
        this.question = question;
        this.options = [];
        this.children = [];
    }

    // Método para agregar opciones y nodos hijos
    addOption(option, child) {
        this.options.push(option);
        this.children.push(child);
    }
}

// Función para crear el árbol de decisiones
function createTree() {
    const root = new Node("¿Los ingresos totales son iguales a los costos totales?");
    const puntoEquilibrio = new Node("M1: Hay un punto de equilibrio, no hay ganancias ni pérdidas.");
    const ingresosMayores = new Node("¿Los ingresos son mayores que los costos totales?");
    const ganancias = new Node("M2: Tiene un escenario de ganancias.");
    const perdidas = new Node("¿Los costos de materias primas varían en el corto plazo (3 meses)?");
    const costoNoVarian = new Node("M3: Los costos no varían en el corto plazo, revise otras estrategias.");
    const costosVarian = new Node("¿Se ha revisado los precios?");
    const revisarPreciosNegativo = new Node("M4: Alerta: Revise los precios.");
    const revisarPreciosPositivo = new Node("¿Ha revisado sus proveedores?");
    const revisarProveedoresNegativo = new Node("M5: Alerta: Haga una evaluación de proveedores.");
    const revisarProveedoresPositivo = new Node("¿Ha considerado innovación o sustitución de insumos?");
    const innovacionNegativo = new Node("M6: Alerta: Considere innovación o sustitución de insumos.");
    const innovacionPositivo = new Node("¿Los costos de publicidad se han mantenido estables en los últimos 3 meses?");
    const publicidadNoEstable = new Node("¿Se ha evaluado el uso de redes sociales para publicidad?");
    const redesSocialesNo = new Node("M8: Alerta: Use redes sociales para su publicidad.");
    const redesSocialesSi = new Node("¿Se ha realizado un análisis del uso de redes sociales?");
    const analisisRedesNegativo = new Node("M9: Realice análisis de las redes sociales y su impacto en las ventas.");
    const analisisRedesPositivo = new Node("¿Se ha considerado el análisis de sueldos y salarios?");
    const sueldosSi = new Node("M10: El sistema no incurrirá en pérdidas si hay contratos de trabajo.");
    const sueldosNo = new Node("M11: Alerta: La empresa está sujeta a la productividad sin contrato.");

    root.addOption("Sí", puntoEquilibrio);
    root.addOption("No", ingresosMayores);
    ingresosMayores.addOption("Sí", ganancias);
    ingresosMayores.addOption("No", perdidas);
    perdidas.addOption("No", costoNoVarian);
    perdidas.addOption("Sí", costosVarian);
    costosVarian.addOption("No", revisarPreciosNegativo);
    costosVarian.addOption("Sí", revisarPreciosPositivo);
    revisarPreciosPositivo.addOption("No", revisarProveedoresNegativo);
    revisarPreciosPositivo.addOption("Sí", revisarProveedoresPositivo);
    revisarProveedoresPositivo.addOption("No", innovacionNegativo);
    revisarProveedoresPositivo.addOption("Sí", innovacionPositivo);
    innovacionPositivo.addOption("No", publicidadNoEstable);
    innovacionPositivo.addOption("Sí", new Node("M7: Monitoree y ajuste las estrategias de publicidad."));
    publicidadNoEstable.addOption("No", redesSocialesNo);
    publicidadNoEstable.addOption("Sí", redesSocialesSi);
    redesSocialesSi.addOption("No", analisisRedesNegativo);
    redesSocialesSi.addOption("Sí", analisisRedesPositivo);
    analisisRedesPositivo.addOption("Sí", sueldosSi);
    analisisRedesPositivo.addOption("No", sueldosNo);

    return root;
}

// Función para recorrer el árbol de decisiones
function traverseTree(node) {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const restartButton = document.getElementById('restart');

    const askQuestion = (node) => {
        // Si el nodo no tiene hijos, mostramos la respuesta final
        if (node.children.length === 0) {
            questionElement.textContent = node.question;
            optionsElement.innerHTML = '';
            restartButton.classList.remove('hidden');
            return;
        }

        // Mostrar la pregunta actual
        questionElement.textContent = node.question;
        optionsElement.innerHTML = '';

        // Mostrar las opciones
        node.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option btn btn-success';
            button.textContent = option;
            button.onclick = () => askQuestion(node.children[index]);
            optionsElement.appendChild(button);
        });
    };

    askQuestion(node);

    // Función para reiniciar
    restartButton.onclick = () => {
        restartButton.classList.add('hidden');
        askQuestion(createTree());
    };
}

// Función para manejar el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación simple (puedes cambiar esta parte)
    if (username === "admin" && password === "1234") {
        document.getElementById('loginCard').classList.add('hidden');
        document.getElementById('decisionTreeCard').classList.remove('hidden');
        const decisionTree = createTree();
        traverseTree(decisionTree);
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
});

// Ejecución principal
window.onload = () => {
    document.getElementById('restart').classList.add('hidden');
};
