import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";

export default function SandBoxPage() {

    return <div className="flex flex-col gap-4">
        Seed Function
        <form action={async () => {
            "use server";
            console.log("Seeding Mock Data");
            const folderInsert = await db.insert(folders_table).values(mockFolders.map((folder, idx) => ({
                id: idx + 1,
                name: folder.name,
                parent: idx !== 0 ? 1 : null
            }))
            );
            const fileInsert = await db.insert(files_table).values(mockFiles.map((file, idx) => ({
                id: idx + 1,
                name: file.name,
                size: 50000,
                url: file.url,
                parent: (idx % 3) + 1,
            }))
            );
            console.log("Inserted Folders", folderInsert);
            console.log("Inserted Files", fileInsert);
        }}>
            <button type="submit">Seed Mock Data</button>
        </form>
    </div>
}