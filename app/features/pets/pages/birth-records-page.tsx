import { memo } from "react";
import { ChevronLeft, FileText } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent } from "~/common/components/ui/card";
import { Tabs, TabsContent } from "~/common/components/ui/tabs";
import PuppyManagementForm from "~/features/pets/forms/puppy-management-form";
import { BREEDING_TYPE_OPTIONS, SAMPLE_PETS } from "~/features/pets/constants";
import { BirthRecordHeader } from "~/features/pets/components/birth-record-header";
import { BirthRecordList } from "~/features/pets/components/birth-record-list";
import { BirthRecordTabs } from "~/features/pets/components/birth-record-tabs";
import { BasicInfoTab } from "~/features/pets/components/basic-info-tab";
import { PostCareTab } from "~/features/pets/components/post-care-tab";
import { useBirthRecordForm } from "~/features/pets/hooks/use-birth-record-form";

export default memo(function BirthRecordsPage() {
  const {
    view,
    selectedRecord,
    puppies,
    birthType,
    selectedMother,
    selectedFather,
    selectedAdoptiveMother,
    selectedAdoptiveFather,
    externalStud,
    externalMotherInfo,
    setBirthType,
    setSelectedMother,
    setSelectedFather,
    setSelectedAdoptiveMother,
    setSelectedAdoptiveFather,
    setExternalStud,
    setExternalMotherInfo,
    handleCreateNew,
    handleEdit,
    handleBackToList,
    addPuppy,
    removePuppy,
    handlePuppyChange,
    addGrowthRecord,
    removeGrowthRecord,
    handleGrowthRecordChange,
  } = useBirthRecordForm();

  const getPetNameById = (id: number) => {
    return SAMPLE_PETS.find((p) => p.id === id)?.name || "정보 없음";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <BirthRecordHeader
        view={view}
        selectedRecord={selectedRecord}
        birthType={birthType}
        onCreateNew={handleCreateNew}
      />

      <div className="container -mt-16 pb-20 mx-auto">
        {view === "list" ? (
          <BirthRecordList onEdit={handleEdit} />
        ) : (
          <Card className="backdrop-blur-md bg-white/95 dark:bg-gray-800/95 shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={handleBackToList}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                목록으로 돌아가기
              </Button>
            </div>
            <Tabs
              defaultValue="basic"
              className="w-full"
              key={selectedRecord ? `record-${selectedRecord.id}` : "new"}
            >
              <BirthRecordTabs birthType={birthType} />

              <div className="p-8 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50">
                <TabsContent value="basic">
                  <BasicInfoTab
                    birthType={birthType}
                    selectedMother={selectedMother}
                    selectedFather={selectedFather}
                    selectedAdoptiveMother={selectedAdoptiveMother}
                    selectedAdoptiveFather={selectedAdoptiveFather}
                    externalStud={externalStud}
                    externalMotherInfo={externalMotherInfo}
                    puppiesLength={puppies.length}
                    onBirthTypeChange={setBirthType}
                    onMotherChange={setSelectedMother}
                    onFatherChange={setSelectedFather}
                    onAdoptiveMotherChange={setSelectedAdoptiveMother}
                    onAdoptiveFatherChange={setSelectedAdoptiveFather}
                    onExternalStudChange={setExternalStud}
                    onExternalMotherInfoChange={setExternalMotherInfo}
                  />
                </TabsContent>

                <TabsContent value="care">
                  <PostCareTab />
                </TabsContent>

                <TabsContent value="puppy">
                  <CardContent className="px-0">
                    {/* 부모견 정보 표시 */}
                    {birthType && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                          출산 정보
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600 dark:text-gray-400">
                              출생 유형:
                            </span>
                            <span className="ml-2 text-gray-800 dark:text-gray-200">
                              {
                                BREEDING_TYPE_OPTIONS.find(
                                  (option) => option.value === birthType
                                )?.label
                              }
                            </span>
                          </div>
                          {selectedMother && (
                            <div>
                              <span className="font-medium text-gray-600 dark:text-gray-400">
                                어미견:
                              </span>
                              <span className="ml-2 text-gray-800 dark:text-gray-200">
                                {getPetNameById(selectedMother)}(
                                {
                                  SAMPLE_PETS.find(
                                    (pet) => pet.id === selectedMother
                                  )?.breed
                                }
                                )
                              </span>
                            </div>
                          )}
                          {selectedFather && (
                            <div>
                              <span className="font-medium text-gray-600 dark:text-gray-400">
                                아비견:
                              </span>
                              <span className="ml-2 text-gray-800 dark:text-gray-200">
                                {getPetNameById(selectedFather)}(
                                {
                                  SAMPLE_PETS.find(
                                    (pet) => pet.id === selectedFather
                                  )?.breed
                                }
                                )
                              </span>
                            </div>
                          )}
                          {externalStud && (
                            <div>
                              <span className="font-medium text-gray-600 dark:text-gray-400">
                                외부 종견:
                              </span>
                              <span className="ml-2 text-gray-800 dark:text-gray-200">
                                {externalStud}
                              </span>
                            </div>
                          )}
                          {externalMotherInfo && (
                            <div>
                              <span className="font-medium text-gray-600 dark:text-gray-400">
                                외부 어미견:
                              </span>
                              <span className="ml-2 text-gray-800 dark:text-gray-200">
                                {externalMotherInfo}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <PuppyManagementForm
                      puppies={puppies}
                      isAdoption={birthType === "adoption"}
                      onAddPuppy={addPuppy}
                      onRemovePuppy={removePuppy}
                      onPuppyChange={handlePuppyChange}
                      onAddGrowthRecord={addGrowthRecord}
                      onRemoveGrowthRecord={removeGrowthRecord}
                      onGrowthRecordChange={handleGrowthRecordChange}
                    />
                  </CardContent>
                </TabsContent>
              </div>

              {/* 하단 버튼 */}
              <div className="p-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800/80 dark:via-gray-700/80 dark:to-gray-800/80 border-t border-gray-200/50 dark:border-gray-600/50">
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={handleBackToList}
                    className="px-8 py-3 bg-white/80 dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300 hover:shadow-md"
                  >
                    취소
                  </Button>
                  <Button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <FileText className="mr-2 h-5 w-5" />
                    저장하기
                  </Button>
                </div>
              </div>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
});
