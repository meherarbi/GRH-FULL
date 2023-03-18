<?php
// src/EventSubscriber/UserPasswordEncoderSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserPasswordEncoderSubscriber implements EventSubscriberInterface
{
    private $userPasswordEncoder;

    public function __construct(UserPasswordHasherInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['hashPassword', EventPriorities::PRE_WRITE],
        ];
    }

    public function hashPassword(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $user->setPassword(
            $this->userPasswordEncoder->hashPassword(
                $user,
                $user->getPassword()
            )
        );
    }
}
