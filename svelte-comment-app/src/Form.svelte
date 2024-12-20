<script>
    import { createComment } from './comments';
    import { fade } from 'svelte/transition';
    import { storage } from './storage';

    let content = '';
    let author = '';
    let rating = '';
    let errors = {};
    let submitStatus = '';

    const validateForm = () => {
        errors = {};

        if (!content.trim()) {
            errors.content = 'El comentario no puede estar vacío';
        }

        if (!author.trim()) {
            errors.author = 'El nombre del autor es requerido';
        }

        if (!rating || rating < 1 || rating > 5) {
            errors.rating = 'Por favor, selecciona una calificación entre 1 y 5';
        }

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        submitStatus = '';
        errors = {};

        if (!validateForm()) {
            return;
        }

        try {
            await createComment({ 
                content: content.trim(), 
                author: author.trim(), 
                rating: parseInt(rating) 
            });
            storage.update((prevComments) => [
                ...prevComments,
                { content: content.trim(), author: author.trim(), rating: parseInt(rating) },
            ]);
            submitStatus = 'success';
            content = '';
            author = '';
            rating = '';
        } catch (err) {
            submitStatus = 'error';
            errors.submit = 'No se pudo agregar el comentario. ' + err.message;
        }
    };
</script>

<style lang="postcss">
    .rating-stars {
        display: flex;
        gap: 0.5rem;
        flex-direction: row-reverse; /* Esto invierte el orden de las estrellas */
    }

    .rating-stars input[type="radio"] {
        display: none;
    }

    .rating-stars label {
        cursor: pointer;
        font-size: 1.5rem;
        color: #ddd;
        transition: color 0.2s;
    }

    /* Estilos para cuando se pasa el mouse por las estrellas */
    .rating-stars input[type="radio"]:checked ~ label,
    .rating-stars label:hover,
    .rating-stars label:hover ~ label {
        color: #ffc107;
    }

    /* Asegurar que la estrella no se ilumine hasta que se pase el mouse */
    .rating-stars input[type="radio"]:checked ~ label,
    .rating-stars label:hover,
    .rating-stars label:hover ~ label {
        color: #ffc107;
    }

    /* Estilos adicionales */
    /* Estilos para el formulario */
    .container {
        max-width: 1200px;
        padding: 20px;
    }

    .card {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .card-header {
        background-color: #007bff;
        color: white;
    }

    .form-label {
        font-weight: bold;
    }

    .form-control {
        border-radius: 0.25rem;
    }

    .invalid-feedback {
        font-size: 0.875rem;
    }

    /* Botón */
    .btn-lg {
        font-size: 1.1rem;
        padding: 10px 20px;
    }
</style>



<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">Agregar Comentario</h4>
                </div>
                <div class="card-body">
                    <form on:submit|preventDefault={handleSubmit} novalidate>
                        <div class="mb-3">
                            <label for="author" class="form-label">Nombre del Autor</label>
                            <input 
                                id="author" 
                                type="text" 
                                class="form-control {errors.author ? 'is-invalid' : ''}"
                                bind:value={author}
                                placeholder="Tu nombre"
                                required
                            >
                            {#if errors.author}
                                <div 
                                    class="invalid-feedback" 
                                    transition:fade
                                >
                                    {errors.author}
                                </div>
                            {/if}
                        </div>

                        <div class="mb-3">
                            <label for="content" class="form-label">Comentario</label>
                            <textarea 
                                id="content" 
                                class="form-control {errors.content ? 'is-invalid' : ''}"
                                bind:value={content}
                                rows="4"
                                placeholder="Escribe tu comentario aquí"
                                required
                            ></textarea>
                            {#if errors.content}
                                <div 
                                    class="invalid-feedback" 
                                    transition:fade
                                >
                                    {errors.content}
                                </div>
                            {/if}
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Calificación</label>
                            <div class="rating-stars">
                                {#each [5, 4, 3, 2, 1] as star}
                                    <input 
                                        type="radio" 
                                        id="rating-{star}" 
                                        name="rating" 
                                        value={star}
                                        bind:group={rating}
                                    >
                                    <label for="rating-{star}">
                                        ★
                                    </label>
                                {/each}
                            </div>
                            {#if errors.rating}
                                <div 
                                    class="text-danger small mt-1" 
                                    transition:fade
                                >
                                    {errors.rating}
                                </div>
                            {/if}
                        </div>

                        {#if submitStatus === 'success'}
                            <div 
                                class="alert alert-success" 
                                transition:fade
                            >
                                Comentario agregado exitosamente
                            </div>
                        {:else if submitStatus === 'error'}
                            <div 
                                class="alert alert-danger" 
                                transition:fade
                            >
                                {errors.submit}
                            </div>
                        {/if}

                        <div class="d-grid">
                            <button 
                                type="submit" 
                                class="btn btn-primary btn-lg"
                            >
                                Enviar Comentario
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
