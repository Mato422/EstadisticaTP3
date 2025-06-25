async function cargarDatosEstudiantes()
{
    const response = await fetch("https://apidemo.geoeducacion.com.ar/api/testing/estudiantes/1");
    const datos = await response.json()
    const niveles = {};
    
    datos.data.forEach(estudiante => {
        const nivel = estudiante.nivel;
        niveles[nivel] = (niveles[nivel] || 0) + 1
    });
    
    const ctx = document.getElementById("chartAlumnado").getContext("2d");
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(niveles),
            datasets: [{
                    label: 'Alumnado por nivel',
                    data: Object.values(niveles),
                    backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']
            }]
        }
        
    });
       
}

cargarDatosEstudiantes();



async function cargarAsistenciaGeneral(){
    const response = await fetch("https://apidemo.geoeducacion.com.ar/api/testing/asistencia/1");
    const datos = await response.json();
    
    let totalPresentes = 0;
    let totalAusentes = 0;
    
    datos.data.forEach(registro => {totalPresentes += registro.presentes; totalAusentes += registro.ausentes;});
    
    const ctx = document.getElementById("chartAsistenciaGeneral").getContext("2d");
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Presentes', 'Ausentes'],
            datasets: [{
                    data: [totalPresentes, totalAusentes],
                    backgroundColor: ['#4CAF50', '#F44336']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Asistencia General'
                }
            }
        }
    });
}

cargarAsistenciaGeneral();




async function cargarAsistenciaPorCurso() {
  const response = await fetch("https://apidemo.geoeducacion.com.ar/api/testing/asistencia/1");
  const datos = await response.json();

  const cursos = datos.data.map(reg => reg.curso);
  const presentes = datos.data.map(reg => reg.presentes);
  const ausentes = datos.data.map(reg => reg.ausentes);

  const ctx = document.getElementById("chartAsistenciaCursos").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cursos,
      datasets: [
        {
          label: 'Presentes',
          data: presentes,
          backgroundColor: '#4CAF50'
        },
        {
          label: 'Ausentes',
          data: ausentes,
          backgroundColor: '#F44336'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Asistencia por Curso'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

cargarAsistenciaPorCurso();



async function cargarAsistenciaMensual() {
  const response = await fetch("https://apidemo.geoeducacion.com.ar/api/testing/historial_asistencia/1");
  const datos = await response.json();

  const meses = datos.data.map(reg => reg.mes);
  const asistencia = datos.data.map(reg => (reg.asistencia * 100).toFixed(2)); // Convertimos a porcentaje

  const ctx = document.getElementById("chartAsistenciaMensual").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: meses,
      datasets: [{
        label: 'Porcentaje de asistencia (%)',
        data: asistencia,
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33,150,243,0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Asistencia Mensual'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: value => value + '%'
          }
        }
      }
    }
  });
}

cargarAsistenciaMensual();


async function cargarCalificacionesTotal() {
  const response = await fetch("https://apidemo.geoeducacion.com.ar/api/testing/calificaciones/1");
  const datos = await response.json();

  let totalAprobados = 0;
  let totalDesaprobados = 0;
  let cantidadCursos = datos.data.length;

  datos.data.forEach(reg => {
    totalAprobados += reg.aprobados;
    totalDesaprobados += reg.desaprobados;
  });

  const promedioAprobados = (totalAprobados / cantidadCursos * 100).toFixed(2);
  const promedioDesaprobados = (totalDesaprobados / cantidadCursos * 100).toFixed(2);

  const ctx = document.getElementById("chartCalificacionesTotal").getContext("2d");
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Aprobados (%)', 'Desaprobados (%)'],
      datasets: [{
        data: [promedioAprobados, promedioDesaprobados],
        backgroundColor: ['#4CAF50', '#F44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Promedio General de Calificaciones'
        }
      }
    }
  });
}

cargarCalificacionesTotal();


async function cargarCalificacionesPorCurso() {
  const response = await fetch("https://apidemo.geoeducacion.com.ar/api/testing/calificaciones/1");
  const datos = await response.json();

  const cursos = datos.data.map(reg => reg.curso);
  const aprobados = datos.data.map(reg => (reg.aprobados * 100).toFixed(2));
  const desaprobados = datos.data.map(reg => (reg.desaprobados * 100).toFixed(2));

  const ctx = document.getElementById("chartCalificacionesCursos").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cursos,
      datasets: [
        {
          label: 'Aprobados (%)',
          data: aprobados,
          backgroundColor: '#4CAF50'
        },
        {
          label: 'Desaprobados (%)',
          data: desaprobados,
          backgroundColor: '#F44336'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Comparativa de Calificaciones por Curso'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: value => value + '%'
          }
        }
      }
    }
  });
}

cargarCalificacionesPorCurso();


async function cargarEstadoComunicados() {
  const response = await fetch("https://apidemo.geoeducacion.com.ar/api/testing/comunicados/1");
  const datos = await response.json();

  const info = datos.data[0];

  const ctx = document.getElementById("chartEstadoComunicados").getContext("2d");
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Entregados', 'Pendientes', 'Con Error'],
      datasets: [{
        data: [info.entregados, info.pendientes, info.error],
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Estado de Envío de Comunicados'
        }
      }
    }
  });
}

cargarEstadoComunicados();