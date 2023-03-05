<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class ProductController extends AbstractController
{
    #[Route('/products', name: 'get_products')]
    public function getProducts(Request $request): JsonResponse
    {
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 10);

        // Fetch products from database using page and limit

        $data = [
            'products' => [
                ['id' => 1, 'name' => 'Product 1', 'price' => 10.99],
                ['id' => 2, 'name' => 'Product 2', 'price' => 15.99],
                ['id' => 3, 'name' => 'Product 3', 'price' => 20.99],
            ],
            'page' => $page,
            'limit' => $limit,
        ];

        return $this->json($data);
    }
}
