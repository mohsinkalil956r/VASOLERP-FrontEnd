export class DocumentModel {
    
    constructor(file: File) {
        this.file =  file;
        this.uploadStatus = UPLOADSTATUS.PENDING;
    }

    serverFileName: string;
    file: File;
    uploadStatus: UPLOADSTATUS;
} 

export enum UPLOADSTATUS {
    SUCCESS,
    ERROR,
    PENDING
}