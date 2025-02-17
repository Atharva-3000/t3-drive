import { db } from "~/server/db"
import { files_table as filesSchema, folders_table as foldersSchema } from "~/server/db/schema"
import { eq } from "drizzle-orm";


export async function getAllParentsForFolder(folderId: number) {
    const parents = [];
    let currentFolderId: number | null = folderId;
    while (currentFolderId !== null) {
        const folder = await db.selectDistinct().from(foldersSchema).where(eq(foldersSchema.id, currentFolderId));

        if (!folder[0]) {
            throw new Error("Parent folder not found");
        }
        parents.unshift(folder[0]);
        currentFolderId = folder[0]?.parent;
    }
    return parents;
}


export function getFolders(folderId: number) {
    return db.select().from(foldersSchema).where(eq(foldersSchema.parent, folderId));
}

export function getFiles(folderId: number) {
    return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId));
}