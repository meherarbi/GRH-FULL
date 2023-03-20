<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController
{
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/api/login", name="api_login", methods={"POST"})
     */
    public function login(Request $request, UserPasswordHasherInterface $encoder, JWTTokenManagerInterface $jwtManager): Response
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $request->get('email')]);

        if (!$user) {
            throw new BadCredentialsException();
        }

        $isValid = $encoder->isPasswordValid($user, $request->get('password'));

        if (!$isValid) {
            throw new BadCredentialsException();
        }

        $token = $jwtManager->create($user);

        return $this->json([
            'token' => $token,
        ]);
    }
}
