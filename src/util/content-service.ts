import { EntrySkeletonType, createClient } from "contentful";
import { config } from "dotenv";

/*
 * We tell TypeScript that those environment variables are always defined.
 * If you want to learn more about this madness, read:
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
    }
  }
}

config();

export default class ContentService {
  static get instance() {
    return new ContentService();
  }

  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  

  async getEntriesByType(type: string) {
    return (
      await this.client.getEntries({
        content_type: type,
      })
    ).items;
  }

//   async getEntriesBy<T>(type: string) {
//     return (
//       await this.client.getEntries({
//         content_type: type,
//       })
//     ).items;
//   }
}
