import type { Route } from "./+types/add-appointment-page";
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
import { Textarea } from "~/common/components/ui/textarea";
import { Calendar } from "~/common/components/ui/calendar";
import {
  groomingServiceTypeEnum,
  groomingFaceStyleEnum,
  groomingFootStyleEnum,
  groomingBodyLengthEnum,
  groomingLegLengthEnum,
  groomingEarStyleEnum,
  groomingTailStyleEnum,
  groomingLevelEnum,
  groomingPetConditionEnum,
} from "../schema";
import { Separator } from "~/common/components/ui/separator";
import {
  ScissorsIcon,
  CalendarIcon,
  DogIcon,
  SparklesIcon,
  ClockIcon,
  MessageSquareIcon,
  InfoIcon,
} from "lucide-react";
import { Badge } from "~/common/components/ui/badge";

// 임시 데이터
const userPets = [
  { id: "pet_1", name: "초코", breed: "말티즈", age: "3살" },
  { id: "pet_2", name: "라떼", breed: "푸들", age: "5살" },
];

const serviceOptions = groomingServiceTypeEnum.enumValues;
const faceStyleOptions = groomingFaceStyleEnum.enumValues;
const footStyleOptions = groomingFootStyleEnum.enumValues;
const earStyleOptions = groomingEarStyleEnum.enumValues;
const tailStyleOptions = groomingTailStyleEnum.enumValues;
const mattingLevelOptions = groomingLevelEnum.enumValues;
const petConditionOptions = groomingPetConditionEnum.enumValues;

// 서비스 설명
const serviceDescriptions = {
  목욕: "기본적인 목욕 및 건조 서비스입니다.",
  목욕_기본: "목욕과 함께 발톱 정리, 귀 청소 등 기본 케어를 제공합니다.",
  클리핑: "클리퍼(바리깡)를 사용하여 전체적으로 짧고 깔끔한 스타일을 만듭니다.",
  스포팅: "몸은 짧게, 다리는 길게 남겨 활동적인 느낌을 주는 스타일입니다.",
  가위컷:
    "가위만을 사용하여 섬세하고 디테일한 디자인을 완성하는 프리미엄 미용입니다.",
  기타: "미용사님과 상담 후 결정하는 맞춤형 서비스입니다.",
};

// 시간 옵션
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

// 서비스별 스타일 옵션 설정
const styleConfig = {
  목욕_기본: {
    face_style: faceStyleOptions,
    foot_style: ["다듬기", "닭발"],
  },
  클리핑: {
    face_style: faceStyleOptions,
    body_length: ["2mm", "3mm", "5mm", "1cm", "2cm"],
    leg_length: ["2mm", "3mm", "5mm", "1cm", "2cm"],
    foot_style: ["없음", "닭발", "양말", "부츠", "방울"],
    ear_style: earStyleOptions,
    tail_style: tailStyleOptions,
  },
  스포팅: {
    face_style: faceStyleOptions,
    body_length: ["3mm", "5mm", "1cm", "2cm"],
    leg_length: ["2cm", "가위컷-짧게", "가위컷-길게"],
    foot_style: ["없음", "닭발", "양말", "부츠", "방울"],
    ear_style: earStyleOptions,
    tail_style: tailStyleOptions,
  },
  가위컷: {
    face_style: faceStyleOptions,
    body_length: ["짧게", "보통", "길게"],
    leg_length: ["짧게", "보통", "길게"],
    foot_style: ["없음", "닭발", "양말", "부츠", "방울"],
    ear_style: earStyleOptions,
    tail_style: tailStyleOptions,
  },
};

const styleLabelMapping = {
  face_style: "얼굴 스타일",
  body_length: "몸 털 길이",
  leg_length: "다리 털 길이",
  foot_style: "발 모양",
  ear_style: "귀 모양",
  tail_style: "꼬리 모양",
};

export function loader({ request }: Route.LoaderArgs) {
  // 실제 구현에서는 여기서 사용자의 반려견 목록을 불러옵니다.
  return { userPets };
}

export function action({ request }: Route.ActionArgs) {
  // 폼 제출 로직은 여기에 구현됩니다.
  return {};
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: "미용 예약하기" }];
}

export default function AddAppointmentPage() {
  const [serviceType, setServiceType] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPet, setSelectedPet] = useState<string | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const availableStyles = serviceType
    ? styleConfig[serviceType as keyof typeof styleConfig]
    : null;

  const selectedPetInfo = userPets.find((pet) => pet.id === selectedPet);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <ScissorsIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            미용 예약하기
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            사랑하는 반려견을 위한 완벽한 미용 서비스를 예약하세요. 전문
            미용사가 정성껏 케어해드립니다.
          </p>
        </div>

        <form className="space-y-6">
          {/* 반려견 선택 카드 */}
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <DogIcon className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl">1. 반려견 선택</CardTitle>
              </div>
              <CardDescription>
                미용을 받을 반려견을 선택해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userPets.map((pet) => (
                  <div
                    key={pet.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                      selectedPet === pet.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedPet(pet.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pet.breed} • {pet.age}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                        <DogIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <input
                type="hidden"
                name="grooming_pet_id"
                value={selectedPet || ""}
              />
            </CardContent>
          </Card>

          {/* 서비스 선택 카드 */}
          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-xl">2. 서비스 선택</CardTitle>
              </div>
              <CardDescription>
                원하시는 미용 서비스를 선택해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceOptions.map((service) => (
                  <div
                    key={service}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300 flex flex-col justify-between ${
                      serviceType === service
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setServiceType(service)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {service.replace(/_/g, " ")}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {service === "목욕_기본"
                            ? "기본"
                            : service === "가위컷"
                            ? "프리미엄"
                            : "표준"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {
                          serviceDescriptions[
                            service as keyof typeof serviceDescriptions
                          ]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <input
                type="hidden"
                name="service_type"
                value={serviceType || ""}
              />
            </CardContent>
          </Card>

          {/* 날짜 및 시간 선택 카드 */}
          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-green-600" />
                <CardTitle className="text-xl">3. 날짜 및 시간 선택</CardTitle>
              </div>
              <CardDescription>
                예약을 원하는 날짜와 시간을 선택해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    날짜 선택
                  </Label>
                  <div className="w-full border-2 border-gray-200 rounded-md p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="w-full mx-auto"
                      classNames={{
                        months: "flex w-full justify-center",
                        month: "w-full",
                        caption:
                          "flex justify-center pt-1 relative items-center w-full",
                        table: "w-full border-collapse",
                        head_row: "flex w-full py-4",
                        head_cell:
                          "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] flex-1 text-center",
                        row: "flex w-full mt-2",
                        cell: "text-center text-sm p-0 relative flex-1 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                      }}
                      disabled={(date) =>
                        !date ||
                        date < new Date() ||
                        date < new Date("1900-01-01")
                      }
                    />
                  </div>
                  <input
                    type="hidden"
                    name="appointment_date"
                    value={date?.toISOString().split("T")[0] || ""}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    시간 선택
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-80 overflow-y-auto p-1">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`p-3 text-sm border-2 rounded-lg transition-all hover:border-green-300 ${
                          selectedTime === time
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    name="appointment_time"
                    value={selectedTime || ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 스타일 선택 카드 */}
          {availableStyles && (
            <Card className="border-2 hover:border-pink-200 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <ScissorsIcon className="w-6 h-6 text-pink-600" />
                  <CardTitle className="text-xl">4. 스타일 선택</CardTitle>
                </div>
                <CardDescription>
                  선택한 서비스에 맞는 세부 스타일을 선택해주세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(availableStyles).map(([key, options]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="text-base font-medium">
                        {styleLabelMapping[
                          key as keyof typeof styleLabelMapping
                        ] || key}
                      </Label>
                      <Select name={key}>
                        <SelectTrigger className="border-2 hover:border-pink-300 transition-colors">
                          <SelectValue placeholder="선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {(options as string[]).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 반려견 컨디션 정보 카드 */}
          <Card className="border-2 hover:border-orange-200 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <InfoIcon className="w-6 h-6 text-orange-600" />
                <CardTitle className="text-xl">5. 반려견 정보</CardTitle>
              </div>
              <CardDescription>
                미용 당일 반려견의 상태를 알려주시면 안전한 미용에 도움이
                됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="matting_level"
                    className="text-base font-medium"
                  >
                    털 엉킴 정도
                  </Label>
                  <Select name="matting_level">
                    <SelectTrigger className="border-2 hover:border-orange-300 transition-colors">
                      <SelectValue placeholder="엉킴 정도를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {mattingLevelOptions.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="pet_condition"
                    className="text-base font-medium"
                  >
                    당일 컨디션
                  </Label>
                  <Select name="pet_condition">
                    <SelectTrigger className="border-2 hover:border-orange-300 transition-colors">
                      <SelectValue placeholder="컨디션을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {petConditionOptions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="pet_condition_notes"
                  className="text-base font-medium"
                >
                  컨디션 관련 참고사항
                </Label>
                <Textarea
                  id="pet_condition_notes"
                  name="pet_condition_notes"
                  placeholder="선택한 컨디션에 대해 추가로 전달할 내용이 있다면 적어주세요. (예: 예민하지만 간식을 주면 괜찮아요)"
                  className="border-2 hover:border-orange-300 transition-colors min-h-24"
                />
              </div>
            </CardContent>
          </Card>

          {/* 요청사항 카드 */}
          <Card className="border-2 hover:border-indigo-200 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <MessageSquareIcon className="w-6 h-6 text-indigo-600" />
                <CardTitle className="text-xl">6. 특별 요청사항</CardTitle>
              </div>
              <CardDescription>
                미용사님께 특별히 전달하고 싶은 내용이 있다면 적어주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="special_requests"
                name="special_requests"
                placeholder="특별한 요청사항이나 주의사항을 자세히 적어주세요. (예: 알러지가 있어서 특정 샴푸를 사용해주세요, 발톱은 최대한 짧게 깎아주세요 등)"
                className="border-2 hover:border-indigo-300 transition-colors min-h-24"
              />
            </CardContent>
          </Card>

          {/* 제출 버튼 */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              className="px-12 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
            >
              <ScissorsIcon className="w-5 h-5 mr-2" />
              예약 신청하기
            </Button>
          </div>
        </form>

        {/* 예약 정보 요약 (선택된 정보가 있을 때만 표시) */}
        {(selectedPet || serviceType || date || selectedTime) && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">
                예약 정보 요약
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {selectedPetInfo && (
                  <div className="flex items-center gap-2">
                    <DogIcon className="w-4 h-4 text-blue-700" />
                    <span className="font-medium text-blue-700">
                      반려견:
                    </span>{" "}
                    {selectedPetInfo.name} ({selectedPetInfo.breed})
                  </div>
                )}
                {serviceType && (
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-blue-700" />
                    <span className="font-medium text-blue-700">
                      서비스:
                    </span>{" "}
                    {serviceType.replace(/_/g, " ")}
                  </div>
                )}
                {date && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-blue-700" />
                    <span className="font-medium text-blue-700">
                      날짜:
                    </span>{" "}
                    {date.toLocaleDateString("ko-KR")}
                  </div>
                )}
                {selectedTime && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-blue-700" />
                    <span className="font-medium text-blue-700">
                      시간:
                    </span>{" "}
                    {selectedTime}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
