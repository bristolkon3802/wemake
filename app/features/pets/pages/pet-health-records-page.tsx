import { useState } from "react";
import {
  Activity,
  Syringe,
  AlertTriangle,
  Pill,
  Utensils,
  Footprints,
  PlusCircle,
  ChevronLeft,
  FileText,
} from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent } from "~/common/components/ui/card";
import { Link } from "react-router";
import { HealthRecordCard } from "~/features/pets/components/health-record-card";
import { HealthRecordForm } from "~/features/pets/forms/health-record-form";
import type { Route } from "./+types/pet-health-records-page";
import type { Pet, HealthRecord } from "~/features/pets/types/pet";

// --- Sample Data ---
const SAMPLE_PETS: Pet[] = [
  {
    pet_id: 1,
    profile_id: "00000000-0000-0000-0000-000000000001",
    name: "사랑이",
    type: "dog",
    breed: "골든 리트리버",
    gender: "female",
    birth_date: "2020-01-15",
    is_neutered: true,
    profile_url:
      "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=400&auto=format&fit=crop",
    birth_record_id: null,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: {
          birth_weight: 3.5,
          current: 28,
          target: 27,
          history: [{ date: "2024-05-15", value: 28 }],
        },
        height: { current: "55cm", last_measured: "2024-05-15" },
        blood_type: { type: "DEA 1.1", status: "Positive" },
      },
      identification: {
        chip_number: "123456789012345",
        registration_date: "2020-03-20",
        registered_location: "서울시 강남구",
      },
      additional: {
        temperament: "온순함",
        socialization: "우수",
        energy_level: "보통",
        training_level: "기본 훈련 완료",
        special_needs: "없음",
        notes: "",
      },
    },
    adoption_info: null,
    created_at: new Date("2020-01-20T10:00:00Z"),
    updated_at: new Date("2024-06-01T10:00:00Z"),
  },
  {
    pet_id: 2,
    profile_id: "00000000-0000-0000-0000-000000000001",
    name: "복덩이",
    type: "dog",
    breed: "골든 리트리버",
    gender: "male",
    birth_date: "2022-03-10",
    is_neutered: false,
    profile_url: null,
    birth_record_id: null,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: {
          birth_weight: 4.0,
          current: 32,
          target: 30,
          history: [{ date: "2024-05-15", value: 32 }],
        },
        height: { current: "60cm", last_measured: "2024-05-15" },
        blood_type: { type: "DEA 1.1", status: "Positive" },
      },
      identification: {
        chip_number: "543210987654321",
        registration_date: "2022-05-15",
        registered_location: "서울시 강남구",
      },
      additional: {
        temperament: "활발함",
        socialization: "우수",
        energy_level: "높음",
        training_level: "훈련 중",
        special_needs: "없음",
        notes: "",
      },
    },
    adoption_info: null,
    created_at: new Date("2022-03-10T10:00:00Z"),
    updated_at: new Date("2024-06-01T10:00:00Z"),
  },
];

const SAMPLE_HEALTH_RECORDS: HealthRecord[] = [
  {
    record_id: 1,
    pet_id: 1,
    type: "checkup",
    record_date: "2024-05-15",
    health_info: {
      checkup: {
        hospital_name: "튼튼 동물병원",
        expert_id: "dr_kim",
        diagnosis: {
          details: "전반적으로 양호, 체중 관리 필요.",
          recommendations: ["주 3회 30분 이상 산책", "사료량 10% 감소"],
        },
        vitals: {
          weight: "15.2kg",
          temperature: "38.5°C",
          heart_rate: "90bpm",
        },
        attachments: [],
      },
    },
    consultation_id: null,
    created_at: new Date("2024-05-15T10:00:00Z"),
    updated_at: new Date("2024-05-15T10:00:00Z"),
  },
  {
    record_id: 2,
    pet_id: 1,
    type: "vaccination",
    record_date: "2024-03-10",
    health_info: {
      vaccination: {
        name: "종합백신 (DHPPL) 5차",
        hospital: "튼튼 동물병원",
        lot_number: "ABC12345",
        next_due: "2025-03-10",
      },
    },
    consultation_id: null,
    created_at: new Date("2024-03-10T10:00:00Z"),
    updated_at: new Date("2024-03-10T10:00:00Z"),
  },
  {
    record_id: 3,
    pet_id: 1,
    type: "activity",
    record_date: "2024-06-01",
    health_info: {
      activity: {
        type: "산책",
        duration_minutes: 60,
        distance_km: 3,
        notes: "공원에서 다른 강아지들과 잘 어울림.",
      },
    },
    consultation_id: null,
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-01T10:00:00Z"),
  },
  {
    record_id: 4,
    pet_id: 2,
    type: "diet",
    record_date: "2024-06-01",
    health_info: {
      diet: {
        type: "dry",
        brand: "오리젠",
        daily_amount: "300g",
        restrictions: [{ item: "닭고기", reason: "알레르기 의심" }],
      },
    },
    consultation_id: null,
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-01T10:00:00Z"),
  },
  {
    record_id: 5,
    pet_id: 1,
    type: "allergy",
    record_date: "2023-11-20",
    health_info: {
      allergy: {
        category: "food",
        item: "닭고기",
        severity: "medium",
        diagnosed_date: "2023-11-20",
        symptoms: ["피부 발진", "가려움증"],
      },
    },
    consultation_id: null,
    created_at: new Date("2023-11-20T10:00:00Z"),
    updated_at: new Date("2023-11-20T10:00:00Z"),
  },
  {
    record_id: 6,
    pet_id: 1,
    type: "medication",
    record_date: "2024-04-20",
    health_info: {
      medication: {
        name: "심장사상충 약",
        dosage: { amount: "1", unit: "정", frequency: "월 1회" },
        start_date: "2024-01-01",
        end_date: null,
        purpose: "예방",
      },
    },
    consultation_id: null,
    created_at: new Date("2024-04-20T10:00:00Z"),
    updated_at: new Date("2024-04-20T10:00:00Z"),
  },
];

// --- Route Exports ---
export function meta({ data }: Route.MetaArgs) {
  const petName = data?.pet?.name || "반려동물";
  return [{ title: `${petName} 건강 기록 | ${import.meta.env.VITE_APP_NAME}` }];
}

export function loader({ params }: Route.LoaderArgs) {
  const petId = Number(params.petId);
  if (isNaN(petId)) {
    throw new Response("잘못된 반려동물 ID입니다.", { status: 400 });
  }

  const pet = SAMPLE_PETS.find((p) => p.pet_id === petId);
  if (!pet) {
    throw new Response("반려동물을 찾을 수 없습니다.", { status: 404 });
  }

  const healthRecords = SAMPLE_HEALTH_RECORDS.filter((r) => r.pet_id === petId);
  return { pet, healthRecords };
}

// --- Constants ---
const ICONS: { [key: string]: React.ElementType } = {
  checkup: Activity,
  vaccination: Syringe,
  allergy: AlertTriangle,
  medication: Pill,
  diet: Utensils,
  activity: Footprints,
};

const TYPE_NAMES: { [key: string]: string } = {
  checkup: "건강 검진",
  vaccination: "예방접종",
  allergy: "알레르기",
  medication: "투약 기록",
  diet: "식단 관리",
  activity: "운동 기록",
};

// --- Components ---
function PetHeader({ pet, onAddNew }: { pet: Pet; onAddNew: () => void }) {
  return (
    <div className="mb-8">
      <Link
        to="/pets"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white mb-4"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />내 반려동물 목록으로
      </Link>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={
              pet.profile_url ||
              "https://placehold.co/100x100/A8D5E2/4A4A4A?text=Pet"
            }
            alt={pet.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {pet.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{pet.breed}</p>
          </div>
        </div>
        <Button
          onClick={onAddNew}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold"
        >
          <PlusCircle className="mr-2 h-4 w-4" />새 건강 기록 추가
        </Button>
      </div>
    </div>
  );
}

function HealthSummary({ healthRecords }: { healthRecords: HealthRecord[] }) {
  const lastCheckup = healthRecords.find(
    (r) => r.type === "checkup"
  )?.record_date;

  const mainAllergy = healthRecords.find((r) => r.type === "allergy")
    ?.health_info.allergy?.item;

  return (
    <Card className="mb-8 bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            총 기록 수
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {healthRecords.length}개
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            최근 검진일
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {lastCheckup || "기록 없음"}
          </p>
        </div>
        <div className="space-y-1 col-span-2 md:col-span-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            주요 알레르기
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {mainAllergy || "없음"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function HealthRecordsTimeline({
  healthRecords,
  onEdit,
  onDelete,
}: {
  healthRecords: HealthRecord[];
  onEdit: (record: HealthRecord) => void;
  onDelete: (record: HealthRecord) => void;
}) {
  const sortedRecords = [...healthRecords].sort(
    (a, b) =>
      new Date(b.record_date).getTime() - new Date(a.record_date).getTime()
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        기록 타임라인
      </h2>
      <div className="relative border-l-2 border-blue-200 dark:border-gray-700 pl-6 space-y-8">
        {sortedRecords.map((record) => {
          const Icon = ICONS[record.type] || FileText;
          const typeName = TYPE_NAMES[record.type] || "기타";

          return (
            <HealthRecordCard
              key={record.record_id}
              record={record}
              onEdit={onEdit}
              onDelete={onDelete}
              icon={Icon}
              typeName={typeName}
            />
          );
        })}
      </div>
    </div>
  );
}

function SimpleHealthRecordForm({
  pet,
  record,
  onCancel,
  onSubmit,
}: {
  pet: Pet;
  record: HealthRecord | null;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <HealthRecordForm
        pet={pet}
        record={record}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
}

// --- Main Component ---
export default function PetHealthRecordsPage({
  loaderData,
}: Route.ComponentProps) {
  const { pet, healthRecords } = loaderData;
  const [view, setView] = useState<"list" | "form">("list");
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(
    null
  );

  function handleAddNew() {
    setSelectedRecord(null);
    setView("form");
  }

  function handleEdit(record: HealthRecord) {
    setSelectedRecord(record);
    setView("form");
  }

  function handleDelete(record: HealthRecord) {
    console.log("Delete record:", record.record_id);
    // TODO: 실제 삭제 로직 구현
  }

  function handleCancel() {
    setView("list");
    setSelectedRecord(null);
  }

  function handleSubmit(data: any) {
    console.log("Form submitted:", data);
    setView("list");
  }

  if (view === "form") {
    return (
      <SimpleHealthRecordForm
        pet={pet}
        record={selectedRecord}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <PetHeader pet={pet} onAddNew={handleAddNew} />
          <HealthSummary healthRecords={healthRecords} />
          <HealthRecordsTimeline
            healthRecords={healthRecords}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
