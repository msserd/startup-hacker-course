<template>
  <div class="app">
    <h1 class="header py-2">
      Рейтинг книг
    </h1>
    <div class="justify-content-center d-flex">
      <button type="button" class="btn btn-primary me-2" @click="bookModal(false, 0)">Добавить книгу</button>
      <button type="button" class="btn btn-danger" @click="clearRating">Сбросить рейтинг книг</button>
    </div>
    <div class="text-white justify-content-center d-flex mt-2">
      <div class="card mx-auto text-dark p-2">
        <span>Всего книг: {{ booksCount }} шт.</span>
        <span>Средний рейтинг: {{ avgRating }}</span>
      </div>
    </div>
    <div class="books p-3">

      <div class="card col pb-2 pt-3 rounded shadow-lg" v-for="book in books" :key="book.id">

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
          <li class="list-group-item"><FontAwesomeIcon icon="star" :class="[index <= book.rating ? 'text-warning' : 'text-secondary']" v-for="index in 5" @click="setRating(book.id, index)" /></li>
          <li class="list-group-item">
            <button type="button" class="btn btn-primary me-2" @click="bookModal(true, book.id)"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-danger" @click="deleteBook(book.id)"><i class="bi bi-trash"></i></button>
          </li>
        </ul>
      </div>
    </div>

  </div>
  <div class="modal fade" ref="modalElement" tabindex="-1" @click.self="closeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalEdit ? 'Изменение' : 'Добавление' }} книги</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">

          <div class="mb-3">
            <label for="title" class="form-label">Название</label>
            <input type="text" class="form-control" id="title" v-model="bookData.title">
            <div class="form-text text-danger" v-if="errorTitle">Название не должно быть пустым.</div>
          </div>
          <div class="mb-3">
            <label for="descr" class="form-label">Описание</label>
            <textarea class="form-control" id="descr" rows="3" v-model="bookData.descr"></textarea>
          </div>

          <div class="mb-3">
            <label for="img" class="form-label">Обложка</label>
            <input type="text" class="form-control" id="img" v-model="bookData.img">
          </div>
          
          <div class="mb-3">
            <label for="img" class="form-label">Жанр</label>
            <select class="form-select" multiple aria-label="multiple select example" v-model="bookData.genre">
              <option>Фантастика</option>
              <option>Драма</option>
              <option>Остросюжетный любовный роман</option>
              <option>Детектив</option>
              <option>Ужасы</option>
              <option>Триллер</option>
              <option>Приключения</option>
              <option>Приключенческая фантастика</option>
              <option>Исторические приключения</option>
              <option>Боевик</option>
              <option>Психология</option>
              <option>Учебная</option>
            </select>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="adult" v-model="bookData.adult">
            <label class="form-check-label" for="adult">
              18+
            </label>
          </div>

        </div>
        <div class="modal-footer justify-content-between">
          <button class="btn btn-primary" @click="bookActions(bookData.id)">Сохранить</button>
          <button class="btn btn-secondary" @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue'

  function getImageUrl(name) {
    return `../public/images/${name}`;
  }

  let books = ref([{id: 1, title: 'Ревизор: возвращение в СССР 51', descr: 'Приключения московского аудитора, попавшего из нашего времени в СССР, продолжаются. Павла ставят перед нелегким выбором, но он предпочитает остаться верен своим принципам. Даже если в результате и будут определенные последствия.', genre: 'Приключенческая фантастика', img: 'book1.jpg', adult: false, rating: 0}, 
    {id: 2, title: 'Пандора', descr: 'Главная героиня Дарси ведет идеальную жизнь, которая внезапно рушится, когда ее похищает сын влиятельного преступника. С этого момента ее жизнь наполняется опасностями, интригами и неожиданными поворотами.', genre: 'Остросюжетный любовный роман', img: 'book2.jpg', adult: true, rating: 5}, 
    {id: 3, title: 'Последний день года', descr: 'Накануне Нового года несколько старых друзей и один случайный человек собираются в загородном доме, чтобы как следует повеселиться и отвлечься от шума мегаполиса. Однако всего через несколько часов обильный снегопад превращает дом, стоящий в глуши, в ловушку, а гости новогодней вечеринки один за другим становятся жертвами неизвестного психопата.', genre: 'Триллер', img: 'book3.jpg', adult: false, rating: 3}, 
    {id: 4, title: 'Психология влияния. 7-е расширенное издание', descr: 'Вы когда-нибудь задумывались, почему говорите «да», даже когда внутренний голос шепчет «нет»? Почему так сложно отказать навязчивому продавцу или коллеге, манипулирующей вашим временем? Мир влияния и манипуляций – это не магия, а наука, и Роберт Чалдини, авторитетный психолог с многолетним опытом, раскрывает ее главные секреты. ', genre: 'Психология', img: 'book4.jpg', adult: false, rating: 4}, 
    {id: 5, title: 'Квентин Дорвард', descr: 'Действие романа происходит в средневековой Франции, на фоне войн, сложных придворных интриг и взаимной вражды двух великих государей, беспринципного и осторожного французского короля Людовика XI и его антипода, безрассудного и воинственного герцога Бургундского – Карла Смелого.', genre: 'Исторические приключения', img: 'book5.jpg', adult: false, rating: 5}, 
  ])

  function setRating(book_id, rating){
    books.value.find(book => book.id === book_id).rating = rating;
  }

  const modalElement = ref(null);
  let modal = null;
  const bookData = ref({id: 0, title: '', descr: '', genre: [], img: '', adult: false, rating: 0});
  let modalEdit = false;
  const errorTitle = ref(false);

  function clearBookData(){
    bookData.value.id = 0;
    bookData.value.title = '';
    bookData.value.descr = '';
    bookData.value.genre = [];
    bookData.value.img = '';
    bookData.value.adult = false;
    bookData.value.rating = 0;

    modalEdit = false;
    errorTitle.value = false;
  }

  function closeModal(){
    modal.hide();
    clearBookData();
  }

  function bookModal(flag, book_id){
    if (flag && book_id){
      modalEdit = ref(true);
      const current_book = books.value.find(book => book.id === book_id);
      bookData.value.id = current_book.id;
      bookData.value.title = current_book.title;
      bookData.value.descr = current_book.descr;
      bookData.value.genre = current_book.genre.split(', ');
      bookData.value.img = current_book.img;
      bookData.value.adult = current_book.adult;
      bookData.value.rating = current_book.rating;
    }
    modal = new bootstrap.Modal(modalElement.value);
    modal.show();
  }

  function bookActions(book_id){
    if (bookData.value.title == ''){
      errorTitle.value = true;
      return;
    }
    if (book_id){
      const index = books.value.findIndex(book => book.id === book_id)
      if (index !== -1) {
        books.value[index].id = bookData.value.id;
        books.value[index].title = bookData.value.title;
        books.value[index].descr = bookData.value.descr;
        books.value[index].genre = bookData.value.genre.join(', ');
        books.value[index].img = bookData.value.img;
        books.value[index].adult = bookData.value.adult;
        books.value[index].rating = bookData.value.rating;
      }
    }else{
      const book = {
        id: books.value.length + 1, 
        title: bookData.value.title, 
        descr: bookData.value.descr, 
        genre: bookData.value.genre.join(', '), 
        img: bookData.value.img, 
        adult: bookData.value.adult, 
        rating: bookData.value.rating,
      };
      books.value.push(book);
    }
    closeModal();
  }

  function deleteBook(book_id){
    const index = books.value.findIndex(book => book.id === book_id)
    if (index !== -1) {
      books.value.splice(index, 1);
    }
  }

  function clearRating(event){
    books.value.forEach((item) => {
      item.rating = 0;
    })
    event.target.blur();
  }
  
  const booksCount = computed(() => books.value.length);

  const avgRating = computed(() => {
    let res = (books.value.reduce((acc, book) => acc + book.rating, 0) / books.value.length).toFixed(2);
    if (res == 0.0 || res == 'NaN')
      res = 0;
    return res;
  });
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