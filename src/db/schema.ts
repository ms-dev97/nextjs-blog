import { relations } from 'drizzle-orm';
import { AnyMySqlColumn, bigint, boolean, int, longtext, mysqlTable, serial, text, timestamp, tinyint, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  is_admin: boolean().default(false),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});

export const categoryTable = mysqlTable('categories', {
  id: serial().primaryKey(),
  slug: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  status: boolean().default(false),
  featured: boolean().default(false),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});

export const postTable = mysqlTable('posts', {
  id: serial().primaryKey(),
  slug: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  excerpt: text(),
  content: longtext(),
  image: varchar({ length: 255 }),
  status: tinyint().default(0),
  featured: boolean().default(false),
  author_id: bigint({mode: 'number', unsigned: true}).references(() => usersTable.id),
  category_id: bigint({mode: 'number', unsigned: true}).references(() => categoryTable.id),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});

export const commentTable = mysqlTable('comments', {
  id: serial().primaryKey(),
  content: text(),
  user_id: bigint({mode: 'number', unsigned: true}).references(() => usersTable.id),
  post_id: bigint({mode: 'number', unsigned: true}).references(() => postTable.id),
  parent_id: bigint({mode: 'number', unsigned: true}).references((): AnyMySqlColumn => commentTable.id),
  status: boolean().default(false),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postTable),
  comments: many(commentTable)
}));

export const postsRelations = relations(postTable, ({one, many}) => ({
  author: one(usersTable, {
    fields: [postTable.author_id],
    references: [usersTable.id]
  }),
  comments: many(commentTable),
  categories: one(categoryTable, {
    fields: [postTable.category_id],
    references: [categoryTable.id]
  }),
}));

export const categoriesRelations = relations(categoryTable, ({ many }) => ({
  posts: many(postTable),
}));

export const commentsRelations = relations(commentTable, ({one, many}) => ({
  post: one(postTable, {
    fields: [commentTable.post_id],
    references: [postTable.id]
  }),
  author: one(usersTable, {
    fields: [commentTable.user_id],
    references: [usersTable.id]
  }),
  parent: one(commentTable, {
    fields: [commentTable.parent_id],
    references: [commentTable.id]
  }),
  replies: many(commentTable)
}));