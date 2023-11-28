<?php

namespace App\Controller;

use App\Entity\TimeSheet;
use App\Repository\TimeSheetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/timesheet')]
class TimeSheetController extends AbstractController
{
    #[Route('', name: 'create_timesheet', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager): JsonResponse {
        $timeSheet = $serializer->deserialize($request->getContent(), TimeSheet::class, 'json');
        $timeSheet->setUser($this->getUser());

        $errors = $validator->validate($timeSheet);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($timeSheet);
        $entityManager->flush();

        return $this->json($timeSheet, Response::HTTP_CREATED);
    }

    #[Route('/list', name: 'list_timesheets', methods: ['GET'])]
    public function list(TimeSheetRepository $timeSheetRepository): JsonResponse {
        $timeSheets = $timeSheetRepository->findAll();
        return $this->json($timeSheets);
    }

    #[Route('/edit/{id}', name: 'update_timesheet', methods: ['PUT'])]
    public function update(Request $request, TimeSheet $timeSheet, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager): JsonResponse {
        $updatedTimeSheet = $serializer->deserialize($request->getContent(), TimeSheet::class, 'json', ['object_to_populate' => $timeSheet]);

        $errors = $validator->validate($updatedTimeSheet);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $entityManager->flush();

        return $this->json($updatedTimeSheet);
    }

    #[Route('/delete/{id}', name: 'delete_timesheet', methods: ['DELETE'])]
    public function delete(TimeSheet $timeSheet, EntityManagerInterface $entityManager): JsonResponse {
        $entityManager->remove($timeSheet);
        $entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
