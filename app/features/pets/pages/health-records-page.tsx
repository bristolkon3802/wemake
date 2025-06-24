import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/health-records-page";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import { PawPrint, FileText } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  breed: string;
  imageUrl: string;
}

const SAMPLE_PETS: Pet[] = [
  {
    id: "1",
    name: "사랑이",
    breed: "골든 리트리버",
    imageUrl:
      "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "나비",
    breed: "코리안 숏헤어",
    imageUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "초코",
    breed: "푸들",
    imageUrl:
      "https://images.unsplash.com/photo-1546238232-20216dec9f72?q=80&w=400&auto=format&fit=crop",
  },
];

export function loader({ request }: Route.LoaderArgs) {
  return {
    pets: SAMPLE_PETS,
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "건강 기록 조회 | 우리집 반려동물" },
    {
      name: "description",
      content: "반려동물의 건강 기록을 조회하고 관리하세요.",
    },
  ];
}

function PetSelectCard({
  pet,
  onSelect,
}: {
  pet: Pet;
  onSelect: (petId: string) => void;
}) {
  return (
    <SelectItem key={pet.id} value={pet.id}>
      <div className="flex items-center gap-3 py-1">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium">{pet.name}</span>
        <span className="text-gray-500 text-sm">({pet.breed})</span>
      </div>
    </SelectItem>
  );
}

function SelectedPetDisplay({ pet }: { pet: Pet }) {
  return (
    <div className="p-6 bg-blue-50 dark:bg-gray-700/50 rounded-lg flex items-center gap-4 transition-all duration-300 animate-in fade-in">
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-white"
      />
      <div>
        <p className="text-xl font-semibold text-gray-800 dark:text-white">
          {pet.name}
        </p>
        <p className="text-gray-600 dark:text-gray-300">{pet.breed}</p>
      </div>
    </div>
  );
}

export default function HealthRecordsPage({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const [selectedPetId, setSelectedPetId] = useState<string>("");

  const { pets } = loaderData;
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const hasSelectedPet = Boolean(selectedPet);

  function handleSelectPet(petId: string) {
    setSelectedPetId(petId);
  }

  function handleNavigateToRecords() {
    if (selectedPetId) {
      navigate(`/pets/health-records/${selectedPetId}`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-0">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-t-2xl">
            <div className="mx-auto bg-white dark:bg-gray-800 rounded-full p-4 w-fit shadow-md mb-4">
              <PawPrint className="h-12 w-12 text-blue-500" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
              건강 기록 조회
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 pt-2">
              어떤 반려동물의 건강 기록을 볼까요?
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Select onValueChange={handleSelectPet} value={selectedPetId}>
                <SelectTrigger className="w-full h-12 text-base bg-gray-50 dark:bg-gray-700">
                  <SelectValue placeholder="반려동물을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <PetSelectCard
                      key={pet.id}
                      pet={pet}
                      onSelect={handleSelectPet}
                    />
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasSelectedPet && selectedPet && (
              <SelectedPetDisplay pet={selectedPet} />
            )}
          </CardContent>

          <CardFooter className="p-8 pt-0">
            <Button
              onClick={handleNavigateToRecords}
              disabled={!hasSelectedPet}
              className="w-full h-12 text-lg font-bold bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors duration-200"
            >
              <FileText className="mr-2 h-5 w-5" />
              기록 보러가기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
