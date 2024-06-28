"use strict"



class Tarjeta {
    constructor(numero, fechaInicio, fechaFin, numeroChip, saldoAnterior, estado, montoCarga) {
        this.numero = numero;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.numeroChip = numeroChip;
        this.estado = estado;
        this.saldoAnterior = saldoAnterior;
        this.montoCarga = montoCarga;
    }
}

class Caja {
    constructor(numero) {
        this.numero = numero;
        this.tarjetas = [];
    }

    obtenerTarjetas() {
        return this.tarjetas;
    }

    obtenerTarjetasHabilitadas() {
        return this.tarjetas.filter(tarjeta => tarjeta.estado === 'habilitada');
    }

    obtenerTarjetasDeshabilitadas() {
        return this.tarjetas.filter(tarjeta => tarjeta.estado === 'deshabilitada');
    }

    obtenerTarjetasPorRangoFecha(fechaInicio, fechaFin) {
        return this.tarjetas.filter(tarjeta => {

            let tarjetaFechaInicio = new Date(tarjeta.fechaInicio);
            let tarjetaFechaFin = new Date(tarjeta.fechaFin);
   
            tarjetaFechaInicio.setHours(0, 0, 0, 0);
            tarjetaFechaFin.setHours(0, 0, 0, 0);    
            fechaInicio.setHours(0, 0, 0, 0);
            fechaFin.setHours(0, 0, 0, 0);
    
            return tarjetaFechaInicio >= fechaInicio && tarjetaFechaInicio <= fechaFin;
        });
    }
    

    obtenerMontoPromedioSaldosAnteriores() {
        let totalSaldos = this.tarjetas.reduce((acc, tarjeta) => acc + tarjeta.saldoAnterior, 0);
        return totalSaldos / this.tarjetas.length;
    }

    obtenerMontoPromedioCargas() {
        let totalCargas = this.tarjetas.reduce((acc, tarjeta) => acc + tarjeta.montoCarga, 0);
        return totalCargas / this.tarjetas.length;
    }

    obtenerMontoTotalSaldosAnteriores() {
        return this.tarjetas.reduce((acc, tarjeta) => acc + tarjeta.saldoAnterior, 0);
    }

    obtenerMontoTotalCargasHabilitadas() {
        return this.tarjetas.filter(tarjeta => tarjeta.estado === 'habilitada').reduce((acc, tarjeta) => acc + tarjeta.montoCarga, 0);
    }

    obtenerMontoTotalCargasDeshabilitadas() {
        return this.tarjetas.filter(tarjeta => tarjeta.estado === 'deshabilitada').reduce((acc, tarjeta) => acc + tarjeta.montoCarga, 0);
    }
}

let cajas = [
    new Caja(1),
    new Caja(2),
    new Caja(3),
    new Caja(4),
    new Caja(5),
    new Caja(6),
    new Caja(7)
];

cajas[0].tarjetas.push(new Tarjeta('1234', '06-26-2024', '06-26-2026', 1, 500, 'habilitada', 1000))
cajas[0].tarjetas.push(new Tarjeta('1122','06-28-2023', '06-28-2025', 2, 2000, 'deshabilitada', 500))
cajas[1].tarjetas.push(new Tarjeta('5678', '02-02-2024', '02-02-2026' , 3, 100, 'deshabilitada', 2000))
cajas[1].tarjetas.push(new Tarjeta('3344', '10-05-2022', '10-05-2025', 4, 1000, 'habilitada', 100))
cajas[2].tarjetas.push(new Tarjeta('2468', '03-03-2023', '03-03-2025', 5, 200, 'habilitada', 300))
cajas[2].tarjetas.push(new Tarjeta('5566', '12-12-2022', '12-12-2024', 6, 2500, 'deshabilitada', 500))
cajas[3].tarjetas.push(new Tarjeta('2211','01-01-2024', '01-01-2026', 7, 10000, 'habilitada', 2500))
cajas[3].tarjetas.push(new Tarjeta('4321','12-25-2022', '12-25-2024', 8, 2000000, 'deshabilitada', 1000))
cajas[4].tarjetas.push(new Tarjeta('4433', '11-11-2023', '11-11-2025', 9, 3000, 'habilitada', 600))
cajas[4].tarjetas.push(new Tarjeta('8765', '10-10-2022', '10-10-2024', 10, 5000, 'deshabilitada', 7000))
cajas[5].tarjetas.push(new Tarjeta('6655', '04-04-2024', '04-04-2026', 11, 35000, 'habilitada', 300))
cajas[5].tarjetas.push(new Tarjeta('8642', '05-05-2023', '05-05-2025', 12, 25, 'deshabilitada', 500))
cajas[6].tarjetas.push(new Tarjeta('1357', '02-02-2024', '02-02-2026', 13, 5, 'habilitada', 250))
cajas[6].tarjetas.push(new Tarjeta('7788', '09-09-2023', '09-09-2025', 14, 700, 'deshabilitada', 1000))

function recargarTarjeta() {
    let numero = document.getElementById("numeroTarjetaRecargar").value;
    let monto = parseFloat(document.getElementById("montoCarga").value);
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let tarjeta = caja.tarjetas.find(tarjeta => tarjeta.numero === numero);
        if (tarjeta) {
            tarjeta.montoCarga += monto;
            alert(`Monto cargado a la tarjeta ${numero} en caja ${cajaNumero}`);
            limpiarCamposRecarga();
        } else {
            alert("Tarjeta no encontrada en esta caja");
            limpiarCamposRecarga();
        }
    } else {
        alert("Caja no encontrada");
        limpiarCamposRecarga();
    }
}

function limpiarCamposRecarga() {
    document.getElementById("numeroTarjetaRecargar").value = "";
    document.getElementById("montoCarga").value = "";
}

function limpiarCampoNumeroTarjeta() {
    document.getElementById("numeroTarjetaHabilitar").value = "";
}


function habilitar() {
    let numero = document.getElementById("numeroTarjetaHabilitar").value;
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let tarjeta = caja.tarjetas.find(tarjeta => tarjeta.numero === numero);
        if (tarjeta) {
            tarjeta.estado = 'habilitada';
            alert(`Tarjeta ${numero} habilitada`);
            document.getElementById("numeroTarjetaHabilitar").value = "";
            return;
        } else {
            alert("Tarjeta no encontrada en esta caja");
        }
    } else {
        alert("Caja no encontrada");
    }
    document.getElementById("numeroTarjetaHabilitar").value = "";
}

function deshabilitar() {
    let numero = document.getElementById("numeroTarjetaHabilitar").value;
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let tarjeta = caja.tarjetas.find(tarjeta => tarjeta.numero === numero);
        if (tarjeta) {
            tarjeta.estado = 'deshabilitada';
            alert(`Tarjeta ${numero} deshabilitada`);
            document.getElementById("numeroTarjetaHabilitar").value = "";
            return;
        } else {
            alert("Tarjeta no encontrada en esta caja");
        }
    } else {
        alert("Caja no encontrada");
    }
    document.getElementById("numeroTarjetaHabilitar").value = "";
}

function consultarTarjetasHabilitadas() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let tarjetasHabilitadas = caja.obtenerTarjetasHabilitadas();
        if (tarjetasHabilitadas.length > 0) {
            let numerosTarjetas = tarjetasHabilitadas.map(tarjeta => tarjeta.numero).join(', ');
            alert(`Tarjetas habilitadas en caja ${cajaNumero}: ${numerosTarjetas}`);
        } else {
            alert(`No hay tarjetas habilitadas en caja ${cajaNumero}`);
        }
    } else {
        alert("Caja no encontrada");
    }
}

function consultarTarjetasDeshabilitadas() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let tarjetasDeshabilitadas = caja.obtenerTarjetasDeshabilitadas();
        if (tarjetasDeshabilitadas.length > 0) {
            let numerosTarjetas = tarjetasDeshabilitadas.map(tarjeta => tarjeta.numero).join(', ');
            alert(`Tarjetas deshabilitadas en caja ${cajaNumero}: ${numerosTarjetas}`);
        } else {
            alert(`No hay tarjetas deshabilitadas en caja ${cajaNumero}`);
        }
    } else {
        alert("Caja no encontrada");
    }
}



function limpiarCamposConsultaFecha() {
    document.getElementById("fechaInicioConsulta").value = "";
    document.getElementById("fechaFinConsulta").value = "";
}

function consultarTarjetasHabilitadasPorFecha() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);
    let fechaInicio = new Date(document.getElementById("fechaInicioConsulta").value);
    let fechaFin = new Date(document.getElementById("fechaFinConsulta").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let tarjetasPorFecha = caja.obtenerTarjetasPorRangoFecha(fechaInicio, fechaFin);
        let tarjetasHabilitadas = tarjetasPorFecha.filter(tarjeta => tarjeta.estado === 'habilitada');
        alert(`Número de tarjetas habilitadas en caja ${cajaNumero} para el rango de fechas seleccionado: ${tarjetasHabilitadas.length}`);
        limpiarCamposConsultaFecha();
    } else {
        alert("Caja no encontrada");
        limpiarCamposConsultaFecha();
    }
}

function consultarMontoPromedioSaldosAnteriores() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let promedioSaldosAnteriores = caja.obtenerMontoPromedioSaldosAnteriores();
        alert(`Monto promedio de saldos anteriores en caja ${cajaNumero}: ${promedioSaldosAnteriores.toFixed(2)}`);
    } else {
        alert("Caja no encontrada");
    }
}

function consultarMontoTotalSaldosAnteriores() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let totalSaldosAnteriores = caja.obtenerMontoTotalSaldosAnteriores();
        alert(`Monto total de saldos anteriores en caja ${cajaNumero}: ${totalSaldosAnteriores.toFixed(2)}`);
    } else {
        alert("Caja no encontrada");
    }
}

function consultarMontoPromedioCargas() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let promedioCargas = caja.obtenerMontoPromedioCargas();
        alert(`Monto promedio de cargas en caja ${cajaNumero}: ${promedioCargas.toFixed(2)}`);
    } else {
        alert("Caja no encontrada");
    }
}

function consultarMontoTotalCargasHabilitadas() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let totalCargasHabilitadas = caja.obtenerMontoTotalCargasHabilitadas();
        alert(`Monto total de cargas de tarjetas habilitadas en caja ${cajaNumero}: ${totalCargasHabilitadas.toFixed(2)}`);
    } else {
        alert("Caja no encontrada");
    }
}

function consultarMontoTotalCargasDeshabilitadas() {
    let cajaNumero = parseInt(document.getElementById("cajaSelect").value);

    let caja = cajas.find(caja => caja.numero === cajaNumero);
    if (caja) {
        let totalCargasDeshabilitadas = caja.obtenerMontoTotalCargasDeshabilitadas();
        alert(`Monto total de cargas de tarjetas deshabilitadas en caja ${cajaNumero}: ${totalCargasDeshabilitadas.toFixed(2)}`);
    } else {
        alert("Caja no encontrada");
    }
}
