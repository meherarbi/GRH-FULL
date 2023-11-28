<?php

namespace App\Repository;

use App\Entity\TimeSheet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

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
