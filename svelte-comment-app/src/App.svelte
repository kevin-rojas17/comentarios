<script>
  import Form from './Form.svelte';
  import Dashboard from './Dashboard.svelte';
</script>

<style>
  /* Contenedor principal */
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Estilo para el formulario */
  .form-container {
    flex: 1;
    min-width: 300px;
    max-width: 45%; /* Limita el ancho máximo */
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Estilo para el dashboard */
  .dashboard-container {
    flex: 2;
    min-width: 400px;
    max-width: 50%; /* Limita el ancho máximo */
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Títulos y otros elementos de estilo */
  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }
</style>

<main>
  <div class="form-container">
    <h2>Formulario de Comentarios</h2>
    <Form />
  </div>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <Dashboard />
  </div>
</main>
