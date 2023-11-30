<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ]
    
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
 
    private ?int $id = null;

    #[ORM\Column(length: 255)]
   
    private ?string $name = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: TimeSheet::class)]
    
    private Collection $timeSheets;

    public function __construct()
    {
        $this->timeSheets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, TimeSheet>
     */
    public function getTimeSheets(): Collection
    {
        return $this->timeSheets;
    }

    public function addTimeSheet(TimeSheet $timeSheet): self
    {
        if (!$this->timeSheets->contains($timeSheet)) {
            $this->timeSheets->add($timeSheet);
            $timeSheet->setProduct($this);
        }

        return $this;
    }

    public function removeTimeSheet(TimeSheet $timeSheet): self
    {
        if ($this->timeSheets->removeElement($timeSheet)) {
            // set the owning side to null (unless already changed)
            if ($timeSheet->getProduct() === $this) {
                $timeSheet->setProduct(null);
            }
        }

        return $this;
    }
}
