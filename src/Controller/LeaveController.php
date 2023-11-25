<?php

namespace App\Controller;

use App\Entity\Leave;
use App\Repository\LeaveRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class LeaveController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/leave', name:'get_leave')]
    public function getLeave(Request $request): JsonResponse {
        // Récupérer l'utilisateur connecté
        $user = $this->getUser();
    
        // Vérifier si l'utilisateur est connecté
        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }
    
        // Vérifier si l'utilisateur est un administrateur
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            // L'utilisateur est administrateur, récupérer toutes les demandes de congé
            $leaves = $this->entityManager->getRepository(Leave::class)->findAll();
        } else {
            // Utilisateur non-administrateur, récupérer seulement ses demandes de congé
            $leaves = $this->entityManager->getRepository(Leave::class)
                        ->findBy(['user' => $user]);
        }
    
        // Ajouter la pagination si nécessaire
        $page = (int) $request->query->get('page', 1);
        $limit = (int) $request->query->get('limit', 500);
        // Appliquer la pagination aux données récupérées si nécessaire
        
    
        $data = [
            'leave' => $leaves, // Utiliser la variable $leaves
            'page' => $page,
            'limit' => $limit,
        ];
    
        return $this->json($data);
    }
    
    
    #[Route('/create', name: 'create_leave')]
    public function create(Request $request, LeaveRepository $leaveRepository): JsonResponse {
        $user = $this->getUser(); // Récupérer l'utilisateur connecté
    
        // Vérifier si l'utilisateur est connecté
        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        
    
        $requestData = json_decode($request->getContent(), true);
        
        $startDate = new \DateTime($requestData['startDate']);
        $endDate = new \DateTime($requestData['endDate']);
        $type = $requestData['type'];
        $comment = $requestData['comment'];
        
        $leave = $leaveRepository->createLeave($user, $startDate, $endDate, $type, $comment);
        
        $response = new JsonResponse([
            'id' => $leave->getId(),
            'startDate' => $leave->getStartDate()->format('Y-m-d'),
            'endDate' => $leave->getEndDate()->format('Y-m-d'),
            'type' => $leave->getType(),
            'comment' => $leave->getComment(),
            'user' => [
                'id' => $user->getId(),
                'firstName' => $user->getFirstName(), 
                'lastName' => $user->getLastName(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
            ],
        ]);
        
        $response->setEncodingOptions(JSON_UNESCAPED_UNICODE);
        
        return $response;
    }
    

    #[Route('/leave/{id}', name: 'update_leave', methods: ['PUT'])]
    public function update(int $id, Request $request, LeaveRepository $leaveRepository, UserRepository $userRepository): JsonResponse
    {
        $leave = $leaveRepository->find($id);

        if (!$leave) {
            return new JsonResponse(['error' => 'Leave not found'], Response::HTTP_NOT_FOUND);
        }

        $requestData = json_decode($request->getContent(), true);

        $user = $userRepository->find($requestData['userId']);
        $startDate = new \DateTime($requestData['startDate']);
        $endDate = new \DateTime($requestData['endDate']);
        $comment = $requestData['comment'];

        $leave->setUser($user);
        $leave->setStartDate($startDate);
        $leave->setEndDate($endDate);
        $leave->setComment($comment);

        $this->entityManager->flush();

        return new JsonResponse([
            'id' => $leave->getId(),
            'startDate' => $leave->getStartDate()->format('Y-m-d'),
            'endDate' => $leave->getEndDate()->format('Y-m-d'),
            'comment' => $leave->getComment(),
            'user' => [
                'id' => $leave->getUser()->getId(),
                'email' => $leave->getUser()->getEmail(),
                'roles' => $leave->getUser()->getRoles(),
            ],
        ]);
    }

    #[Route('/leave/{id}', name: 'delete_leave', methods: ['DELETE'])]
    public function delete(int $id, LeaveRepository $leaveRepository): JsonResponse
    {
        $leave = $leaveRepository->find($id);

        if (!$leave) {
            return new JsonResponse(['error' => 'Leave not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($leave);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

}
