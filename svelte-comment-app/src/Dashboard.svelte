<script>
    import { fetchComments } from './comments';
    import { onMount, onDestroy } from 'svelte';
    import * as echarts from 'echarts';
    import { storage } from './storage';
  
    let comments = [];
    let chart = null;
    let isLoading = true;  // Variable para manejar el estado de carga
    let error = '';  // Para almacenar el mensaje de error, si lo hay
    let commentData = [];
    let graphData = [];
  
    // Cargar los comentarios del backend
    const loadComments = async () => {
      try {
        isLoading = true;  // Establece el estado de carga a 'true'
        comments = await fetchComments();  // Traer los comentarios desde el backend
        generateChartData();  // Generar los datos del gráfico
      } catch (err) {
        error = 'No se pudieron cargar los comentarios: ' + err.message;
        console.error(error);  // Imprimir el error en la consola
      } finally {
        isLoading = false;  // Cambiar el estado de carga a 'false' después de obtener los datos
      }
    };
  
    // Calcular el promedio de calificación
    const calculateAverageRating = () => {
      const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
      return sum / comments.length;
    };
  
    // Contar la distribución de las calificaciones
    const countRatingDistribution = () => {
      const distribution = [0, 0, 0, 0, 0];  // Para 1, 2, 3, 4, 5 estrellas
      comments.forEach((comment) => {
        if (comment.rating >= 1 && comment.rating <= 5) {
          distribution[comment.rating - 1]++;
        }
      });
      return distribution;
    };
  
    // Generar los datos del gráfico
    const generateChartData = () => {
      const averageRating = calculateAverageRating();
      const distribution = countRatingDistribution();
  
      setChartOption(averageRating, distribution);
    };
  
    // Configuración del gráfico
    const setChartOption = (averageRating, distribution) => {
      const option = {
        title: {
          text: 'Promedio de Rating y Distribución de Calificaciones',
          subtext: 'Calificaciones de los usuarios',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas'],
        },
        yAxis: {
          type: 'value',
          min: 0,
        },
        series: [
          {
            name: 'Distribución de Calificaciones',
            type: 'bar',
            data: distribution,
            itemStyle: {
              color: '#4caf50',
            },
          },
          {
            name: 'Promedio de Rating',
            type: 'line',
            data: new Array(5).fill(averageRating), // Mostrar el promedio en el gráfico de barras
            lineStyle: {
              color: '#ff9800',
              width: 3,
            },
            markLine: {
              data: [
                { type: 'average', name: 'Promedio' },
              ],
            },
          },
        ],
      };
  
      if (chart) {
        chart.setOption(option);  // Establecer las opciones del gráfico
      }
    };
  
    // Inicializar el gráfico cuando el componente se monta
    onMount(() => {
      chart = echarts.init(document.getElementById('commentChart'));  // Crear una instancia del gráfico
      loadComments();  // Cargar los comentarios al montar el componente
  
      // Limpieza cuando el componente se destruye
      return () => {
        if (chart) {
          chart.dispose();  // Eliminar el gráfico
        }
      };
    });
  
    $: commentData = $storage;
</script>
  
  <style>
    /* Estilo opcional para el contenedor del gráfico */
    #commentChart {
      width: 100%;
      height: 400px;  /* Puedes ajustar la altura como desees */
    }
  </style>
  
  <div class="min-h-screen bg-light py-6 px-4 sm:px-6 lg:px-8">
    <div class="container">
      <h2 class="display-4 mb-4">Dashboard</h2>
  
      <!-- Mostrar el gráfico -->
      <div id="commentChart" class="mb-4"></div>
  
      {#if isLoading}
        <p class="text-center text-muted">Cargando comentarios...</p>
      {:else if error}
        <p class="text-center text-muted text-danger">{error}</p>
      {:else if comments.length === 0}
        <p class="text-center text-muted">No hay comentarios disponibles.</p>
      {/if}
    </div>
  </div>
  