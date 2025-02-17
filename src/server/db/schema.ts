import "server-only";

import { int, text, index, singlestoreTableCreator, bigint } from
  "drizzle-orm/singlestore-core";

// export const users = singlestoreTable("users_table", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });

export const createTable = singlestoreTableCreator((name) => `drive-tutorial_${name}`);


export const files_table = createTable("files_Table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
}, (tempTable) => {
  return [
    index("parent_index").on(tempTable.parent)
  ];
},);



export const folders_table = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
}, (tempTable) => {
  return [
    index("parent_index").on(tempTable.parent)
  ];
},);