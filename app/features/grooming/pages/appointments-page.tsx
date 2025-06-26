import type { Route } from "./+types/appointments-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";
import { Badge } from "~/common/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import { Button } from "~/common/components/ui/button";
import {
  MoreHorizontal,
  CalendarIcon,
  ClockIcon,
  DogIcon,
  PlusIcon,
  ScissorsIcon,
  WalletIcon,
  MessageSquareIcon,
  WindIcon,
  SmileIcon,
} from "lucide-react";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import { cn } from "~/lib/utils";
import {
  groomingAppointmentStatusEnum,
  groomingLevelEnum,
  groomingPetConditionEnum,
  groomingServiceTypeEnum,
} from "../schema";

type Appointment = {
  appointment_id: string;
  user_id: string;
  grooming_pet_id: string;
  pet: {
    name: string;
    breed: string;
    weight: string;
  };
  appointment_datetime: string;
  status: (typeof groomingAppointmentStatusEnum.enumValues)[number];
  service_type: (typeof groomingServiceTypeEnum.enumValues)[number];
  pet_condition?: (typeof groomingPetConditionEnum.enumValues)[number];
  matting_level?: (typeof groomingLevelEnum.enumValues)[number];
  price?: string;
  duration_minutes?: number;
  special_requests?: string;
  notes_from_user?: string;
  notes_from_groomer?: string;
  created_at: string;
};

// 서비스 타입별 아이콘과 설명
const serviceInfo = {
  목욕: {
    icon: "🛁",
    description: "기본 목욕",
    color: "bg-blue-100 text-blue-800",
  },
  목욕_기본: {
    icon: "✨",
    description: "목욕 + 기본 미용",
    color: "bg-cyan-100 text-cyan-800",
  },
  클리핑: {
    icon: "✂️",
    description: "클리핑",
    color: "bg-purple-100 text-purple-800",
  },
  스포팅: {
    icon: "🎯",
    description: "스포팅 컷",
    color: "bg-green-100 text-green-800",
  },
  가위컷: {
    icon: "✂️",
    description: "가위컷",
    color: "bg-orange-100 text-orange-800",
  },
  기타: {
    icon: "🔧",
    description: "기타 서비스",
    color: "bg-gray-100 text-gray-800",
  },
};

// 임시 예약 데이터 (실제 스키마에 맞게 수정)
const mockAppointments: Appointment[] = [
  {
    appointment_id: "appt_1",
    user_id: "user_1",
    grooming_pet_id: "pet_1",
    pet: { name: "초코", breed: "말티즈", weight: "3.5" },
    appointment_datetime: "2024-08-15T14:00:00Z",
    service_type: "클리핑",
    status: "예약됨",
    pet_condition: "좋음",
    matting_level: "낮음",
    price: "45000",
    duration_minutes: 120,
    special_requests: "발톱 깎기 포함해주세요",
    notes_from_user: "처음 미용이라 긴장할 수 있어요",
    created_at: "2024-08-01T10:00:00Z",
  },
  {
    appointment_id: "appt_2",
    user_id: "user_1",
    grooming_pet_id: "pet_2",
    pet: { name: "라떼", breed: "푸들", weight: "5.2" },
    appointment_datetime: "2024-08-10T11:00:00Z",
    service_type: "스포팅",
    status: "완료",
    pet_condition: "최상",
    matting_level: "낮음",
    price: "55000",
    duration_minutes: 150,
    notes_from_groomer: "매우 순하고 협조적이었습니다. 털 상태 좋음.",
    created_at: "2024-07-25T15:30:00Z",
  },
  {
    appointment_id: "appt_3",
    user_id: "user_1",
    grooming_pet_id: "pet_3",
    pet: { name: "쿠키", breed: "시바견", weight: "8.1" },
    appointment_datetime: "2024-08-20T16:00:00Z",
    service_type: "가위컷",
    status: "예약 확정",
    pet_condition: "보통",
    matting_level: "중간",
    price: "50000",
    duration_minutes: 135,
    special_requests: "얼굴 둥글게 잘라주세요",
    created_at: "2024-08-05T09:15:00Z",
  },
  {
    appointment_id: "appt_4",
    user_id: "user_1",
    grooming_pet_id: "pet_1",
    pet: { name: "초코", breed: "말티즈", weight: "3.5" },
    appointment_datetime: "2024-07-25T10:00:00Z",
    service_type: "목욕_기본",
    status: "취소",
    created_at: "2024-07-15T12:00:00Z",
  },
  {
    appointment_id: "appt_5",
    user_id: "user_1",
    grooming_pet_id: "pet_4",
    pet: { name: "또리", breed: "요크셔테리어", weight: "2.8" },
    appointment_datetime: "2024-08-18T13:00:00Z",
    service_type: "목욕",
    status: "예약 확정",
    pet_condition: "좋음",
    matting_level: "낮음",
    price: "25000",
    duration_minutes: 60,
    created_at: "2024-08-03T16:45:00Z",
  },
];

const statusMap = {
  예약됨: {
    text: "예약됨",
    className: "bg-blue-100 text-blue-800",
    icon: "📅",
  },
  "예약 확정": {
    text: "예약 확정",
    className: "bg-green-100 text-green-800",
    icon: "✅",
  },
  완료: { text: "완료", className: "bg-gray-100 text-gray-800", icon: "🎉" },
  취소: { text: "취소", className: "bg-red-100 text-red-800", icon: "❌" },
  노쇼: {
    text: "노쇼",
    className: "bg-yellow-100 text-yellow-800",
    icon: "⚠️",
  },
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

export function loader({ request }: Route.LoaderArgs) {
  return { appointments: mockAppointments };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: "예약 내역" }];
}

export default function AppointmentsPage({ loaderData }: Route.ComponentProps) {
  const { appointments } = loaderData;
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredAppointments = useMemo(() => {
    let filtered = [...appointments];

    // 탭 필터링
    if (activeTab !== "all") {
      filtered = filtered.filter((appt: Appointment) => {
        if (activeTab === "upcoming") {
          return appt.status === "예약됨" || appt.status === "예약 확정";
        }
        return appt.status === activeTab;
      });
    }

    // 정렬
    filtered.sort((a, b) => {
      const dateA = new Date(a.appointment_datetime).getTime();
      const dateB = new Date(b.appointment_datetime).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [appointments, activeTab, sortOrder]);

  const upcomingCount = appointments.filter(
    (appt: Appointment) =>
      appt.status === "예약됨" || appt.status === "예약 확정"
  ).length;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
      }),
      time: date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const formatPrice = (price?: string) => {
    if (!price) return null;
    return new Intl.NumberFormat("ko-KR").format(parseInt(price));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            미용 예약 내역
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            반려견의 미용 예약을 관리하고 진행 상황을 확인하세요.
          </p>
        </div>

        {/* 액션 바 */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto"
          >
            <Link to="/grooming/appointments/add">
              <PlusIcon className="w-5 h-5 mr-2" />새 예약하기
            </Link>
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {upcomingCount}
              </div>
              <p className="text-sm text-muted-foreground">예정된 예약</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {
                  appointments.filter((a: Appointment) => a.status === "완료")
                    .length
                }
              </div>
              <p className="text-sm text-muted-foreground">완료된 미용</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">
                {appointments.length}
              </div>
              <p className="text-sm text-muted-foreground">전체 예약</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(appointments.map((a: Appointment) => a.pet.name)).size}
              </div>
              <p className="text-sm text-muted-foreground">등록된 반려견</p>
            </CardContent>
          </Card>
        </div>

        {/* 탭 필터 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur">
            <TabsTrigger value="all" className="data-[state=active]:bg-white">
              전체 ({appointments.length})
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-white"
            >
              예정 ({upcomingCount})
            </TabsTrigger>
            <TabsTrigger value="완료" className="data-[state=active]:bg-white">
              완료 (
              {
                appointments.filter((a: Appointment) => a.status === "완료")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="취소" className="data-[state=active]:bg-white">
              취소 (
              {
                appointments.filter((a: Appointment) => a.status === "취소")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="노쇼" className="data-[state=active]:bg-white">
              노쇼 (
              {
                appointments.filter((a: Appointment) => a.status === "노쇼")
                  .length
              }
              )
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 예약 목록 */}
        {filteredAppointments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appt: Appointment) => {
              const dateTime = formatDateTime(appt.appointment_datetime);
              const serviceConfig = serviceInfo[appt.service_type];
              const statusConfig = statusMap[appt.status];

              // 예약일과 현재 날짜를 비교하기 위한 설정
              const appointmentDate = new Date(appt.appointment_datetime);
              const now = new Date();
              // 날짜만 비교하기 위해 시간은 0으로 설정
              const appointmentDay = new Date(
                appointmentDate.getFullYear(),
                appointmentDate.getMonth(),
                appointmentDate.getDate()
              );
              const today = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              // 2일(밀리초)
              const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
              const isCancelableByDate =
                appointmentDay.getTime() - today.getTime() > twoDaysInMs;

              const canEdit = appt.status === "예약됨";
              const canCancel =
                (appt.status === "예약됨" || appt.status === "예약 확정") &&
                isCancelableByDate;
              const showMenu = canEdit || canCancel;

              return (
                <Card
                  key={appt.appointment_id}
                  className="hover:shadow-lg transition-all duration-200 border-2 hover:border-purple-200 bg-white/80 backdrop-blur"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                          <DogIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {appt.pet.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            {appt.pet.breed} • {appt.pet.weight}kg
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn("text-xs", statusConfig.className)}
                        >
                          {statusConfig.icon} {statusConfig.text}
                        </Badge>
                        {showMenu && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">메뉴 열기</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {canEdit && (
                                <DropdownMenuItem asChild>
                                  <Link
                                    to={`/grooming/appointments/${appt.appointment_id}/edit`}
                                  >
                                    예약 수정
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {canCancel && (
                                <DropdownMenuItem className="text-red-600">
                                  예약 취소
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* 날짜 및 시간 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {dateTime.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{dateTime.time}</span>
                      </div>
                    </div>

                    <hr />

                    {/* 당일 상태 정보 */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      {appt.pet_condition && (
                        <div className="flex items-center gap-2">
                          <SmileIcon className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">당일 컨디션</p>
                            <p className="font-medium">{appt.pet_condition}</p>
                          </div>
                        </div>
                      )}
                      {appt.matting_level && (
                        <div className="flex items-center gap-2">
                          <WindIcon className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">털 엉킴</p>
                            <Badge
                              className={cn(
                                "font-medium",
                                getLevelColor(appt.matting_level)
                              )}
                            >
                              {appt.matting_level}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 서비스 정보 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ScissorsIcon className="w-4 h-4 text-muted-foreground" />
                        <Badge className={cn("text-xs", serviceConfig.color)}>
                          {serviceConfig.icon} {serviceConfig.description}
                        </Badge>
                      </div>
                      {appt.duration_minutes && (
                        <span className="text-xs text-muted-foreground">
                          {appt.duration_minutes}분
                        </span>
                      )}
                    </div>

                    {/* 가격 */}
                    {appt.price && (
                      <div className="flex items-center gap-2">
                        <WalletIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-green-600">
                          {formatPrice(appt.price)}원
                        </span>
                      </div>
                    )}

                    {/* 특별 요청사항 */}
                    {appt.special_requests && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MessageSquareIcon className="w-4 h-4 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-blue-700">
                              특별 요청
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              {appt.special_requests}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 사용자 메모 */}
                    {appt.notes_from_user && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MessageSquareIcon className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-yellow-700">
                              내 메모
                            </p>
                            <p className="text-xs text-yellow-600 mt-1">
                              {appt.notes_from_user}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 미용사 피드백 */}
                    {appt.notes_from_groomer && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MessageSquareIcon className="w-4 h-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-green-700">
                              미용사 피드백
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              {appt.notes_from_groomer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-16 bg-white/50 backdrop-blur">
            <CardContent>
              <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                해당 상태의 예약 내역이 없습니다
              </h3>
              <p className="text-muted-foreground mb-6">
                새로운 예약을 만들어보세요
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Link to="/grooming/appointments/add">
                  <PlusIcon className="w-4 h-4 mr-2" />첫 예약하기
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
