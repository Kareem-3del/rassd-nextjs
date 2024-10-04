"use client";
import React, { useCallback, useEffect } from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { faker } from "@faker-js/faker";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAddressSearch from "@/hooks/useAddress";
import Saudi from "@/lib/cities-saudi";
import { CircularProgress } from "@/components/ui/progress";
import { City, District, Region } from "@/app/api/address";
import { DepartmentSelector } from "@/components/department-selector";
import { IncpectorSelector } from "@/components/incpector-selector";
import { toast } from "sonner";
import { api } from "@/config/axios.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrevious } from "@dnd-kit/utilities";
const CreateTaskForm = ({
  onSubmit
}: {
  onSubmit: (values: any) => void;
}) => {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = ["بيانات المنشأة", "ادخال بيانات العميل", "انشاء مهمة"];
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    React.useState<District | null>(null);
  const [selectedRegion, setSelectedRegion] = React.useState<Region | null>(
    null
  );
  const {
    data: { cities, districts },
    loading,
    error,
  } = useAddressSearch(
    searchTerm,
    selectedRegion?.region_id,
    selectedCity?.city_id
  );
  const [stepOne, setStepOne] = React.useState({
    name: "",
    region: "",
    city: "",
    district: "",
    address: "",
  });
  const [stepTwo, setStepTwo] = React.useState({
    clientName: "",
    clientPhone: "",
    clientNationalId: "",
    clientEmail: "",
    clientAddress: ""
  });

  const [stepThree, setStepThree] = React.useState<{
    inspectorId: number | null;
    departmentId: number | null;
  }>({
    inspectorId: null,
    departmentId: null,
  });

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      return handleStepOne();
    }
    if (activeStep === 1) {
      return handleStepTwo();
    }
    if (activeStep === 2) {
      return handleStepThree();
    }
    onSubmit({
      ...stepOne,
      ...stepTwo,
      ...stepThree
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  async function handleSubmit() {

  }

  function handleStepOne() {
    if (!stepOne.name) {
      toast.error("يجب إدخال اسم المنشأة");
      return;
    }
    if (!stepOne.region) {
      toast.error("يجب اختيار المنطقة");
      return;
    }
    if (!stepOne.city) {
      toast.error("يجب اختيار المدينة");
      return;
    }
    if (!stepOne.district) {
      toast.error("يجب اختيار الحي");
      return;
    }
    if (!stepOne.address) {
      toast.error("يجب إدخال العنوان");
      return;
    }
    setActiveStep(1);
  }

  async function handleStepTwo() {
    if (!stepTwo.clientName) {
      toast.error("يجب إدخال اسم العميل");
      return;
    }
    if (!stepTwo.clientPhone) {
      toast.error("يجب إدخال رقم الهاتف العميل");
      return;
    }
    if (!stepTwo.clientNationalId) {
      toast.error("يجب إدخال رقم الهوية العميل");
      return;
    }
    if (!stepTwo.clientEmail) {
      toast.error("يجب إدخال البريد الإلكتروني العميل");
      return;
    }
    if (!stepTwo.clientAddress) {
      toast.error("يجب إدخال العنوان العميل");
      return;
    }

    setActiveStep(2);
  }

  function handleStepThree() {
    if (!stepThree.inspectorId) {
      toast.error("يجب اختيار مفتش");
      return;
    }
    if (!stepThree.departmentId) {
      toast.error("يجب اختيار قسم");
      return;
    }
    console.log("hey there");
    setActiveStep(3);
  }

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedCity(
        cities.find((city) => city.city_id === selectedDistrict.city_id) || null
      );
      setSelectedRegion(
        Saudi.RegionsSaudi.find(
          (region) => region.region_id === selectedDistrict.region_id
        ) || null
      );
    }
  }, [selectedDistrict, selectedCity, selectedRegion]);

  return (
    <div className="mt-4 max-w-3xl container">
      <Stepper
        current={activeStep}
        direction={isTablet ? "vertical" : "horizontal"}
      >
        {steps.map((label, index) => {
          const stepProps: any = {};
          const labelProps: any = {};
          if (isStepOptional(index)) {
            labelProps.optional = <StepLabel>Optional</StepLabel>;
          }
          return (
            <Step key={faker.string.uuid()} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <div className="mt-12 mb-2 font-semibold text-center flex justify-center items-center flex-col ">
            <h1 className="text-2xl text-success mb-2">جاري إنشاء المهمة </h1>
            <p>الرجاء الانتظار حتى يتم إنشاء المهمة</p>
            <CircularProgress
              value={10}
              color="primary"
              className="mt-8"
              loading
              size="xs"
              showValue={true}
            />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form>
            <div className="grid grid-cols-12 gap-4">
              {activeStep === 0 && (
                <>
                  <div className="col-span-12 mb-4 mt-6">
                    <h4 className="text-sm font-medium text-default-600">
                      ادخل بيانات المنشأة
                    </h4>
                  </div>
                  <div className="col-span-12 gap-4">
                    <Input
                      type="text"
                      placeholder="الاسم"
                      value={stepOne.name}
                      onChange={(e) =>
                        setStepOne({ ...stepOne, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-12 grid lg:grid-cols-2 gap-4">
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      placeholder={"اختار المنطقة"}
                      onChange={(value: any) => {
                        setStepOne({ ...stepOne, region: value.value });
                        setSelectedRegion(
                          Saudi.RegionsSaudi.find(
                            (region) => region.region_id === value.value
                          ) || null
                        );
                        setSelectedCity(null);
                        setSelectedDistrict(null);
                      }}
                      value={
                        selectedRegion
                          ? {
                              value: selectedRegion.name_ar,
                              label: selectedRegion.name_ar,
                            }
                          : null
                      }
                      isLoading={loading}
                      options={Saudi.RegionsSaudi.map((region) => ({
                        value: region.region_id,
                        label: region.name_ar,
                      }))}
                    />
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      value={
                        selectedCity
                          ? {
                              value: selectedCity.city_id,
                              label: selectedCity.name_ar,
                            }
                          : null
                      }
                      placeholder={"اختار المدينة"}
                      isLoading={loading}
                      onChange={(value: any) => {
                        setStepOne({ ...stepOne, city: value.value });
                        setSelectedCity(
                          cities.find((city) => city.city_id === value.value) ||
                            null
                        );
                        setSelectedDistrict(null);
                      }}
                      onInputChange={(value) => setSearchTerm(value)}
                      options={cities
                        .filter((city) => {
                          if (selectedRegion) {
                            return city.region_id === selectedRegion.region_id;
                          }
                          return true;
                        })
                        .map((region) => ({
                          value: region.city_id,
                          label: region.name_ar,
                        }))}
                    />
                  </div>
                  <div className="col-span-12 grid grid-cols-2 gap-4">
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      value={
                        selectedDistrict
                          ? {
                              value: selectedDistrict.district_id,
                              label: selectedDistrict.name_ar,
                            }
                          : null
                      }
                      placeholder={"اختار الحي"}
                      isLoading={loading}
                      onChange={(value: any) => {
                        setStepOne({ ...stepOne, district: value.value });
                        setSelectedDistrict(
                          districts.find(
                            (district) => district.district_id === value.value
                          ) || null
                        );
                      }}
                      onInputChange={(value) => setSearchTerm(value)}
                      options={districts
                        .filter((city) => {
                          if (selectedCity) {
                            return city.city_id === selectedCity.city_id;
                          } else if (selectedRegion) {
                            return city.region_id === selectedRegion.region_id;
                          }
                          return true;
                        })
                        .map((region) => ({
                          value: region.district_id,
                          label: region.name_ar,
                        }))}
                    />
                  </div>
                  <div className="col-span-12">
                    <Textarea
                      placeholder="العنوان"
                      value={stepOne.address}
                      onChange={(e) => {
                        setStepOne({ ...stepOne, address: e.target.value });
                      }}
                    />
                  </div>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <div className="col-span-12 mt-6 mb-4">
                    <h4 className="text-sm font-medium text-default-600">
                      ادخل بيانات العميل
                    </h4>
                    <p className="text-xs text-default-600 mt-1">
                      إملأ الحقول بالبيانات الصحيحة
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <Input
                      placeholder="إدخل اسم صاحب المنشاءة"
                      value={stepTwo.clientName}
                      onChange={(e) => {
                        setStepTwo({ ...stepTwo, clientName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <Input
                      placeholder="رقم الهاتف"
                      value={stepTwo.clientPhone}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        setStepTwo({
                          ...stepTwo,
                          clientPhone: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <Input
                      placeholder="رقم الهوية"
                      value={stepTwo.clientNationalId}
                      onChange={(e) => {
                        if (e.target.value.length > 7) {
                          return;
                        }
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        setStepTwo({
                          ...stepTwo,
                          clientNationalId: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col-span-12 lg:col-span-6 gap-2 flex flex-col">
                    <Input
                      placeholder="العنوان"
                      value={stepTwo.clientAddress}
                      onChange={(e) => {
                        setStepTwo({
                          ...stepTwo,
                          clientAddress: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col-span-12 lg:col-span-6">
                    <Input
                      type="email"
                      placeholder="البريد الالكتروني"
                      value={stepTwo.clientEmail}
                      onChange={(e) => {
                        setStepTwo({ ...stepTwo, clientEmail: e.target.value });
                      }}
                    />
                  </div>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <div className="col-span-12 mt-6 mb-4">
                    <h4 className="text-sm font-medium text-default-600">
                      انشاء مهمة
                    </h4>
                    <p className="text-xs text-default-600 mt-1">
                      إملأ الحقول بالبيانات الصحيحة
                    </p>
                  </div>
                  <div className="col-span-12">
                    <IncpectorSelector
                      // value={String(stepThree.inspectorId)}
                      onChange={(value: any) => {
                        console.log(value);
                        setStepThree({ ...stepThree, inspectorId: parseInt(value) });
                      }}
                    />
                  </div>
                  <div className="col-span-12">
                    <DepartmentSelector
                      // value={String(stepThree.departmentId)}
                      onChange={(value: any) => {
                        console.log(value);
                        setStepThree({ ...stepThree, departmentId: parseInt(value) });
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </form>

          <div className="flex pt-2 ">
            <Button
              size="xs"
              variant="outline"
              color="secondary"
              className={cn("cursor-pointer", {
                hidden: activeStep === 0,
              })}
              onClick={handleBack}
            >
              رجوع
            </Button>
            <div className="flex-1	gap-4 " />
            <div className="flex	gap-2 ">
              {activeStep === steps.length - 1 ? (
                <Button
                  size="xs"
                  variant="outline"
                  color="success"
                  className="cursor-pointer"
                  onClick={() => {
                    handleNext();
                  }}
                >
                  تاكيد
                </Button>
              ) : (
                <Button
                  size="xs"
                  variant="outline"
                  color="secondary"
                  className="cursor-pointer"
                  onClick={handleNext}
                >
                  التالي
                </Button>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const CreateTaskDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (values: any) => {
    try {
      await api.post("/tasks", {
        title: values.name,
        client: {
          name: values.clientName,
          phone_number: values.clientPhone,
          email: values.clientEmail,
          national_id: values.clientNationalId,
        },
        establishmentDetail: {
          region: values.region,
          city: values.city,
          district: values.district,
          address: values.address,
        },
        inspectorId: values.inspectorId,
        departmentId: values.departmentId,
      });
      setOpen(false);
      toast.success("تم إنشاء مهمة بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء مهمة");
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>إنشاء مهمة</Button>
        </DialogTrigger>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-medium ">
              إنشاء مهمة جديدة
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500  space-y-4">
            <ScrollArea className="h-96 p-2">
              <CreateTaskForm onSubmit={handleSubmit} />
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
