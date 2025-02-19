import DriveContents from "../../drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone(
    // next.js changed the way to get the params for dynamic routing
    // all this jargon is to get the folderId from the url
    props: { params: Promise<{ folderId: string }> }
) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid Folder Id</div>
    }
    const [folders, files, parents] = await Promise.all([QUERIES.getFolders(parsedFolderId), QUERIES.getFiles(parsedFolderId), QUERIES.getAllParentsForFolder(parsedFolderId)]);

    return <DriveContents files={files} folders={folders} parents={parents} currentFolderId={parsedFolderId}/>
}