<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class ProductController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/products', name: 'get_products')]
    public function getProducts(Request $request): JsonResponse
    {
        $page = (int)$request->query->get('page', 1);
        $limit = (int)$request->query->get('limit', 10);

        // Fetch products from database using page and limit
        $products = $this->entityManager->getRepository(Product::class)
            ->findBy([], null, $limit, ($page - 1) * $limit);

        $data = [
            'products' => $products,
            'page' => $page,
            'limit' => $limit,
        ];

        return $this->json($data);
    }

    #[Route('/products/create', name: 'create_product', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setName($data['name']);
        $product->setPrice($data['price']);

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return $this->json($product);
    }

    #[Route('/products/{id}', name: 'update_product', methods: ['PUT'])]
public function update(Request $request, Product $product): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    $product->setName($data['name'] ?? $product->getName());
    $product->setPrice($data['price'] ?? $product->getPrice());

    $this->entityManager->flush();

    return $this->json($product);
}

#[Route('/products/{id}', name: 'delete_product', methods: ['Delete'])]
public function delete(Product $product, EntityManagerInterface $entityManager): JsonResponse
{
    $entityManager->remove($product);
    $entityManager->flush();

    return new JsonResponse(null, Response::HTTP_NO_CONTENT);
}

}
