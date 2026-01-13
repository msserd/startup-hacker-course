<template>
  <div class="app">
    <h1 class="header py-2">
      Рейтинг книг
    </h1>
    <div class="books p-3">
      <div class="card col p-3 rounded shadow-lg" v-for="book in books" :key="book.id">
        <img :src="getImageUrl(book.img)" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
          <p class="card-text">{{ book.descr }}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ book.genre }}</li>
          <li class="list-group-item" v-if="book.adult">18+</li>
          <li class="list-group-item" v-if="book.rating"><FontAwesomeIcon icon="star" style="color:#fcb103;" v-for="n in book.rating" /></li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script setup>
  import { ref } from 'vue'

  function getImageUrl(name) {
    return `../public/images/${name}`;
  }

  const books = ref([{id: 1, title: 'Ревизор: возвращение в СССР 51', descr: 'Приключения московского аудитора, попавшего из нашего времени в СССР, продолжаются. Павла ставят перед нелегким выбором, но он предпочитает остаться верен своим принципам. Даже если в результате и будут определенные последствия.', genre: 'Приключенческая фантастика', img: 'book1.jpg', adult: false, rating: 4}, 
    {id: 2, title: 'Пандора', descr: 'Главная героиня Дарси ведет идеальную жизнь, которая внезапно рушится, когда ее похищает сын влиятельного преступника. С этого момента ее жизнь наполняется опасностями, интригами и неожиданными поворотами.', genre: 'Остросюжетный любовный роман', img: 'book2.jpg', adult: true, rating: 5}, 
    {id: 3, title: 'Последний день года', descr: 'Накануне Нового года несколько старых друзей и один случайный человек собираются в загородном доме, чтобы как следует повеселиться и отвлечься от шума мегаполиса. Однако всего через несколько часов обильный снегопад превращает дом, стоящий в глуши, в ловушку, а гости новогодней вечеринки один за другим становятся жертвами неизвестного психопата.', genre: 'Триллер', img: 'book3.jpg', adult: false, rating: 5}, 
    {id: 4, title: 'Психология влияния. 7-е расширенное издание', descr: 'Вы когда-нибудь задумывались, почему говорите «да», даже когда внутренний голос шепчет «нет»? Почему так сложно отказать навязчивому продавцу или коллеге, манипулирующей вашим временем? Мир влияния и манипуляций – это не магия, а наука, и Роберт Чалдини, авторитетный психолог с многолетним опытом, раскрывает ее главные секреты. ', genre: 'Психология', img: 'book4.jpg', adult: false, rating: 4}, 
    {id: 5, title: 'Квентин Дорвард', descr: 'Действие романа происходит в средневековой Франции, на фоне войн, сложных придворных интриг и взаимной вражды двух великих государей, беспринципного и осторожного французского короля Людовика XI и его антипода, безрассудного и воинственного герцога Бургундского – Карла Смелого.', genre: 'Исторические приключения', img: 'book5.jpg', adult: false, rating: 5}, 
  ])
</script>

<style>
  .app{
    max-width: 1500px;
    margin: 0 auto;
  }

  #app{
    min-height: 100vh;
    background-image: url('../public/images/bg.jpg');
  }

  .header{
    text-align: center;
    color: white;
  }

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
</style>