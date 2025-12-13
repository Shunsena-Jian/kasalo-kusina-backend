import TagRepository from "../repositories/tagRepository.js";

class TagService {
    async listTags() {
        return await TagRepository.listTags();
    }
}

export default new TagService();