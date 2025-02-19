// import "server-only"; this shit won't work and will break migrations and pushes to the db via drizzle

import { int, text, index, singlestoreTableCreator, bigint, timestamp } from
  "drizzle-orm/singlestore-core";

// export const users = singlestoreTable("users_table", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });

export const createTable = singlestoreTableCreator((name) => `drive-tutorial_${name}`);


export const files_table = createTable("files_Table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),

  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (tempTable) => {
  return [
    index("parent_index").on(tempTable.parent),
    index("owner_id_index").on(tempTable.ownerId),
  ];
},);

export type DB_FileType = typeof files_table.$inferSelect;



export const folders_table = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (tempTable) => {
  return [
    index("parent_index").on(tempTable.parent),
    index("owner_id_index").on(tempTable.ownerId),
  ];
},);

export type DB_FolderType = typeof folders_table.$inferSelect;