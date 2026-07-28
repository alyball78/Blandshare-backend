import * as likeModel from "../models/like.model.js";
import * as articleModel from "../models/article.model.js";

export const toggleLike = async (userId, articleId) => {
    const article = await articleModel.findById(articleId);
    if (!article) {
        throw new AppError(404, "Article non trouvé");
    }

    const alreadyLiked = await likeModel.exists(userId, articleId);

    if (alreadyLiked) {
        await likeModel.remove(userId, articleId);
    } else {
        await likeModel.create(userId, articleId);
    }

    const totalLikes = await likeModel.countByArticle(articleId);

    return { liked: !alreadyLiked, totalLikes };
};

