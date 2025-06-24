import { useState, useMemo } from "react";
import {
  Heart,
  PawPrint,
  Users,
  TreePine,
  Plus,
  Stethoscope,
} from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Card } from "~/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";
import type { Route } from "./+types/pets-page";
import { Link } from "react-router";
import { PetOverviewCard } from "~/features/pets/components/pet-overview-card";
import { FamilyPetCard } from "~/features/pets/components/family-pet-card";
import { HealthSummaryCard } from "~/features/pets/components/health-summary-card";
import { BirthRecordCard } from "~/features/pets/components/birth-record-card";
import { StatsSummary } from "~/features/pets/components/stats-summary";
import type {
  Pet,
  PetWithFamily,
  BirthRecord,
} from "~/features/pets/types/pet";

// SAMPLE_PETS 데이터 - 실제로는 loader에서 데이터베이스에서 가져와야 함
export const SAMPLE_PETS: (Pet & {
  healthRecords: number;
  lastCheckup: string;
  totalActivityMinutes: number;
})[] = [
  {
    pet_id: 1,
    profile_id: "00000000-0000-0000-0000-000000000001",
    name: "사랑이", // 어미
    type: "dog",
    breed: "골든 리트리버",
    gender: "female" as const,
    birth_date: "2020-03-15",
    is_neutered: true,
    profile_url: null,
    birth_record_id: null,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: { birth_weight: 0.4, current: 28.5, target: 30.0, history: [] },
        height: { current: "58cm", last_measured: "2024-01-15" },
        blood_type: { type: "DEA 1.1", status: "양성" },
      },
      identification: {
        chip_number: "KR123456789",
        registration_date: "2020-04-01",
        registered_location: "서울시 강남구",
      },
      additional: {
        temperament: "온순함",
        socialization: "우수",
        energy_level: "중간",
        training_level: "기본 완료",
        special_needs: "없음",
        notes: "사람을 매우 좋아함",
      },
    },
    adoption_info: null,
    created_at: new Date("2020-04-01"),
    updated_at: new Date("2024-01-15"),
    healthRecords: 8,
    lastCheckup: "2024-01-15",
    totalActivityMinutes: 1200,
  },
  {
    pet_id: 2,
    profile_id: "00000000-0000-0000-0000-000000000002",
    name: "복덩이", // 자녀 1
    type: "dog",
    breed: "골든 리트리버",
    gender: "male" as const,
    birth_date: "2022-05-20",
    is_neutered: false,
    profile_url: null,
    birth_record_id: 1, // 출생 기록 ID
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: {
          birth_weight: 0.35,
          current: 15.2,
          target: 16.0,
          history: [],
        },
        height: { current: "45cm", last_measured: "2024-01-10" },
        blood_type: { type: "DEA 1.1", status: "양성" },
      },
      identification: {
        chip_number: "KR987654321",
        registration_date: "2022-06-15",
        registered_location: "서울시 강남구",
      },
      additional: {
        temperament: "활발함",
        socialization: "좋음",
        energy_level: "높음",
        training_level: "성장 중",
        special_needs: "없음",
        notes: "장난꾸러기",
      },
    },
    adoption_info: null,
    created_at: new Date("2022-06-15"),
    updated_at: new Date("2024-01-10"),
    healthRecords: 12,
    lastCheckup: "2024-01-10",
    totalActivityMinutes: 980,
  },
  {
    pet_id: 3,
    profile_id: "00000000-0000-0000-0000-000000000003",
    name: "행복이", // 자녀 2
    type: "dog",
    breed: "골든 리트리버",
    gender: "female",
    birth_date: "2022-05-20",
    is_neutered: true,
    profile_url: null,
    birth_record_id: 1, // 출생 기록 ID
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: {
          birth_weight: 0.32,
          current: 14.8,
          target: 15.5,
          history: [],
        },
        height: { current: "43cm", last_measured: "2024-01-10" },
        blood_type: { type: "DEA 1.1", status: "양성" },
      },
      identification: {
        chip_number: "KR456789123",
        registration_date: "2022-06-15",
        registered_location: "서울시 강남구",
      },
      additional: {
        temperament: "차분함",
        socialization: "좋음",
        energy_level: "중간",
        training_level: "성장 중",
        special_needs: "없음",
        notes: "애교가 많음",
      },
    },
    adoption_info: null,
    created_at: new Date("2022-06-15"),
    updated_at: new Date("2024-01-08"),
    healthRecords: 10,
    lastCheckup: "2024-01-08",
    totalActivityMinutes: 1500,
  },
  {
    pet_id: 4,
    profile_id: "00000000-0000-0000-0000-000000000004",
    name: "용맹이", // 아비
    type: "dog",
    breed: "시베리안 허스키",
    gender: "male",
    birth_date: "2019-01-01",
    is_neutered: true,
    profile_url: null,
    birth_record_id: null,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: { birth_weight: 0.5, current: 30.0, target: 30.0, history: [] },
        height: { current: "60cm", last_measured: "2024-01-20" },
        blood_type: { type: "DEA 1.2", status: "양성" },
      },
      identification: {
        chip_number: "KR111222333",
        registration_date: "2019-02-15",
        registered_location: "서울시 강북구",
      },
      additional: {
        temperament: "충직함",
        socialization: "보통",
        energy_level: "매우 높음",
        training_level: "고급 훈련 완료",
        special_needs: "정기적인 운동 필요",
        notes: "",
      },
    },
    adoption_info: null,
    created_at: new Date("2019-02-15"),
    updated_at: new Date("2024-01-20"),
    healthRecords: 5,
    lastCheckup: "2024-01-20",
    totalActivityMinutes: 2500,
  },
  {
    pet_id: 5,
    profile_id: "00000000-0000-0000-0000-000000000005",
    name: "입양이", // 독립된 부모
    type: "cat",
    breed: "코리안 숏헤어",
    gender: "male",
    birth_date: "2023-01-10",
    is_neutered: true,
    profile_url: null,
    birth_record_id: null,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: { birth_weight: 0.12, current: 4.5, target: 5.0, history: [] },
        height: { current: "25cm", last_measured: "2024-02-01" },
        blood_type: { type: "A", status: "양성" },
      },
      identification: {
        chip_number: "KR444555666",
        registration_date: "2023-02-01",
        registered_location: "서울시 강남구",
      },
      additional: {
        temperament: "독립적",
        socialization: "경계심 있음",
        energy_level: "중간",
        training_level: "기본 완료",
        special_needs: "없음",
        notes: "조용한 환경 선호",
      },
    },
    adoption_info: null,
    created_at: new Date("2023-02-01"),
    updated_at: new Date("2024-02-01"),
    healthRecords: 3,
    lastCheckup: "2024-02-01",
    totalActivityMinutes: 450,
  },
  {
    pet_id: 6,
    profile_id: "00000000-0000-0000-0000-000000000006",
    name: "나비", // 입양이의 파트너
    type: "cat",
    breed: "페르시안",
    gender: "female",
    birth_date: "2022-11-11",
    is_neutered: true,
    profile_url: null,
    birth_record_id: null,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: { birth_weight: 0.1, current: 3.8, target: 4.0, history: [] },
        height: { current: "24cm", last_measured: "2024-03-01" },
        blood_type: { type: "B", status: "양성" },
      },
      identification: {
        chip_number: "KR777888999",
        registration_date: "2023-01-01",
        registered_location: "서울시 용산구",
      },
      additional: {
        temperament: "상냥함",
        socialization: "좋음",
        energy_level: "낮음",
        training_level: "없음",
        special_needs: "없음",
        notes: "무릎냥이",
      },
    },
    adoption_info: null,
    created_at: new Date("2023-01-01"),
    updated_at: new Date("2024-03-01"),
    healthRecords: 2,
    lastCheckup: "2024-03-01",
    totalActivityMinutes: 300,
  },
  {
    pet_id: 7,
    profile_id: "00000000-0000-0000-0000-000000000007",
    name: "아깽이1", // 입양이+나비 자녀
    type: "cat",
    breed: "믹스",
    gender: "male",
    birth_date: "2024-04-01",
    is_neutered: false,
    profile_url: null,
    birth_record_id: 2,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: { birth_weight: 0.09, current: 0.5, target: 4.0, history: [] },
        height: { current: "10cm", last_measured: "2024-04-01" },
        blood_type: { type: "A", status: "양성" },
      },
      identification: {
        chip_number: "미등록",
        registration_date: "미등록",
        registered_location: "미등록",
      },
      additional: {
        temperament: "호기심 많음",
        socialization: "형성 중",
        energy_level: "매우 높음",
        training_level: "필요",
        special_needs: "이유식 필요",
        notes: "",
      },
    },
    adoption_info: null,
    created_at: new Date("2024-04-01"),
    updated_at: new Date("2024-04-01"),
    healthRecords: 1,
    lastCheckup: "2024-04-01",
    totalActivityMinutes: 50,
  },
  {
    pet_id: 8,
    profile_id: "00000000-0000-0000-0000-000000000008",
    name: "아깽이2", // 입양이+나비 자녀
    type: "cat",
    breed: "믹스",
    gender: "female",
    birth_date: "2024-04-01",
    is_neutered: false,
    profile_url: null,
    birth_record_id: 2,
    adoptive_mother_id: null,
    adoptive_father_id: null,
    basic_info: {
      physical: {
        weight: {
          birth_weight: 0.085,
          current: 0.48,
          target: 3.8,
          history: [],
        },
        height: { current: "9.8cm", last_measured: "2024-04-01" },
        blood_type: { type: "B", status: "양성" },
      },
      identification: {
        chip_number: "미등록",
        registration_date: "미등록",
        registered_location: "미등록",
      },
      additional: {
        temperament: "겁이 많음",
        socialization: "형성 중",
        energy_level: "매우 높음",
        training_level: "필요",
        special_needs: "이유식 필요",
        notes: "",
      },
    },
    adoption_info: null,
    created_at: new Date("2024-04-01"),
    updated_at: new Date("2024-04-01"),
    healthRecords: 1,
    lastCheckup: "2024-04-01",
    totalActivityMinutes: 60,
  },
  {
    pet_id: 9, // 신규 입양 동물
    profile_id: "00000000-0000-0000-0000-000000000009",
    name: "별님이",
    type: "dog",
    breed: "보더콜리",
    gender: "male",
    birth_date: "2023-08-01",
    is_neutered: false,
    profile_url: null,
    birth_record_id: null,
    adoptive_mother_id: 1, // 입양-어미: 사랑이
    adoptive_father_id: 4, // 입양-아비: 용맹이
    basic_info: {
      physical: {
        weight: {
          birth_weight: 0.45,
          current: 18.0,
          target: 20.0,
          history: [],
        },
        height: { current: "50cm", last_measured: "2024-05-01" },
        blood_type: { type: "DEA 1.1", status: "미확인" },
      },
      identification: {
        chip_number: "KR135792468",
        registration_date: "2023-09-01",
        registered_location: "서울시 서초구",
      },
      additional: {
        temperament: "지능적",
        socialization: "좋음",
        energy_level: "매우 높음",
        training_level: "훈련 중",
        special_needs: "많은 활동량 필요",
        notes: "입양된 지 얼마 안 됨",
      },
    },
    adoption_info: null,
    created_at: new Date("2023-09-01"),
    updated_at: new Date("2024-05-01"),
    healthRecords: 4,
    lastCheckup: "2024-05-01",
    totalActivityMinutes: 3500,
  },
];

const SAMPLE_BIRTH_RECORDS: BirthRecord[] = [
  {
    record_id: 1,
    pet_id: 1, // 어미 ID
    father_pet_id: 4, // 아비 ID
    birth_date: new Date("2022-05-20T14:30:00Z"),
    total_pups: 2,
    medical_info: {
      medical: {
        pre_birth: {
          pregnancy_duration: 63,
          last_checkup: "2022-05-15",
          risk_factors: [],
          notes: "정상적인 임신 과정",
        },
        birth: {
          type: "natural",
          duration: "4h 30m",
          complications: "없음",
          assistance_required: false,
        },
        location: {
          type: "hospital",
          details: {
            name: "행복동물병원",
            address: "서울시 강남구 테헤란로 123",
            contact: "02-123-4567",
          },
        },
        medical_team: {
          veterinarian_id: "vet-001",
          assistant_ids: ["assist-001"],
        },
        mother_condition: {
          pre_birth: "양호",
          during_birth: "안정적",
          post_birth: "양호",
          vital_signs: {
            temperature: "38.5",
            heart_rate: "120",
            blood_pressure: "120/80",
          },
        },
      },
      pups_summary: {
        total: { born: 2, alive: 2, male: 1, female: 1 },
        average_weight: "320g",
        general_condition: "healthy",
      },
      post_birth_care: {
        monitoring_schedule: {
          "2h_check": { check_items: ["체온", "수유", "활동성"] },
          "24h_check": { check_items: ["체중", "배변", "수유량"] },
        },
        feeding: {
          first_feeding: "2022-05-20T15:30:00Z",
          schedule: "매 2-3시간",
          special_instructions: "야간 수유 필요",
        },
        medications: {
          name: "항생제",
          dosage: "5ml",
          frequency: "12h",
          duration: "5days",
        },
      },
      attachments: {
        images: [],
        documents: [],
      },
      follow_up: {
        checkups: {
          scheduled_date: "2022-05-27",
          purpose: "산후 1주 검진",
          requirements: ["체중 기록", "전체 사진"],
        },
        vaccination_schedule: {
          first_vaccination: "2022-07-15",
          notes: "6주령 이후 시작",
        },
      },
      notes: "순조로운 출산 진행",
    },
    created_at: new Date("2022-05-20"),
    updated_at: new Date("2022-05-20"),
  },
  {
    record_id: 2,
    pet_id: 6, // 어미 ID: 나비
    father_pet_id: 5, // 아비 ID: 입양이
    birth_date: new Date("2024-04-01T10:00:00Z"),
    total_pups: 2,
    medical_info: {
      medical: {
        pre_birth: {
          pregnancy_duration: 65,
          last_checkup: "2024-03-28",
          risk_factors: [],
          notes: "정상적인 임신 과정",
        },
        birth: {
          type: "natural",
          duration: "3h 20m",
          complications: "없음",
          assistance_required: false,
        },
        location: {
          type: "home",
          details: {
            name: "집",
            address: "서울시 용산구",
            contact: "",
          },
        },
        medical_team: {
          veterinarian_id: "vet-002",
          assistant_ids: [],
        },
        mother_condition: {
          pre_birth: "양호",
          during_birth: "안정적",
          post_birth: "양호",
          vital_signs: {
            temperature: "38.2",
            heart_rate: "140",
            blood_pressure: "110/70",
          },
        },
      },
      pups_summary: {
        total: { born: 2, alive: 2, male: 1, female: 1 },
        average_weight: "110g",
        general_condition: "healthy",
      },
      post_birth_care: {
        monitoring_schedule: {
          "2h_check": { check_items: ["체온", "수유", "활동성"] },
          "24h_check": { check_items: ["체중", "배변", "수유량"] },
        },
        feeding: {
          first_feeding: "2024-04-01T11:00:00Z",
          schedule: "매 2시간",
          special_instructions: "세심한 관찰 필요",
        },
        medications: {
          name: "없음",
          dosage: "",
          frequency: "",
          duration: "",
        },
      },
      attachments: {
        images: [],
        documents: [],
      },
      follow_up: {
        checkups: {
          scheduled_date: "2024-04-08",
          purpose: "산후 1주 검진",
          requirements: ["체중 기록", "전체 사진"],
        },
        vaccination_schedule: {
          first_vaccination: "2024-05-13",
          notes: "6주령 이후 시작",
        },
      },
      notes: "순조로운 출산 진행",
    },
    created_at: new Date("2024-04-01"),
    updated_at: new Date("2024-04-01"),
  },
];

export function loader({ request }: Route.LoaderArgs) {
  return {
    pets: SAMPLE_PETS,
    birthRecords: SAMPLE_BIRTH_RECORDS,
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "우리 가족 | 반려동물 관리" },
    {
      name: "description",
      content:
        "소중한 반려동물들의 건강과 가족 관계를 한눈에 확인하고 관리하세요",
    },
  ];
}

function PetStatsHeader({
  totalPets,
  totalHealthRecords,
  totalBirthRecords,
}: {
  totalPets: number;
  totalHealthRecords: number;
  totalBirthRecords: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/60 via-indigo-100/60 to-purple-100/60 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 transform -skew-y-2" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent dark:from-blue-800/20" />
      <div className="relative container py-20 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative p-4 rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border border-white/20 dark:border-gray-700/30">
              <PawPrint className="h-14 w-14 text-blue-500 drop-shadow-sm" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent tracking-tight">
              우리 가족
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              소중한 반려동물들의 건강과 가족 관계를 한눈에 확인하세요
            </p>
          </div>

          <StatsSummary
            totalPets={totalPets}
            totalHealthRecords={totalHealthRecords}
            totalBirthRecords={totalBirthRecords}
          />
        </div>
      </div>
    </div>
  );
}

function TabNavigation({
  selectedTab,
  onTabChange,
}: {
  selectedTab: string;
  onTabChange: (value: string) => void;
}) {
  const tabs = [
    { value: "overview", icon: Users, text: "전체 현황", color: "blue" },
    {
      value: "family-tree",
      icon: TreePine,
      text: "가족 구성도",
      color: "green",
    },
    { value: "health", icon: Stethoscope, text: "건강 관리", color: "red" },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 py-4">
      <TabsList className="p-6 bg-transparent w-full justify-center min-h-[120px] flex items-center">
        <div className="flex gap-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-white/30 dark:border-gray-700/30 min-h-[100px] items-center">
          {tabs.map(({ value, icon: Icon, text, color }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={`
                        relative min-w-[160px] px-6 py-4 rounded-lg font-medium transition-all duration-300
                        data-[state=active]:bg-white data-[state=active]:shadow-lg 
                        dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:shadow-xl
                        data-[state=active]:scale-105 data-[state=active]:border-2
                        ${
                          color === "blue"
                            ? "data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
                            : ""
                        }
                        ${
                          color === "green"
                            ? "data-[state=active]:border-green-500 data-[state=active]:text-green-600"
                            : ""
                        }
                        ${
                          color === "red"
                            ? "data-[state=active]:border-red-500 data-[state=active]:text-red-600"
                            : ""
                        }
                        hover:bg-white/80 dark:hover:bg-gray-700/80
                        text-gray-600 dark:text-gray-300
                      `}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="h-5 w-5 transition-colors" />
                <span className="text-sm text-center leading-tight">
                  {text}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
    </div>
  );
}

function FamilyTreeContent({
  petsWithFamily,
  birthRecords,
}: {
  petsWithFamily: PetWithFamily[];
  birthRecords: BirthRecord[];
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          가족 구성도
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          반려동물들의 가족 관계를 트리 형태로 확인하세요
        </p>
      </div>

      <div className="flex justify-center">
        <div className="space-y-8">
          <div className="flex justify-center items-start gap-8">
            {birthRecords.map((record) => {
              const mother = petsWithFamily.find(
                (p) => p.pet_id === record.pet_id
              );
              const father = petsWithFamily.find(
                (p) => p.pet_id === record.father_pet_id
              );
              const children = petsWithFamily.filter(
                (p) => p.birth_record_id === record.record_id
              );
              const adoptedChildren = petsWithFamily.filter(
                (p) =>
                  p.adoptive_mother_id === record.pet_id &&
                  p.adoptive_father_id === record.father_pet_id
              );

              if (!mother && !father) return null;

              const hasAnyChildren =
                children.length > 0 || adoptedChildren.length > 0;

              return (
                <div
                  key={record.record_id}
                  className="flex flex-col items-center space-y-8"
                >
                  <div className="flex items-start justify-center gap-4 relative">
                    {mother && (
                      <FamilyPetCard
                        pet={mother}
                        color="blue"
                        hasChildren={hasAnyChildren}
                      />
                    )}
                    <div className="flex items-center h-full pt-10">
                      <Heart className="h-6 w-6 text-red-400" />
                    </div>
                    {father && (
                      <FamilyPetCard
                        pet={father}
                        color="blue"
                        hasChildren={hasAnyChildren}
                      />
                    )}
                    {hasAnyChildren && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300 dark:bg-gray-600" />
                    )}
                  </div>

                  {children.length > 0 && (
                    <div className="relative pt-8">
                      <div className="absolute left-1/2 -top-0 w-px h-8 bg-gray-300 dark:bg-gray-600" />
                      <div className="flex items-start justify-center gap-4">
                        {children.map((child) => (
                          <FamilyPetCard
                            key={child.pet_id}
                            pet={child}
                            color="green"
                            isChild
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {adoptedChildren.length > 0 && (
                    <div className="relative pt-8">
                      <div className="absolute left-1/2 -top-0 w-px h-8 border-l border-dashed border-gray-400 dark:border-gray-500" />
                      <div className="flex items-start justify-center gap-4">
                        {adoptedChildren.map((child) => (
                          <FamilyPetCard
                            key={child.pet_id}
                            pet={child}
                            color="green"
                            isChild
                            isAdopted
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          출산 기록
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {birthRecords.map((record) => {
            const mother = petsWithFamily.find(
              (p) => p.pet_id === record.pet_id
            );
            const father = petsWithFamily.find(
              (p) => p.pet_id === record.father_pet_id
            );
            return (
              <BirthRecordCard
                key={record.record_id}
                record={record}
                mother={mother}
                father={father}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PetsPage({ loaderData }: Route.ComponentProps) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { pets, birthRecords } = loaderData;

  const petsWithFamily = useMemo((): (PetWithFamily & {
    healthRecords: number;
    lastCheckup: string;
    totalActivityMinutes: number;
  })[] => {
    const petsById = new Map(pets.map((p) => [p.pet_id, p]));

    return pets.map((pet) => {
      const birthRecord = birthRecords.find(
        (br) => br.record_id === pet.birth_record_id
      );
      const mother = birthRecord ? petsById.get(birthRecord.pet_id) : undefined;
      const father =
        birthRecord && birthRecord.father_pet_id
          ? petsById.get(birthRecord.father_pet_id)
          : undefined;

      const adoptiveMother = pet.adoptive_mother_id
        ? petsById.get(pet.adoptive_mother_id)
        : undefined;
      const adoptiveFather = pet.adoptive_father_id
        ? petsById.get(pet.adoptive_father_id)
        : undefined;

      const birthRecordsAsParent = birthRecords.filter(
        (br) => br.pet_id === pet.pet_id || br.father_pet_id === pet.pet_id
      );
      const children = birthRecordsAsParent.flatMap((br) =>
        pets.filter((p) => p.birth_record_id === br.record_id)
      );

      const adoptedChildren = pets.filter(
        (p) =>
          p.adoptive_mother_id === pet.pet_id ||
          p.adoptive_father_id === pet.pet_id
      );

      return {
        ...pet,
        mother,
        father,
        children,
        adoptiveMother,
        adoptiveFather,
        adoptedChildren,
      };
    });
  }, [pets, birthRecords]);

  const totalPets = pets.length;
  const totalHealthRecords = pets.reduce(
    (sum, pet) => sum + (pet.healthRecords || 0),
    0
  );
  const totalBirthRecords = birthRecords.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <PetStatsHeader
        totalPets={totalPets}
        totalHealthRecords={totalHealthRecords}
        totalBirthRecords={totalBirthRecords}
      />

      <div className="container -mt-16 pb-20 mx-auto">
        <Card className="backdrop-blur-md bg-white/95 dark:bg-gray-800/95 shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabNavigation
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />

            <div className="p-8 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50">
              <div className="flex justify-end mb-8">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                  asChild
                >
                  <Link to="/pets/register">
                    <Plus className="h-4 w-4 mr-2" />
                    반려동물 등록
                  </Link>
                </Button>
              </div>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {petsWithFamily.map((pet) => (
                    <PetOverviewCard key={pet.pet_id} pet={pet} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="family-tree">
                <FamilyTreeContent
                  petsWithFamily={petsWithFamily}
                  birthRecords={birthRecords}
                />
              </TabsContent>

              <TabsContent value="health">
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      건강 관리 현황
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      모든 반려동물의 건강 상태를 종합적으로 관리하세요
                    </p>
                  </div>

                  <StatsSummary
                    recentCheckups={
                      petsWithFamily.filter(
                        (pet) =>
                          new Date(pet.lastCheckup) >
                          new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                      ).length
                    }
                    totalHealthRecords={totalHealthRecords}
                    totalNeutered={
                      petsWithFamily.filter((pet) => pet.is_neutered).length
                    }
                    totalActivityHours={Math.round(
                      petsWithFamily.reduce(
                        (sum, pet) => sum + (pet.totalActivityMinutes || 0),
                        0
                      ) / 60
                    )}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {petsWithFamily.map((pet) => (
                      <HealthSummaryCard key={pet.pet_id} pet={pet} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
