"use client";
import React, {useCallback, useEffect} from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { faker } from "@faker-js/faker";
import {Textarea} from "@/components/ui/textarea";
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
import {City, District, Region} from "@/app/api/address";
import useAddressSearch from "@/hooks/useAddress";
import Saudi from "@/lib/cities-saudi";
import {CircularProgress} from "@/components/ui/progress";
const CreateTaskForm = () => {
    const [activeStep, setActiveStep] = React.useState<number>(0);

    const visitTypes = [
        // سرية - ميدنية
        { value: "secret", label: "سرية" },
        { value: "civil", label: "مدنية" },
    ];

    const groups = [
        { value: "group1", label: "مجموعة 1" },
        { value: "group2", label: "مجموعة 2" },
        { value: "group3", label: "مجموعة 3" },
    ];

    const department = [
        { value: "department1", label: "قسم 1" },
        { value: "department2", label: "قسم 2" },
        { value: "department3", label: "قسم 3" },
    ];
    // المناطق في السعودية
    // المنطقة الشمالة - المنطقة الوسطى - المنطقة الجنوبية




    const steps = ["بيانات المنشأة", "ادخال بيانات العميل", "انشاء مهمة"];

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [searchTerm, setSearchTerm] = React.useState("");
    const furits: { value: string, label: string }[] = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    // المفتشين
    const inspectors = [
        { value: "inspector1", label: "مفتش 1" },
        { value: "inspector2", label: "مفتش 2" },
        { value: "inspector3", label: "مفتش 3" },
    ];
    const onSubmit = () => {
        toast({
            title: "You submitted the following values:",
            description: (
                <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 top-0 right-0">
                    <p className="text-primary-foreground">
                        تم إنشاء مهمة بنجاح
                    </p>
                </div>
            ),
        });
    };
    const isTablet = useMediaQuery("(max-width: 1024px)");

    const [selectedCity, setSelectedCity] = React.useState<City | null>(null);
    const [selectedDistrict, setSelectedDistrict] = React.useState<District | null>(null);
    const [selectedRegion, setSelectedRegion] = React.useState<Region | null>(null);
    const {data : {cities , districts} , loading , error} = useAddressSearch(searchTerm , selectedRegion?.region_id , selectedCity?.city_id);

    useEffect(() => {
        if(selectedDistrict){
            setSelectedCity(
                cities.find(city => city.city_id === selectedDistrict.city_id) || null
            )
            setSelectedRegion(
                Saudi.RegionsSaudi.find(region => region.region_id === selectedDistrict.region_id) || null
            )
        }
    }, [selectedDistrict, selectedCity, selectedRegion]);
    return (
        <div className="mt-4 max-w-3xl container">
            <Stepper current={activeStep} direction={isTablet ? "vertical" : "horizontal"}>
                {steps.map((label, index) => {
                    const stepProps: any = {};
                    const labelProps: any = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <StepLabel>Optional</StepLabel>
                        );
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
                        <p>
                            الرجاء الانتظار حتى يتم إنشاء المهمة
                        </p>
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

                                        <Input type="text" placeholder="الاسم"/>
                                    </div>

                                    <div className="col-span-12 grid lg:grid-cols-2 gap-4">

                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            placeholder={"اختار المنطقة"}
                                            onChange={(value : any) => {
                                                setSelectedRegion(
                                                    Saudi.RegionsSaudi.find(region => region.region_id === value.value) || null
                                                )
                                                setSelectedCity(null)
                                                setSelectedDistrict(null)
                                            }}
                                            value={selectedRegion ? { value: selectedRegion.name_ar, label: selectedRegion.name_ar } : null}
                                            isLoading={loading}
                                            options={Saudi.RegionsSaudi.map(
                                                (region) => ({
                                                    value: region.region_id,
                                                    label: region.name_ar,
                                                })
                                            )}
                                        />
                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            value={selectedCity ? { value: selectedCity.city_id, label: selectedCity.name_ar } : null}
                                            placeholder={"اختار المدينة"}
                                            isLoading={loading}
                                            onChange={
                                                (value : any) => {
                                                    setSelectedCity(
                                                        cities.find(city => city.city_id === value.value) || null
                                                    )
                                                    setSelectedDistrict(null)
                                                }
                                            }
                                            onInputChange={(value) => setSearchTerm(value)}
                                            options={cities.filter(
                                                (city) => {
                                                    if (selectedRegion) {
                                                        return city.region_id === selectedRegion.region_id
                                                    }
                                                    return true
                                                }
                                            ).map(
                                                (region) => ({
                                                    value: region.city_id,
                                                    label: region.name_ar,
                                                })
                                            )}
                                        />


                                    </div>
                                    <div className="col-span-12 grid grid-cols-2 gap-4">
                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            value={selectedDistrict ? { value: selectedDistrict.district_id, label: selectedDistrict.name_ar } : null}
                                            placeholder={"اختار الحي"}
                                            isLoading={loading}
                                            onChange={
                                                (value : any) => {
                                                    setSelectedDistrict(
                                                        districts.find(district => district.district_id === value.value) || null
                                                    )
                                                }
                                            }
                                            onInputChange={(value) => setSearchTerm(value)}
                                            options={districts.filter(
                                                (city) => {
                                                    if (selectedCity) {
                                                        return city.city_id === selectedCity.city_id
                                                    } else if (selectedRegion) {
                                                        return city.region_id === selectedRegion.region_id
                                                    }
                                                    return true
                                                }
                                            ).map(
                                                (region) => ({
                                                    value: region.district_id,
                                                    label: region.name_ar,
                                                })
                                            )}
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <Textarea placeholder="العنوان"/>

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
                                        <Input type="text" placeholder="إدخل اسم صاحب المنشاءة"/>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="number" placeholder="رقم الهاتف" />
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="number" placeholder="رقم الهوية ( إختياري )" />
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="email" placeholder="البريد الالكتروني (إختياري)" />
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
                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            options={inspectors}
                                            placeholder={"اختار المفتش"}
                                        /></div>
                                    <div className="col-span-12 grid grid-cols-2 gap-4">

                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            options={visitTypes}
                                            placeholder={"اختار نوع الزيارة"}
                                        />
                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            placeholder={"اختر المجموعة"}
                                            options={groups}
                                        />
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 gap-2 flex flex-col">


                                    </div>
                                    <div className="col-span-12">
                                        <Select
                                            className="react-select"
                                            placeholder="اختر القسم"
                                            classNamePrefix="select"
                                            options={department}
                                        />
                                    </div>
                                </>
                            )}
                            {activeStep === 3 && (
                                <>
                                    <div className="col-span-12 mt-6 mb-4">
                                        <h4 className="text-sm font-medium text-default-600">
                                            Enter Your Social Links
                                        </h4>
                                        <p className="text-xs text-default-600 mt-1">
                                            Fill in the box with correct data
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="text" placeholder="http://facebook.com/abc"/>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="text" placeholder="http://twitter.com/abc"/>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="text" placeholder="http://linkedin.com/abc"/>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="text" placeholder="http://youtube.com/abc" />
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <Input type="text" placeholder="http://instagram.com/abc" />
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
                                        if (onSubmit) onSubmit();
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
    return (
        <div>
            <Dialog>
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
                        <CreateTaskForm/>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTaskDialog;



