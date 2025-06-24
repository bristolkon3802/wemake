import { memo, useState } from "react";
import { Baby, Calendar, Dog, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import PuppyManagementForm, {
  type Puppy,
  type PuppyGrowthRecord,
} from "~/features/pets/forms/puppy-management-form";

interface BirthRecord {
  recordId: string;
  birthDate: string;
  mother: { id: number; name: string; breed: string; gender: "female" };
  father: { id: number; name: string; breed: string; gender: "male" };
  puppies: Puppy[];
}

// 샘플 데이터 (실제로는 loader에서 `recordId`를 이용해 DB에서 가져와야 함)
const SAMPLE_PETS = [
  { id: 1, name: "사랑이", breed: "골든 리트리버", gender: "female" },
  { id: 2, name: "용맹이", breed: "골든 리트리버", gender: "male" },
] as const;

const SAMPLE_BIRTH_RECORD: BirthRecord = {
  recordId: "rec123",
  birthDate: "2024-05-20T14:00:00",
  mother: SAMPLE_PETS[0],
  father: SAMPLE_PETS[1],
  puppies: [
    {
      id: 101,
      name: "첫째",
      gender: "male",
      birth_weight: "350",
      growthRecords: [
        {
          id: 1001,
          date: "2024-05-21",
          morningWeight: "360",
          afternoonWeight: "365",
          notes: "활발함",
        },
      ],
    },
    {
      id: 102,
      name: "둘째",
      gender: "female",
      birth_weight: "330",
      growthRecords: [],
    },
  ],
};

function createNewPuppy(): Puppy {
  return {
    id: Date.now(),
    name: "",
    gender: "unknown",
    birth_weight: "",
    growthRecords: [],
  };
}

function createNewGrowthRecord(): PuppyGrowthRecord {
  return {
    id: Date.now(),
    date: new Date().toISOString().split("T")[0],
    morningWeight: "",
    afternoonWeight: "",
    notes: "",
  };
}

export default memo(function BirthRecordDetailPage() {
  // 실제 앱에서는 useLoaderData를 통해 데이터를 받아옴
  const birthRecord = SAMPLE_BIRTH_RECORD;
  const [puppies, setPuppies] = useState<Puppy[]>(birthRecord.puppies);

  // PuppyManagementForm에 전달할 핸들러 함수들
  // 이 함수들은 useFetcher를 사용하여 action 함수를 호출하고 DB를 업데이트해야 함
  const addPuppy = () => {
    setPuppies((prev) => [...prev, createNewPuppy()]);
    // fetcher.submit({ intent: 'addPuppy', recordId }, { method: 'POST' });
  };

  const removePuppy = (puppyId: number) => {
    setPuppies((prev) => prev.filter((p) => p.id !== puppyId));
    // fetcher.submit({ intent: 'removePuppy', puppyId }, { method: 'POST' });
  };

  const handlePuppyChange = (
    puppyId: number,
    field: keyof Omit<Puppy, "id" | "growthRecords">,
    value: string
  ) => {
    setPuppies((prev) =>
      prev.map((p) => (p.id === puppyId ? { ...p, [field]: value } : p))
    );
    // 여기에 debounce를 적용하여 일정 시간 후 DB 업데이트 action을 호출할 수 있음
  };

  const addGrowthRecord = (puppyId: number) => {
    setPuppies((prev) =>
      prev.map((p) =>
        p.id === puppyId
          ? {
              ...p,
              growthRecords: [...p.growthRecords, createNewGrowthRecord()],
            }
          : p
      )
    );
    // fetcher.submit({ intent: 'addGrowthRecord', puppyId }, { method: 'POST' });
  };

  const removeGrowthRecord = (puppyId: number, recordId: number) => {
    setPuppies((prev) =>
      prev.map((p) =>
        p.id === puppyId
          ? {
              ...p,
              growthRecords: p.growthRecords.filter((r) => r.id !== recordId),
            }
          : p
      )
    );
    // fetcher.submit({ intent: 'removeGrowthRecord', recordId }, { method: 'POST' });
  };

  const handleGrowthRecordChange = (
    puppyId: number,
    recordId: number,
    field: keyof Omit<PuppyGrowthRecord, "id">,
    value: string
  ) => {
    setPuppies((prev) =>
      prev.map((p) =>
        p.id === puppyId
          ? {
              ...p,
              growthRecords: p.growthRecords.map((r) =>
                r.id === recordId ? { ...r, [field]: value } : r
              ),
            }
          : p
      )
    );
    // 여기에 debounce를 적용하여 DB 업데이트 action을 호출
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-slate-900 shadow-xl border-0 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
              <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-inner">
                <Baby className="h-8 w-8 text-blue-500" />
              </div>
              <span>출산 기록 상세</span>
            </CardTitle>
            <CardDescription className="pt-2 pl-16 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(birthRecord.birthDate).toLocaleString("ko-KR")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base pl-16">
            <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="font-semibold">어미견:</span>
              <span>
                {birthRecord.mother.name} ({birthRecord.mother.breed})
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <Dog className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">아비견:</span>
              <span>
                {birthRecord.father.name} ({birthRecord.father.breed})
              </span>
            </div>
          </CardContent>
        </Card>

        <PuppyManagementForm
          puppies={puppies}
          onAddPuppy={addPuppy}
          onRemovePuppy={removePuppy}
          onPuppyChange={handlePuppyChange}
          onAddGrowthRecord={addGrowthRecord}
          onRemoveGrowthRecord={removeGrowthRecord}
          onGrowthRecordChange={handleGrowthRecordChange}
        />
      </div>
    </div>
  );
});
