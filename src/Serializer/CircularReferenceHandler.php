<?php

namespace App\Serializer;

class CircularReferenceHandler
{
    public function __invoke($object)
    {
        // Retournez l'identifiant ou toute autre propriété unique de l'objet
        return $object->getId();
    }
}
