//Declaración de variables
let nombreUsuario = "gonzaloIriart";
let saldoCuenta = 500;
let limiteExtraccion = 2000;
let limiteDescubierto = -limiteExtraccion/5;
var precioAgua= 350;
var precioLuz= 425;
var precioInternet = 210;
var precioTelefono = 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var codigoSeguridad = 1234;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion(nuevoLimite) {    
    var nuevoLimite = parseFloat(prompt('Ingrese el nuevo limite(cambiara tambien el limite de Descubierto)'));
        if(saldoCuenta> -nuevoLimite/5){
            limiteExtraccion = nuevoLimite;
            limiteDescubierto = -nuevoLimite/5;
            alert("Sus nuevos limites son:\nLimite de Extraccion: $ " + limiteExtraccion + "\nLimite de Descubierto: $ " + limiteDescubierto)
            actualizarLimiteEnPantalla()        
        }else{
            alert("El nuevo limite de Descubierto (20% limite Extraccion ingresado) no puede ser inferior a su saldo")
        }

}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var dineroExtraccion = parseFloat(prompt('Ingrese dinero a extraer'));
    if(haySaldoDisponible(dineroExtraccion)){
        if(extraccionNoSuperaAlLimite(dineroExtraccion)){
            if(sonBilletesDeCien(dineroExtraccion)){  
                saldoCuenta-=dineroExtraccion;  
                actualizarSaldoEnPantalla();
                alert("Ha extraido: $" + dineroExtraccion + "\nSu saldo anterior era de: $" + saldoAnterior + "\nSu saldo actual es de: $" + saldoCuenta);
            }else{
                alert('Ingrese solamente multiplos de 100');  
            }
        }else{
            alert('No pudo realizarse la operacion, excede el limite de extraccion');
        }

    }else{
        alert('No pudo realizarse la operacion, excede el limite de descubierto');
                 
    }


}

function depositarDinero() {
    var dineroDepositado = parseFloat(prompt('Ingrese dinero a depositar'));
    var saldoAnterior = saldoCuenta;
    saldoCuenta += dineroDepositado;
    actualizarSaldoEnPantalla();
    alert("Ha depositado: $" + dineroDepositado + "\nSu saldo anterior era de: $" + saldoAnterior + "\nSu saldo actual es de: $" + saldoCuenta);
}

function pagarServicio() {
    var saldoAnterior = saldoCuenta;
    var numeroServicio = parseFloat(prompt("Ingrese el numero del servicio correspondiente: \n1.- Agua \n2.- Luz \n3.- Internet \n4.- Telefono"));
switch(numeroServicio){
    case 1:
    if(haySaldoDisponible(precioAgua)){
        saldoCuenta-=precioAgua;
        alert("Se pago el servicio Agua\nSe ha descontado: $" + precioAgua + "\nSu saldo anterior era de: $" + saldoAnterior + "\nSu saldo actual es de: $" + saldoCuenta);
    
        actualizarSaldoEnPantalla();
        //alert("Se pago el servicio Agua\nSe ha descontado: $" + precioAgua + "\nSu saldo anterior era de: $" + saldoAnterior + "\nSu saldo actual es de: $" + saldoCuenta);
    
        }else{
        alert('Saldo insuficiente para el pago');  
       
    }
    
    break;
    
    case 2:
    if(haySaldoDisponible(precioLuz)){
        saldoCuenta-=precioLuz;
        actualizarSaldoEnPantalla();
        alert("Se pago el servicio Luz\nSe ha descontado: $" + precioLuz + "\nSu saldo anterior era de: $" + saldoAnterior + "\nSu saldo actual es de: $" + saldoCuenta);
    }else{
        alert('Saldo insuficiente para el pago');  
    }
    
    break;
    case 3:
    if(haySaldoDisponible(precioInternet)){
        saldoCuenta-=precioInternet;
        actualizarSaldoEnPantalla();
        alert("Se pago el servicio Internet\nSe ha descontado: $" + precioInternet + "\nSu saldo anterior era de: $" + saldoAnterior + "\nSu saldo actual es de: $" + saldoCuenta);
    }else{
        alert('Saldo insuficiente para el pago');  
    }
    
    break;
    case 4:
    if(haySaldoDisponible(precioTelefono)){
        saldoCuenta-=precioTelefono;
        actualizarSaldoEnPantalla();
        alert("Se pago el servicio Telefono\nSe ha descontado: $" + precioTelefono + "\nSu saldo anterior era de: $" + saldoAnterior + "\nSu saldo actual es de: $" + saldoCuenta);
    }else{
        alert('Saldo insuficiente para el pago');  
    }
    
    break;
    default:
    alert("Seleccione una opcion valida")
}

}

function transferirDinero() {
    var dineroATransferir = parseFloat(prompt('Ingrese el monto a transferir'));
    if(haySaldoDisponible(dineroATransferir)){
        var cuentaDestino = parseInt(prompt('Ingrese la cuenta a la que desea transferir'));
        if(cuentaDestino === cuentaAmiga1||cuentaDestino===cuentaAmiga2){
            saldoCuenta-=dineroATransferir;
            actualizarSaldoEnPantalla();
            alert('Se ha transferido satisfactoriamente $ ' + dineroATransferir + "\nA la cuenta destino: " + cuentaDestino)
        }else{
            alert("Solo se permite transferencias a cuentas amigas");
        }
    }else{
        alert("No hay saldo suficiente")
    }
}

function iniciarSesion() {
 var codigoIngresado = parseInt(prompt('Iniciar sesion \nPor favor, ingrese su codigo de seguridad'));
    if(codigoIngresado === codigoSeguridad){
        alert('Bienvenido usuario, ya puedes comenzar a operar');
        actualizarSaldoEnPantalla();
        cargarNombreEnPantalla();
        actualizarLimiteEnPantalla();
    }else{
        saldoCuenta = 0;
        alert('codigo Incorrecto, su dinero ha sido retenido por cuestiones de seguridad')
    }
}

//Funcione booleanas para comprobaciones
function haySaldoDisponible(dineroExtraccion){
    var saldoComprobar = saldoCuenta;
    return(saldoComprobar -= dineroExtraccion) >= limiteDescubierto;    
}

function extraccionNoSuperaAlLimite(dineroExtraccion){
    return(dineroExtraccion <= limiteExtraccion);
}

function sonBilletesDeCien(dineroExtraccion){
    return (dineroExtraccion%100 == 0);
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    if(saldoCuenta<0){
        document.getElementById("saldo-cuenta").style.color = '#FF0000';
    } else{
        document.getElementById("saldo-cuenta").style.color = '#FFFFFF';
    }
    document.getElementById("saldo-cuenta").innerHTML = "$ " + saldoCuenta.toFixed(2);
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $ " + limiteExtraccion;
    document.getElementById("limite-descubierto").innerHTML = "Tu límite de descubierto(20% limite extraccion) es: $ " + limiteDescubierto;
}