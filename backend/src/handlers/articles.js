import Article from '../models/Article';

export default {
    list: async (req, res, next) => {
        try {
            const articles = await Article.findAll({ include: ['authors', 'regions'] });
            return res.json(articles);
        } catch (err) {
            next(err);
        }
    },
    get: async (req, res, next) => {
        try {
            const article = await Article.findByPk(req.params.articleId, { include: ['authors', 'regions'] });

            if (!article)
                return res.sendStatus(404);

            return res.json(article);
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const article = await Article.create(req.body);

            if (req.body.regions) {
                await article.setRegions(req.body.regions.map(({ id }) => id)); 
                await article.reload({ include: ['authors', 'regions'] });
            }

            if (req.body.authors) {
                await article.setAuthors(req.body.authors.map(({ id }) => id));
                await article.reload({ include: ['authors', 'regions'] });
            }

            return res.json(article);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            await Article.update(req.body, { where: { id: req.params.articleId } });
            const article = await Article.findByPk(req.params.articleId, { include: ['authors', 'regions'] });

            if (req.body.regions) {
                await article.setRegions(req.body.regions.map(({ id }) => id));
                await article.reload({ include: ['authors', 'regions'] });
            }

            if (req.body.authors) {
                await article.setAuthors(req.body.authors.map(({ id }) => id));
                await article.reload({ include: ['authors', 'regions'] });
            }

            if (req.body.authors) {
                await article.setAuthors(req.body.authors.map(({ id }) => id));
                await article.reload({ include: ['author', 'regions'] });
            }

            return res.json(article);
        } catch (err) {
            next(err);
        }
    }
};
