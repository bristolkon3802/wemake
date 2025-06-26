import type { Route } from "./+types/grooming-pets-page";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Label } from "~/common/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import { Input } from "~/common/components/ui/input";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Badge } from "~/common/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";
import {
  groomingPetGenderEnum,
  groomingTemperamentEnum,
  groomingLevelEnum,
} from "../schema";
import {
  DogIcon,
  PlusIcon,
  EditIcon,
  CalendarIcon,
  WeightIcon,
  HeartIcon,
  AlertTriangleIcon,
  InfoIcon,
  SparklesIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

// 임시 데이터 (실제로는 loader에서 가져올 데이터)
const mockPets = [
  {
    grooming_pet_id: "1",
    name: "초코",
    breed: "말티즈",
    date_of_birth: "2021-03-15",
    gender: "수컷" as const,
    weight: "3.5",
    is_neutered: true,
    temperament: "차분함" as const,
    biting_level: "낮음" as const,
    separation_anxiety_level: "중간" as const,
    post_grooming_itch_level: "낮음" as const,
    post_grooming_anxiety_level: "낮음" as const,
    sensitive_areas: "귀, 발톱",
    health_issues: "없음",
    pet_info: {
      avatar_url: "",
      special_notes: "간식을 좋아해요",
      previous_grooming_issues: ["첫 미용 시 긴장함"],
    },
    created_at: "2024-01-15T10:00:00Z",
    is_profile_complete: true,
  },
  {
    grooming_pet_id: "2",
    name: "라떼",
    breed: "푸들",
    date_of_birth: "2020-08-22",
    gender: "암컷" as const,
    weight: "5.2",
    is_neutered: true,
    temperament: null,
    biting_level: null,
    separation_anxiety_level: null,
    post_grooming_itch_level: null,
    post_grooming_anxiety_level: null,
    sensitive_areas: null,
    health_issues: null,
    pet_info: {
      avatar_url: "",
      special_notes: null,
      previous_grooming_issues: [],
    },
    created_at: "2024-01-10T14:30:00Z",
    is_profile_complete: false,
  },
];

const genderOptions = groomingPetGenderEnum.enumValues;
const temperamentOptions = groomingTemperamentEnum.enumValues;
const levelOptions = groomingLevelEnum.enumValues;

export function loader({ request }: Route.LoaderArgs) {
  // 실제 구현에서는 여기서 사용자의 반려견 목록을 불러옵니다.
  return { pets: mockPets };
}

export function action({ request }: Route.ActionArgs) {
  // 폼 제출 로직은 여기에 구현됩니다.
  return {};
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: "내 반려견 관리" }];
}

export default function GroomingPetsPage({ loaderData }: Route.ComponentProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<(typeof mockPets)[0] | null>(
    null
  );

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "낮음":
        return "bg-green-100 text-green-800";
      case "중간":
        return "bg-yellow-100 text-yellow-800";
      case "높음":
        return "bg-orange-100 text-orange-800";
      case "심각":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProfileCompleteness = (pet: (typeof mockPets)[0]) => {
    // mock 데이터에서 is_profile_complete 필드를 직접 사용
    return (pet as any).is_profile_complete ? 100 : 40;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <DogIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            내 반려견 관리
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            미용 서비스를 이용할 반려견을 등록하고 관리하세요. 상세한 정보를
            등록하면 더 안전하고 맞춤형 미용 서비스를 받을 수 있습니다.
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-end">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />새 반려견 등록
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <DogIcon className="w-6 h-6" />새 반려견 등록
                </DialogTitle>
                <DialogDescription>
                  기본 정보만 입력하면 바로 등록됩니다. 나중에 상세 정보를
                  추가할 수 있어요.
                </DialogDescription>
              </DialogHeader>
              <AddPetForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* 수정 다이얼로그 */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <DogIcon className="w-6 h-6" />
                {selectedPet?.name} 정보 수정
              </DialogTitle>
              <DialogDescription>
                반려견의 상세 정보를 수정하여 더 안전한 미용 서비스를 받으세요.
              </DialogDescription>
            </DialogHeader>
            {selectedPet && (
              <EditPetForm
                pet={selectedPet}
                onClose={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* 반려견 목록 */}
        {mockPets.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <DogIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                등록된 반려견이 없습니다
              </h3>
              <p className="text-muted-foreground mb-4">
                첫 번째 반려견을 등록하여 미용 서비스를 시작해보세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPets.map((pet) => {
              const completeness = getProfileCompleteness(pet);
              return (
                <Card
                  key={pet.grooming_pet_id}
                  className="hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                          <DogIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            {pet.name}
                            {completeness === 100 ? (
                              <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            ) : (
                              <AlertCircleIcon className="w-5 h-5 text-orange-500" />
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            {pet.breed} • {calculateAge(pet.date_of_birth)}살
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPet(pet);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* 프로필 완성도 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>프로필 완성도</span>
                        <span className="font-medium">{completeness}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            completeness === 100
                              ? "bg-green-500"
                              : completeness >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${completeness}%` }}
                        />
                      </div>
                      {completeness < 100 && (
                        <p className="text-xs text-muted-foreground">
                          상세 정보를 추가하면 더 안전한 미용 서비스를 받을 수
                          있어요.
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">성별:</span>
                        <Badge variant="outline">{pet.gender}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <WeightIcon className="w-4 h-4 text-muted-foreground" />
                        <span>{pet.weight}kg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HeartIcon className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {pet.is_neutered ? "중성화 완료" : "중성화 안함"}
                        </span>
                      </div>
                      {pet.temperament && (
                        <div className="flex items-center gap-2">
                          <SparklesIcon className="w-4 h-4 text-muted-foreground" />
                          <Badge variant="outline">{pet.temperament}</Badge>
                        </div>
                      )}
                    </div>

                    {pet.biting_level && pet.separation_anxiety_level && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-1">
                          <AlertTriangleIcon className="w-4 h-4" />
                          주의사항
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">물림:</span>
                            <Badge
                              className={`ml-1 text-xs ${getLevelColor(
                                pet.biting_level
                              )}`}
                            >
                              {pet.biting_level}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              분리불안:
                            </span>
                            <Badge
                              className={`ml-1 text-xs ${getLevelColor(
                                pet.separation_anxiety_level
                              )}`}
                            >
                              {pet.separation_anxiety_level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {pet.sensitive_areas && (
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm flex items-center gap-1">
                          <InfoIcon className="w-4 h-4" />
                          민감 부위
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {pet.sensitive_areas}
                        </p>
                      </div>
                    )}

                    {pet.health_issues && pet.health_issues !== "없음" && (
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm text-orange-600">
                          건강 이슈
                        </h4>
                        <p className="text-xs text-orange-600">
                          {pet.health_issues}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// 간소화된 등록 폼
function AddPetForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">이름 *</Label>
          <Input
            id="name"
            name="name"
            placeholder="반려견의 이름을 입력하세요"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="breed">품종</Label>
          <Input
            id="breed"
            name="breed"
            placeholder="예: 말티즈, 푸들, 믹스견"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date_of_birth">생년월일</Label>
          <Input id="date_of_birth" name="date_of_birth" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">성별</Label>
          <Select name="gender">
            <SelectTrigger>
              <SelectValue placeholder="성별을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">체중 (kg)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            placeholder="예: 3.5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="is_neutered">중성화 여부</Label>
          <Select name="is_neutered">
            <SelectTrigger>
              <SelectValue placeholder="중성화 여부를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">중성화 완료</SelectItem>
              <SelectItem value="false">중성화 안함</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">
          💡 등록 후 추가 정보를 입력하세요
        </h4>
        <p className="text-sm text-blue-700">
          기본 정보로 먼저 등록한 후, 성격이나 미용 관련 특성 등의 상세 정보를
          추가하면 더욱 안전하고 맞춤형 미용 서비스를 받을 수 있습니다.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          등록하기
        </Button>
      </div>
    </form>
  );
}

// 상세한 수정 폼
function EditPetForm({
  pet,
  onClose,
}: {
  pet: (typeof mockPets)[0];
  onClose: () => void;
}) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic">기본 정보</TabsTrigger>
        <TabsTrigger value="personality">성격/행동</TabsTrigger>
        <TabsTrigger value="grooming">미용 관련</TabsTrigger>
        <TabsTrigger value="additional">추가 정보</TabsTrigger>
      </TabsList>

      <form className="space-y-6">
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DogIcon className="w-5 h-5" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input id="name" name="name" defaultValue={pet.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breed">품종</Label>
                <Input id="breed" name="breed" defaultValue={pet.breed} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">생년월일</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  defaultValue={pet.date_of_birth}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">성별</Label>
                <Select name="gender" defaultValue={pet.gender}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">체중 (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  defaultValue={pet.weight}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="is_neutered">중성화 여부</Label>
                <Select
                  name="is_neutered"
                  defaultValue={pet.is_neutered ? "true" : "false"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">중성화 완료</SelectItem>
                    <SelectItem value="false">중성화 안함</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5" />
                성격 및 행동 특성
              </CardTitle>
              <CardDescription>
                미용사가 반려견을 더 잘 이해하고 안전하게 미용할 수 있도록
                도와주는 정보입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperament">성격</Label>
                <Select name="temperament" defaultValue={pet.temperament || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="성격을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {temperamentOptions.map((temperament) => (
                      <SelectItem key={temperament} value={temperament}>
                        {temperament}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="biting_level">물림 정도</Label>
                <Select
                  name="biting_level"
                  defaultValue={pet.biting_level || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="물림 정도를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="separation_anxiety_level">분리불안 정도</Label>
                <Select
                  name="separation_anxiety_level"
                  defaultValue={pet.separation_anxiety_level || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="분리불안 정도를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grooming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5" />
                미용 관련 특성
              </CardTitle>
              <CardDescription>
                미용 후 반응이나 민감한 부위 등을 알려주시면 더 세심한 케어가
                가능합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post_grooming_itch_level">
                    미용 후 가려움 정도
                  </Label>
                  <Select
                    name="post_grooming_itch_level"
                    defaultValue={pet.post_grooming_itch_level || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="가려움 정도를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post_grooming_anxiety_level">
                    미용 후 불안 정도
                  </Label>
                  <Select
                    name="post_grooming_anxiety_level"
                    defaultValue={pet.post_grooming_anxiety_level || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="불안 정도를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sensitive_areas">민감한 부위</Label>
                <Input
                  id="sensitive_areas"
                  name="sensitive_areas"
                  defaultValue={pet.sensitive_areas || ""}
                  placeholder="예: 귀, 꼬리, 발톱, 배"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="health_issues">건강 이슈</Label>
                <Textarea
                  id="health_issues"
                  name="health_issues"
                  defaultValue={pet.health_issues || ""}
                  placeholder="알려진 건강 문제나 알러지가 있다면 적어주세요"
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="w-5 h-5" />
                추가 정보
              </CardTitle>
              <CardDescription>
                미용사님께 전달하고 싶은 특별한 정보가 있다면 적어주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="special_notes">특별 메모</Label>
                <Textarea
                  id="special_notes"
                  name="special_notes"
                  defaultValue={pet.pet_info?.special_notes || ""}
                  placeholder="예: 간식을 좋아해요, 특정 소리를 무서워해요, 목줄을 싫어해요 등"
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            수정하기
          </Button>
        </div>
      </form>
    </Tabs>
  );
}
