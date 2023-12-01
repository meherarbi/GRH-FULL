<?php

namespace App\Repository;

use App\Entity\TimeSheet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @method TimeSheet|null find($id, $lockMode = null, $lockVersion = null)
 * @method TimeSheet|null findOneBy(array $criteria, array $orderBy = null)
 * @method TimeSheet[]    findAll()
 * @method TimeSheet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TimeSheetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TimeSheet::class);
    }

    // Ajoutez ici des méthodes personnalisées si nécessaire

    // Par exemple, une méthode pour trouver des feuilles de temps par certains critères

    public function findAllDesc()
    {
        return $this->findBy([], ['id' => 'DESC']);
    }
    public function getPaginatedTimeSheets(int $page, int $limit): Paginator
    {
        $query = $this->createQueryBuilder('t')
                      ->orderBy('t.id', 'DESC') // ou un autre champ selon votre logique métier
                      ->getQuery()
                      ->setFirstResult(($page - 1) * $limit) // Définir l'offset
                      ->setMaxResults($limit); // Définir la limite

        return new Paginator($query);
    }

    public function deleteTimeSheetsWithNullProduct()
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'DELETE FROM App\Entity\TimeSheet t WHERE t.product IS NULL'
        );

        return $query->execute();
    }
    public function findByUserAndDate($userId, $startDate, $endDate)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.user = :user')
            ->andWhere('t.date >= :start')
            ->andWhere('t.date <= :end')
            ->setParameter('user', $userId)
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->getQuery()
            ->getResult();
    }
}
