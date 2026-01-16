<template>
    <div class="card col pb-2 pt-3 rounded shadow-lg">
        <FontAwesomeIcon icon="star" class="book-star" :class="[book.rating ? 'book-star-active' : 'book-star-null'], 'book-star'"/>
        <span class="book-star-text">{{ book.rating ? book.rating : '-' }}</span>

        <img :src="getImageUrl(book.img)" class="card-img-top px-3">
        <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.descr }}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-if="book.genre">{{ book.genre }}</li>
            <li class="list-group-item" v-if="book.adult">18+</li>
            <li class="list-group-item"><FontAwesomeIcon icon="star" :class="[index <= book.rating ? 'text-warning' : 'text-secondary']" v-for="index in 5" @click="$emit('rating', book.id, index)" /></li>
            <li class="list-group-item">
                <button type="button" class="btn btn-primary me-2" @click="$emit('edit', book.id)"><i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-danger" @click="$emit('delete', book.id)"><i class="bi bi-trash"></i></button>
            </li>
        </ul>
    </div>
</template>

<script setup>
    const emit = defineEmits(['edit', 'delete', 'rating']);
    const props = defineProps(['book']);

    function getImageUrl(name) {
        return `../public/images/${name}`;
    }
</script>

<style>
  .books{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max(270px, 100%/5), 1fr));
    grid-gap: 32px 0;
    gap: 32px 0;
  }

  .books .card{
    box-sizing: border-box;
    flex-direction: column;
    width: 250px;
    display: flex;
    gap: 10px;
    padding: 0 0 12px;
    margin: 0 auto;
    border-radius: 12px;
    position: relative;
  }

  .books .card img{
    height: 300px;
  }

  .book-star{
    position: absolute;
    top: 25px;
    left: 20px;
    font-size: 35px;
  }

  .book-star-active{
    color: #ffc107 !important;
  }

  .book-star-null{
    color: #6c757d;
  }

  .book-star-text{
    position: absolute;
    top: 22px;
    left: 35px;
    font-size: 25px;
  }
</style>