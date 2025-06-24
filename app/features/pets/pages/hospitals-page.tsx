import { useState } from "react";
import type { Route } from "./+types/hospitals-page";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

import {
  MapPin,
  Phone,
  Clock,
  Heart,
  Search,
  MapPinIcon,
  Loader2,
  RefreshCw,
  ExternalLink,
  Navigation,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useHospitalData } from "../hooks/use-hospital-data";
import type { HospitalFilter, Hospital } from "../types/hospital";

// 지역별 위치 상수
const REGIONS = {
  seoul: { lat: 37.5665, lng: 126.978, name: "서울특별시" },
  busan: { lat: 35.1796, lng: 129.0756, name: "부산광역시" },
  daegu: { lat: 35.8714, lng: 128.601, name: "대구광역시" },
  incheon: { lat: 37.4563, lng: 126.7052, name: "인천광역시" },
  gwangju: { lat: 35.1595, lng: 126.8526, name: "광주광역시" },
  daejeon: { lat: 36.3504, lng: 127.3845, name: "대전광역시" },
  ulsan: { lat: 35.5384, lng: 129.3114, name: "울산광역시" },
  gyeonggi: { lat: 37.4138, lng: 127.5183, name: "경기도" },
  gangwon: { lat: 37.8228, lng: 128.1555, name: "강원도" },
  chungbuk: { lat: 36.8, lng: 127.7, name: "충청북도" },
  chungnam: { lat: 36.5184, lng: 126.8, name: "충청남도" },
  jeonbuk: { lat: 35.7175, lng: 127.153, name: "전라북도" },
  jeonnam: { lat: 34.8679, lng: 126.991, name: "전라남도" },
  gyeongbuk: { lat: 36.4919, lng: 128.888, name: "경상북도" },
  gyeongnam: { lat: 35.4606, lng: 128.2132, name: "경상남도" },
  jeju: { lat: 33.4996, lng: 126.5312, name: "제주특별자치도" },
} as const;

// 상수 정의
const LOCATION_SUCCESS_TIMEOUT_MS = 3000;
const LOCATION_CHECK_INTERVAL_MS = 500;
const LOCATION_TIMEOUT_MS = 15000;

export async function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "동물병원 찾기" },
    { name: "description", content: "내 주변 동물병원을 찾아보세요" },
  ];
}

export default function HospitalsPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const {
    hospitals,
    filteredHospitals,
    loading,
    error,
    totalCount,
    openCount,
    loadedCount,
    totalDataCount,
    userLocation,
    setUserLocation,
    getCurrentLocation,
    applyFilters,
    loadMore,
    hasMore,
    refreshData,
  } = useHospitalData();

  // 검색 및 필터 상태
  const [searchTerm, setSearchTerm] = useState("");

  // UI 상태
  const [searching, setSearching] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);

  // 계산된 상태
  const hasSearchResults = filteredHospitals.length > 0;
  const hasSearchTerm = Boolean(searchTerm);
  const isUserLocationSet = Boolean(userLocation);

  // 네이버지도 URL 생성 함수
  function generateNaverMapUrl(hospital: Hospital): string {
    const searchQuery = hospital.name;
    return `https://map.naver.com/v5/search/${encodeURIComponent(searchQuery)}`;
  }

  // 필터 생성 함수
  function createFilters(): HospitalFilter {
    return {
      searchTerm: searchTerm.trim(),
    };
  }

  // 검색 실행
  async function handleSearch() {
    setSearching(true);
    try {
      const filters = createFilters();
      await applyFilters(filters);
    } catch (error) {
      console.error("검색 중 오류:", error);
    } finally {
      setSearching(false);
    }
  }

  // 성공 메시지 표시
  function showLocationSuccessMessage() {
    setLocationSuccess(true);
    setTimeout(() => setLocationSuccess(false), LOCATION_SUCCESS_TIMEOUT_MS);
  }

  // 자동 위치 가져오기
  function handleGetLocation() {
    setGettingLocation(true);
    setLocationSuccess(false);

    const originalLocation = userLocation;
    getCurrentLocation();

    // 위치 변경 감지
    const checkLocationTimer = setInterval(() => {
      if (userLocation && userLocation !== originalLocation) {
        showLocationSuccessMessage();
        setGettingLocation(false);
        clearInterval(checkLocationTimer);
      }
    }, LOCATION_CHECK_INTERVAL_MS);

    // 최대 시간 후 로딩 상태 해제
    setTimeout(() => {
      setGettingLocation(false);
      clearInterval(checkLocationTimer);
    }, LOCATION_TIMEOUT_MS);
  }

  // 지역 선택 및 위치 설정
  function selectRegion(regionKey: keyof typeof REGIONS) {
    const region = REGIONS[regionKey];
    console.log(`${region.name} 지역 선택:`, region);

    // 위치 설정
    setUserLocation({ lat: region.lat, lng: region.lng });
    showLocationSuccessMessage();
    setShowLocationInput(false);
  }

  // 에러 페이지 렌더링
  function renderErrorPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto p-6">
          <div className="text-center py-20">
            <div className="mb-8">
              <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                동물병원 찾기
              </h1>
              <p className="text-gray-600">우리 지역의 동물병원을 찾아보세요</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="text-red-600 mb-4">
                오류가 발생했습니다: {error}
              </div>
              <Button onClick={() => window.location.reload()}>
                다시 시도
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 헤더 섹션 렌더링
  function renderHeader() {
    return (
      <header className="text-center py-12 mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-12 w-12 text-red-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">동물병원 찾기</h1>
        </div>

        <div className="space-y-2 mb-6">
          <p className="text-lg text-gray-600">
            전국 {totalDataCount.toLocaleString()}개 중{" "}
            {loadedCount.toLocaleString()}개 동물병원 로드됨
          </p>
        </div>

        <Button
          variant="outline"
          onClick={refreshData}
          disabled={loading}
          className="bg-white hover:bg-gray-50 border-gray-200"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          데이터 새로고침
        </Button>
      </header>
    );
  }

  // 알림 메시지 렌더링
  function renderNotifications() {
    return (
      <div className="space-y-4 mb-8">
        {/* 에러 알림 */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-red-800 text-sm">
                <strong>오류:</strong> {error}
              </p>
            </div>
          </div>
        )}

        {/* 위치 성공 알림 */}
        {locationSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <p className="text-green-800 text-sm">
                <strong>위치 설정 완료:</strong> 주변 병원으로 자동
                필터링됩니다.
              </p>
            </div>
          </div>
        )}

        {/* 위치 설정 안내 */}
        {!isUserLocationSet && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-600" />
              <p className="text-blue-800 text-sm">
                <strong>위치 설정 안내:</strong> 정확한 검색을 위해 위치를
                설정해주세요.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 통계 카드 렌더링
  function renderStatsCards() {
    const statsData = [
      {
        title: "로드된 병원",
        value: loadedCount,
        subtext: `전체 ${totalDataCount.toLocaleString()}개 중`,
        icon: Heart,
        color: "blue",
      },
      {
        title: "정상 운영",
        value: openCount,
        subtext: "폐업하지 않은 병원",
        icon: Clock,
        color: "green",
      },
      {
        title: "검색 결과",
        value: filteredHospitals.length,
        subtext: "필터 적용",
        icon: Search,
        color: "blue",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white border shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <div className={`text-3xl font-bold text-${stat.color}-600`}>
                    {stat.value.toLocaleString()}
                  </div>
                  {stat.subtext && (
                    <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                  )}
                </div>
                <div
                  className={`h-12 w-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}
                >
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 내 위치 카드 */}
        <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  내 위치
                </p>
                {isUserLocationSet && userLocation && (
                  <div className="text-xs text-gray-500 mb-2">
                    위도: {userLocation.lat.toFixed(4)}
                    <br />
                    경도: {userLocation.lng.toFixed(4)}
                  </div>
                )}

                {/* 위치 설정 버튼 */}
                <div className="flex gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGetLocation}
                    disabled={gettingLocation}
                    className="bg-white hover:bg-gray-50 border-gray-200"
                  >
                    {gettingLocation ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <MapPinIcon className="h-4 w-4 mr-2" />
                    )}
                    자동
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLocationInput(!showLocationInput)}
                    className="bg-white hover:bg-gray-50 border-gray-200"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    지역선택
                  </Button>
                </div>

                {/* 지역 선택 */}
                {showLocationInput && (
                  <div className="mt-3 space-y-2">
                    <Select
                      value=""
                      onValueChange={(value) => {
                        const regionEntry = Object.entries(REGIONS).find(
                          ([_, region]) => region.name === value
                        );
                        if (regionEntry) {
                          selectRegion(regionEntry[0] as keyof typeof REGIONS);
                        }
                      }}
                    >
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue placeholder="지역을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(REGIONS).map((region) => (
                          <SelectItem key={region.name} value={region.name}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center ml-2">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 검색 및 필터 섹션 렌더링
  function renderSearchAndFilters() {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 mb-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group">
                <Search className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                동물병원 검색
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium mt-1">
                병원명이나 주소로 원하는 동물병원을 찾아보세요
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 검색어 입력 */}
          <div className="relative">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="병원명 또는 주소로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={searching}>
                {searching ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                {searching ? "검색중..." : "검색"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 병원 카드 렌더링
  function renderHospitalCard(hospital: Hospital) {
    return (
      <Card
        key={hospital.id}
        className="bg-white border shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {hospital.address}
                </div>
                {hospital.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {hospital.phone}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right space-y-2">
              {hospital.distance && (
                <div className="text-sm text-gray-500">
                  {hospital.distance}km
                </div>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  window.open(generateNaverMapUrl(hospital), "_blank")
                }
                className="text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                네이버지도
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 병원 목록 렌더링
  function renderHospitalList() {
    return (
      <div className="space-y-6">
        {/* 검색 결과 안내 */}
        {hasSearchResults && hasSearchTerm && (
          <div className="mb-6 p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600" />
              <p className="text-blue-800 text-sm">
                <strong>"{searchTerm}"</strong> 검색 결과: 로드된{" "}
                {loadedCount.toLocaleString()}개 병원 중{" "}
                {filteredHospitals.length.toLocaleString()}개 병원이
                발견되었습니다.
              </p>
            </div>
          </div>
        )}

        {/* 병원 카드들 */}
        {filteredHospitals.map(renderHospitalCard)}

        {/* 더 보기 버튼 */}
        {hasMore && !loading && (
          <div className="text-center py-8">
            <Button
              onClick={loadMore}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Loader2 className="h-4 w-4 mr-2" />더 많은 병원 보기 (
              {(totalDataCount - loadedCount).toLocaleString()}개 남음)
            </Button>
          </div>
        )}

        {/* 결과 없음 */}
        {!hasSearchResults && !loading && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-600 mb-6 text-lg">
                검색 조건에 맞는 병원이 없습니다.
              </div>
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="bg-white hover:bg-gray-50 border-gray-200"
              >
                검색어 초기화
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 에러 시 에러 페이지 반환
  if (error) {
    return renderErrorPage();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {renderHeader()}

        {/* 로딩 상태 */}
        {loading && (
          <div className="mt-8 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>
              {loadedCount === 0
                ? "병원 데이터를 불러오는 중..."
                : `${loadedCount.toLocaleString()}개 병원 로드됨...`}
            </span>
          </div>
        )}

        {renderNotifications()}
        {renderStatsCards()}
        {renderSearchAndFilters()}
        {renderHospitalList()}
      </div>
    </div>
  );
}
