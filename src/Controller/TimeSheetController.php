<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\TimeSheet;
use App\Repository\TimeSheetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/timesheet')]
class TimeSheetController extends AbstractController
{
    #[Route('', name: 'create_timesheet', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager): JsonResponse
    {
        // Désérialiser le contenu de la requête en objet TimeSheet
        $timeSheet = $serializer->deserialize($request->getContent(), TimeSheet::class, 'json');

        // Associer l'utilisateur actuel à la feuille de temps
        $timeSheet->setUser($this->getUser());

        // Récupérer l'ID du produit depuis le contenu de la requête
        $data = json_decode($request->getContent(), true);
        $productId = $data['product'] ?? null;
        if ($productId) {
            // Supprimer "/api/products/" de l'IRI pour obtenir l'ID
            $productId = str_replace('/api/products/', '', $productId);
            $product = $entityManager->getRepository(Product::class)->find($productId);
            if ($product) {
                $timeSheet->setProduct($product);
            }
        }

        // Valider l'objet TimeSheet
        $errors = $validator->validate($timeSheet);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        // Persister et enregistrer la feuille de temps dans la base de données
        $entityManager->persist($timeSheet);
        $entityManager->flush();

        // Sérialiser l'objet TimeSheet pour la réponse
        $jsonContent = $serializer->serialize($timeSheet, 'json', ['groups' => ['timesheet_detail']]);

        return new JsonResponse($jsonContent, Response::HTTP_CREATED, [], true);
    }

    #[Route('/list', name: 'list_timesheets', methods: ['GET'])]
    public function list(Request $request, TimeSheetRepository $repository): JsonResponse
    {
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = max(1, min(50, (int) $request->query->get('limit', 10))); // Limite entre 1 et 50

        $paginator = $repository->getPaginatedTimeSheets($page, $limit);
        $totalItems = count($paginator);
        $pagesCount = ceil($totalItems / $limit);

        $timeSheets = [];
        foreach ($paginator as $timeSheet) {
            $timeSheets[] = [
                'id' => $timeSheet->getId(),
                'date' => $timeSheet->getDate()->format('Y-m-d H:i:s'), // Formatage de la date
                'hoursWorked' => $timeSheet->getHoursWorked(),
                'tasks' => $timeSheet->getTasks(),
                'comments' => $timeSheet->getComments(),
                'status' => $timeSheet->getStatus(),
                'user' => [ // Supposons que vous voulez envoyer certaines informations sur l'utilisateur
                    'id' => $timeSheet->getUser()->getId(),
                    'email' => $timeSheet->getUser()->getEmail(),
                    // Ajoutez d'autres champs si nécessaire
                ],
                'product' => $timeSheet->getProduct() ? [
                    'id' => $timeSheet->getProduct()->getId(),
                    'name' => $timeSheet->getProduct()->getName(),
                    // Ajoutez d'autres champs du produit si nécessaire
                ] : null, // Gérer le cas où le produit n'est pas assigné
            ];
            
        }

        return $this->json([
            'data' => $timeSheets,
            'totalItems' => $totalItems,
            'pagesCount' => $pagesCount,
            'currentPage' => $page,
        ]);
    }

    #[Route('/{id}', name: 'update_timesheet', methods: ['PUT'])]
    public function update(Request $request, TimeSheet $timeSheet, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager): JsonResponse
    {
        $updatedTimeSheet = $serializer->deserialize($request->getContent(), TimeSheet::class, 'json', ['object_to_populate' => $timeSheet]);

        $errors = $validator->validate($updatedTimeSheet);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $entityManager->flush();

        return $this->json($updatedTimeSheet);
    }

    #[Route('/delete/{id}', name: 'delete_timesheet', methods: ['DELETE'])]
    public function delete(TimeSheet $timeSheet, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($timeSheet);
        $entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
