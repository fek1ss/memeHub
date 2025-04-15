# MemHub

## main folders:

    components
      CommentSection
      MemeCard
      MemeList
      NavBar
    pages
      AuthPages
      Dashboard
      Home
      Profile
    reducers
      AuthReducer.js
    services
      authAPI.js
      memeService.js
      userService.js
    store
      store.js

## services

**memeService.js** - работает с мемами (основной контент проекта).

Примеры функций:

- getAllMemes(creator_id) — получить все мемы или получить конкретный мем по id

- createMeme(memeData) — создать новый мем;

- updateMeme(id, memeData) — изменить;

- deleteMeme(id) — удалить.

Функции используются:  
&nbsp;&nbsp; getAllMemes --> Home.jsx, Profile.jsx  
&nbsp;&nbsp; createMeme --> Profile.jsx  
&nbsp;&nbsp; deleteMeme --> Home.jsx, Profile.jsx

**authAPI.js** - имеет две функции для входа и регистрации

- loginRequest
- registerRequest

**userService.js** - операции (запросы) с юзерами
пока есть только функция получения всех пользователей
