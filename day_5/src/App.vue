<template>
  <div class="app">
    <h1 class="header py-2">
      Рейтинг книг
    </h1>
    <div class="justify-content-center d-flex">
      <button type="button" class="btn btn-primary me-2" @click="bookModal(0)">Добавить книгу</button>
      <button type="button" class="btn btn-danger" @click="clearRating">Сбросить рейтинг книг</button>
    </div>
    <div class="text-white justify-content-center d-flex mt-2">
      <div class="card mx-auto text-dark p-2">
        <span>Всего книг: {{ booksCount }} шт.</span>
        <span>Средний рейтинг: {{ avgRating }}</span>
      </div>
    </div>
    <div class="books p-3">
      <BookCard v-for="book in books" :key="book.id" :book="book" @edit="bookModal" @delete="deleteBook" @rating="setRating"/>
    </div>

  </div>
  <Transition name="modal">
    <Dialog ref="modalElement" @close="closeModal" :title="modalTitle">
      <template #title v-if="bookData.id">
        <span class="text-danger">Изменение</span>
      </template>
      <template #default>
        <BookForm ref="inputRef" :modelValue="bookData" :errorTitle="errorTitle" @update="bookActions" @close="closeModal"/>
      </template>
    </Dialog>
  </Transition>
</template>
<script setup>
  import { ref, computed, watch, nextTick } from 'vue'
  import BookCard from './BookCard.vue';
  import BookForm from './BookForm.vue';
  import Dialog from './Dialog.vue';

  let books = ref([{id: 1, title: 'Ревизор: возвращение в СССР 51', descr: 'Приключения московского аудитора, попавшего из нашего времени в СССР, продолжаются. Павла ставят перед нелегким выбором, но он предпочитает остаться верен своим принципам. Даже если в результате и будут определенные последствия.', genre: 'Приключенческая фантастика', img: 'book1.jpg', adult: false, rating: 0}, 
    {id: 2, title: 'Пандора', descr: 'Главная героиня Дарси ведет идеальную жизнь, которая внезапно рушится, когда ее похищает сын влиятельного преступника. С этого момента ее жизнь наполняется опасностями, интригами и неожиданными поворотами.', genre: 'Остросюжетный любовный роман', img: 'book2.jpg', adult: true, rating: 5}, 
    {id: 3, title: 'Последний день года', descr: 'Накануне Нового года несколько старых друзей и один случайный человек собираются в загородном доме, чтобы как следует повеселиться и отвлечься от шума мегаполиса. Однако всего через несколько часов обильный снегопад превращает дом, стоящий в глуши, в ловушку, а гости новогодней вечеринки один за другим становятся жертвами неизвестного психопата.', genre: 'Триллер', img: 'book3.jpg', adult: false, rating: 3}, 
    {id: 4, title: 'Психология влияния. 7-е расширенное издание', descr: 'Вы когда-нибудь задумывались, почему говорите «да», даже когда внутренний голос шепчет «нет»? Почему так сложно отказать навязчивому продавцу или коллеге, манипулирующей вашим временем? Мир влияния и манипуляций – это не магия, а наука, и Роберт Чалдини, авторитетный психолог с многолетним опытом, раскрывает ее главные секреты. ', genre: 'Психология', img: 'book4.jpg', adult: false, rating: 4}, 
    {id: 5, title: 'Квентин Дорвард', descr: 'Действие романа происходит в средневековой Франции, на фоне войн, сложных придворных интриг и взаимной вражды двух великих государей, беспринципного и осторожного французского короля Людовика XI и его антипода, безрассудного и воинственного герцога Бургундского – Карла Смелого.', genre: 'Исторические приключения', img: 'book5.jpg', adult: false, rating: 5}, 
  ])

  const inputRef = ref(null);
  const isModalOpen = ref(false);

  const modalElement = ref(null);
  const bookData = ref({id: 0, title: '', descr: '', genre: [], img: '', adult: false, rating: 0});
  const modalTitle = ref('Добавление');
  const errorTitle = ref(false);

  function setRating(book_id, rating){
    books.value.find(book => book.id === book_id).rating = rating;
  }

  watch(isModalOpen, (isOpen) => {
    if (isOpen) {
      if (inputRef.value)
        inputRef.value.focusInput();
    }
  })

  function clearBookData(){
    bookData.value.id = 0;
    bookData.value.title = '';
    bookData.value.descr = '';
    bookData.value.genre = [];
    bookData.value.img = '';
    bookData.value.adult = false;
    bookData.value.rating = 0;

    //modalTitle.value = 'Добавление';
    errorTitle.value = false;
  }

  function closeModal(){
    isModalOpen.value = false;
    modalElement.value.hide();
    clearBookData();
  }

  function bookModal(book_id){

    if (book_id){
      //modalTitle.value = 'Изменение';

      const current_book = books.value.find(book => book.id === book_id);
      bookData.value.id = current_book.id;
      bookData.value.title = current_book.title;
      bookData.value.descr = current_book.descr;
      bookData.value.genre = current_book.genre.split(', ');
      bookData.value.img = current_book.img;
      bookData.value.adult = current_book.adult;
      bookData.value.rating = current_book.rating;
    }
    isModalOpen.value = true;
    modalElement.value.show();
    
  }

  function bookActions(){
    if (bookData.value.title == ''){
      errorTitle.value = true;
      return;
    }
    if (bookData.value.id){
      const index = books.value.findIndex(book => book.id === bookData.value.id)
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

  const rated = computed((book_id) => {
    const book = books.value.find(book => book.id === book_id);
    return book.rating >=1 ? true : false;
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

  .modal-enter-active {
    transition: transform 1.5s ease, opacity 1.4s ease-out !important;
  }

  .modal-leave-active {
    transition: transform 1.8s ease, opacity 1.3s ease !important;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: translateY(100vh) !important;
  }

  .modal.fade .modal-dialog {
      transform: translateY(100vh);
  }

  .modal.show .modal-dialog {
      transform: none;
  }

  .modal{
    overflow-y: hidden;
  }
</style>