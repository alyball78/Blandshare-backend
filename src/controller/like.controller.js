import * as likeServices from "../services/like.service.js";

export const toggleLike = async (req, res) => {
    const result = await likeServices.toggleLike(req.user.id, req.params.articleId);
    res.json(result);

};
