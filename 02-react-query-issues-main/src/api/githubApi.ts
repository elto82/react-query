import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer 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",
  },
});
