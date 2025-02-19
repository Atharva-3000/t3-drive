import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table } from "~/server/db/schema";

export default async function SandBox() {

    // const user = await auth();
    // if (!user.userId) {
    //     throw new Error("User not found!");
    // };
    const folders = await db.select().from(folders_table).where(eq(folders_table.ownerId, "user_2tB5L8LJucgOuVN1M5s6ywymG5t"));

    console.log(folders);
    return (
        <div>
            <form action={async () => {
                "use server";
                // const user = await auth();
                // if (!user.userId) {
                //     throw new Error("User not found!");
                // };

                const rootFolder = await db.insert(folders_table).values({
                    name: "root",
                    ownerId:"user_2tB5L8LJucgOuVN1M5s6ywymG5t",
                    parent: null,
                }).$returningId();

                const insertableFolders = mockFolders.map((folder) => ({
                    name: folder.name,
                    ownerId:"user_2tB5L8LJucgOuVN1M5s6ywymG5t",
                    parent: rootFolder[0]!.id,
                }));

                await db.insert(folders_table).values(insertableFolders).execute();


                // const insertableFiles = mockFiles.map((file)=>({
                //     name: file.name,
                //     ownerId: user.userId,
                //     parent: rootFolder[0]!.id,
                //     size: file.size,
                //     url: file.url,
                // }));
                // await db.insert(files_table).values(insertableFiles);
            }}>
                <button type="submit">
                    Create File
                </button>
            </form>
        </div>
    )
}