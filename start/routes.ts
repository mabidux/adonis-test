import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'ArticleController.view').as('home')
Route.get('/article/create', 'ArticleController.create')
Route.get('/article/:id', 'ArticleController.read')
Route.post('/article', 'ArticleController.post')
