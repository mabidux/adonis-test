import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema } from '@ioc:Adonis/Core/Validator'
import Article from 'App/Models/Article'
import CreateArticleValidator from 'App/Validators/CreateArticleValidator'

export default class ArticleController {
  public async view({ view }: HttpContextContract) {
    const articles = await Article.all()
    return view.render('welcome', { articles })
  }

  public async read({ view, params: { id }, request, response }: HttpContextContract) {
    try {
      const schema = Schema.create({
        params: Schema.object().members({
          id: Schema.number(),
        }),
      })
      await request.validate({ schema })
      const article = await Article.findBy('id', id)
      if (article) return view.render('article', { article })
      return 'Not found.'
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('create')
  }

  public async post({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateArticleValidator)
      await Article.create(request.body())
      return response.redirect().toRoute('home')
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
