<?php

namespace App\Controller;

use App\Entity\File;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UploadFileController extends AbstractController
{
    private $entityManager;
    private $fileUploader;

    public function __construct(EntityManagerInterface $entityManager, FileUploader $fileUploader)
    {
        $this->entityManager = $entityManager;
        $this->fileUploader = $fileUploader;
    }

    #[Route('api/upload', name:'upload_file')]
    public function upload(Request $request, SerializerInterface $serializer): Response
    {
        $file = new File();
        // handle file upload
        $uploadedFile = $request->files->get('file');
        $fileName = $this->fileUploader->upload($uploadedFile);
        $file->setName($fileName);
        $fileName = $file->getName();

        // return response
        $data = [
            'message' => 'File uploaded successfully',
            'file' => $fileName,
        ];
        $json = $serializer->serialize($data, 'json');
        $this->entityManager->persist($file);
        $this->entityManager->flush();
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

}
