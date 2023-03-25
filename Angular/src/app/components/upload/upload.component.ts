import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  public uploader: FileUploader = new FileUploader({
    url: 'https://localhost:8000/api/upload',
    itemAlias: 'file'
  });

  message: string | undefined;
  fileName: string | undefined;
  fileSize = 0;
  isFileSizeValid = false;
  fileExtension: string= '' ;


  constructor(private http: HttpClient) {
    this.message = '';
  }

  getIconPath(extension: string): string {
    switch (extension) {
      case 'pdf':
        return '/assets/pdf-icon.png';
      case 'docx':
        return '/assets/word-icon.png';
      case 'jpg':
      case 'jpeg':
        return '/assets/jpg-icon.png';
      // Ajoutez d'autres types de fichiers et leurs icônes correspondantes ici
      default:
        return '/assets/file-icon.png';
    }
  }
  
  onSubmit() {
    const fileItem = this.uploader.queue[0]._file;
    if (fileItem.size > 5000000) {
      this.message = 'Le fichier est trop volumineux. La taille maximale autorisée est de 5 Mo.';
      this.isFileSizeValid = false;
    } else {
      this.isFileSizeValid = true;
    }
    
    this.isFileSizeValid = true;

    // Supprimer l'ancien fichier de la liste d'upload si elle existe
    if (this.uploader.queue.length > 0) {
      this.uploader.queue.pop();
    }

    const formData = new FormData();
    formData.append('file', fileItem, fileItem.name);

    this.http.post('https://localhost:8000/api/upload', formData).subscribe(
      (response: any) => {
        console.log(response);
        this.message = 'Le fichier a été téléchargé avec succès';
        this.fileName = response.file;
        this.fileExtension = this.fileName ? this.getFileExtension(this.fileName) : '';
      },
      (error) => {
        console.log(error);
        this.message = 'Une erreur est survenue lors du téléchargement du fichier';
      }
    );
  }

  onFileSelected(event: any) {
    this.message = undefined;
    const fileItem = event.target.files[0];
  
    // Vérifier si la queue d'upload contient déjà des fichiers
    if (this.uploader.queue.length > 0) {
      // Supprimer l'ancien fichier de la liste d'upload si elle existe
      this.uploader.queue.pop();
    }
  
    // Ajouter le nouveau fichier à la queue d'upload
    this.uploader.addToQueue([fileItem]);
    
    this.fileSize = fileItem.size;
    this.isFileSizeValid = this.fileSize <= 5000000;
  }

  
  
  
  

  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()!.toLowerCase();
  }
}
