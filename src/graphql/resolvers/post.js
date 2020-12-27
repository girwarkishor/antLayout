export default {
  Query: {
    getAllPosts: async (_, {}, { Post }) => {
      let posts = await Post.find();
      return posts;
    },
    getPostById: async (_, { id }, { Post }) => {
      let post = await Post.findById(id);
      return post;
    },
  },

  Mutation: {
    createNewPost: async (_, { newPost }, { Post }) => {
      let result = await Post.create(newPost);
      return result;
    },
    editPostByID: async (_, { updatedPost, id }, { Post }) => {
      console.log("args", updatedPost);
      let editedPost = await Post.findByIdAndUpdate(
        id,
        { ...updatedPost },
        { new: true }
      );
      return editedPost;
    },
    deletePostById: async (_, { id }, { Post }) => {
      let deletedPost = await Post.findByIdAndDelete(id);
      return {
        id: deletedPost.id,
        success: true,
        message: "Your posts is deleted",
      };
    },
  },
};
