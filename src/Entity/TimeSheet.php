<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\TimeSheetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: TimeSheetRepository::class)]
class TimeSheet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: 'float')]
    private ?float $hoursWorked = null;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $tasks = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $comments = null;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $status = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'timeSheets')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    // Getters and Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getHoursWorked(): ?float
    {
        return $this->hoursWorked;
    }

    public function setHoursWorked(float $hoursWorked): self
    {
        $this->hoursWorked = $hoursWorked;

        return $this;
    }

    public function getTasks(): ?string
    {
        return $this->tasks;
    }

    public function setTasks(string $tasks): self
    {
        $this->tasks = $tasks;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(?string $comments): self
    {
        $this->comments = $comments;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
