import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { Card, CardFooter } from "~/common/components/ui/card";
import {
  Heart,
  Info,
  Users,
  Trash2,
  ArrowLeft,
  Save,
  AlertTriangle,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";
import { SAMPLE_PETS } from "./pets-page";
import { Form, Link } from "react-router";
import { PetBasicInfoForm } from "~/features/pets/forms/pet-basic-info-form";
import { PetDetailInfoForm } from "~/features/pets/forms/pet-detail-info-form";
import { PetRelationsForm } from "~/features/pets/forms/pet-relations-form";
import type { Route } from "./+types/register-pet-page";

// --- Type Definitions ---
type Pet = (typeof SAMPLE_PETS)[number];
type LoaderData = {
  pet: Pet | null;
  userPets: { pet_id: number; name: string; gender: string }[];
};

type ActionData = {
  errors?: Record<string, string[]>;
  error?: string;
};

type ComponentProps = {
  loaderData: LoaderData;
  actionData?: ActionData;
};

// --- Route Exports ---
export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const petId = url.searchParams.get("petId");

  const pet = petId
    ? SAMPLE_PETS.find((p) => p.pet_id === Number(petId)) || null
    : null;

  // 부모 선택을 위한 사용자 반려동물 목록
  const userPets = SAMPLE_PETS.map(({ pet_id, name, gender }) => ({
    pet_id,
    name,
    gender,
  }));

  return { pet, userPets };
}

export function meta({ data }: Route.MetaArgs) {
  const petName = data?.pet?.name;
  const title = petName ? `${petName} 프로필 수정` : "새 반려동물 등록";
  return [
    { title: `${title} | 반려동물 관리` },
    {
      name: "description",
      content: petName
        ? `${petName}의 프로필을 수정하고 정보를 업데이트하세요.`
        : "새로운 반려동물을 등록하고 맞춤형 케어 서비스를 시작하세요.",
    },
  ];
}

function PageHeader({
  isEditMode,
  pet,
}: {
  isEditMode: boolean;
  pet: Pet | null;
}) {
  return (
    <div className="relative">
      <Link
        to="/pets"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        반려동물 목록으로 돌아가기
      </Link>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div
            className={`p-2 rounded-lg ${
              isEditMode
                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                : "bg-gradient-to-r from-emerald-500 to-green-500"
            }`}
          >
            {isEditMode ? (
              <Trash2 className="w-5 h-5 text-white" />
            ) : (
              <Heart className="w-5 h-5 text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {isEditMode ? "프로필 수정" : "새 가족 등록"}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent tracking-tight">
          {isEditMode && pet
            ? `${pet.name} 프로필 관리`
            : "새로운 가족을 맞이해요"}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {isEditMode
            ? "소중한 반려동물의 정보를 수정하고 더 나은 관리를 위해 업데이트하세요."
            : "새로운 가족의 정보를 체계적으로 등록하고 맞춤형 케어 서비스를 시작하세요."}
        </p>
      </div>
    </div>
  );
}

function TabNavigation({ activeTab }: { activeTab: string }) {
  const tabs = [
    {
      value: "basic",
      icon: Heart,
      label: "기본 정보",
      shortLabel: "기본",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      value: "detail",
      icon: Info,
      label: "신체/신원",
      shortLabel: "상세",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "relations",
      icon: Users,
      label: "관계/기타",
      shortLabel: "관계",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <div className="sticky top-4 z-10 mb-8">
      <TabsList className="grid w-full grid-cols-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-1">
        {tabs.map(({ value, icon: Icon, label, shortLabel, gradient }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={`flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${gradient} data-[state=active]:text-white transition-all duration-300`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{shortLabel}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}

function FormFooter({
  isEditMode,
  isSubmitting,
  actionData,
  onDelete,
}: {
  isEditMode: boolean;
  isSubmitting: boolean;
  actionData?: { error?: string };
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/80 dark:bg-gray-900/80 border-t border-gray-200/50 dark:border-gray-700/50 p-6">
      <div className="flex items-center gap-4">
        {isEditMode && (
          <>
            <Button
              type="submit"
              name="intent"
              value="delete"
              variant="destructive"
              size="sm"
              className="shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isSubmitting}
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제하기
            </Button>

            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              삭제 시 모든 관련 데이터가 영구 삭제됩니다
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        {actionData?.error && (
          <p className="text-sm text-red-500">{actionData.error}</p>
        )}
        <div className="flex items-center gap-3">
          <Link to="/pets">
            <Button
              type="button"
              variant="outline"
              className="shadow-md hover:shadow-lg transition-all duration-200"
              disabled={isSubmitting}
            >
              취소
            </Button>
          </Link>

          <Button
            type="submit"
            name="intent"
            value={isEditMode ? "update" : "create"}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-[120px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                처리중...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {isEditMode ? "수정하기" : "등록하기"}
              </div>
            )}
          </Button>
        </div>
      </div>
    </CardFooter>
  );
}

export default function RegisterPetPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { pet, userPets } = loaderData;
  const isEditMode = pet !== null;

  const [previewImage, setPreviewImage] = useState<string | null>(
    pet?.profile_url || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleImageUpload() {
    if (selectedFile) {
      // TODO: 실제 이미지 업로드 로직 구현
      console.log("Uploading file:", selectedFile);
    }
  }

  function handleImageRemove() {
    setPreviewImage(null);
    setSelectedFile(null);
    const input = document.getElementById(
      "profile_picture"
    ) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    if (
      !window.confirm(
        "정말로 이 반려동물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      event.preventDefault();
    } else {
      setIsSubmitting(true);
    }
  }

  function handleSubmit() {
    setIsSubmitting(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <PageHeader isEditMode={isEditMode} pet={pet} />

        <Form method="post" onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabNavigation activeTab={activeTab} />

            <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 shadow-2xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <TabsContent value="basic" className="m-0">
                <PetBasicInfoForm
                  pet={pet}
                  previewImage={previewImage}
                  onImageSelect={handleImageSelect}
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                  selectedFile={selectedFile}
                />
              </TabsContent>

              <TabsContent value="detail" className="m-0">
                <PetDetailInfoForm pet={pet} />
              </TabsContent>

              <TabsContent value="relations" className="m-0">
                <PetRelationsForm pet={pet} userPets={userPets} />
              </TabsContent>

              <FormFooter
                isEditMode={isEditMode}
                isSubmitting={isSubmitting}
                actionData={actionData}
                onDelete={handleDelete}
              />
            </Card>
          </Tabs>

          {isEditMode && pet && (
            <input type="hidden" name="petId" value={pet.pet_id} />
          )}
        </Form>
      </div>
    </div>
  );
}
