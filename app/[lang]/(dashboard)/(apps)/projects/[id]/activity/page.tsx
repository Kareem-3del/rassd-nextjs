"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Timeline,
    TimelineItem,
    TimelineContent,
    TimelineDot,
    TimelineConnector,
    TimelineSeparator,
} from "@/components/ui/timeline";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarGroup,
} from "@/components/ui/avatar";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";

// images
import img1 from "@/public/images/all-img/banana.jpg";
import img2 from "@/public/images/all-img/headphone.png";
import img3 from "@/public/images/all-img/baby.jpg";
import img4 from "@/public/images/all-img/busket.jpg";
import img5 from "@/public/images/all-img/mic.jpg";
import img6 from "@/public/images/all-img/orange.jpg";
import img7 from "@/public/images/all-img/orange-2.jpg";

import avatar7 from "@/public/images/avatar/avatar-7.jpg";
import avatar9 from "@/public/images/avatar/avatar-9.jpg";
import avatar8 from "@/public/images/avatar/avatar-8.jpg";
import avatar6 from "@/public/images/avatar/avatar-6.jpg";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";
import avatar2 from "@/public/images/avatar/avatar-2.jpg";
import Image from "next/image";

const Activities = () => {
    return (
        <Card>
            <CardHeader className="border-none px-10 pt-10 mb-0">
                <CardTitle>
                    الاحداث
                </CardTitle>
            </CardHeader>
            <CardContent className="px-10">
                <div className="container">
                    <Timeline>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div className="md:flex gap-4">
                                    <div className="grow">
                                        <h5 className="font-medium text-sm text-default-600 ">
                                            بداء التفتيش - زيارة ميدانية
                                        </h5>
                                    </div>
                                    <div
                                        className="text-default-400 text-xs md:min-w-[90px] md:max-w-[120px] md:text-right">
                                        12 minutes ago
                                    </div>
                                </div>
                                <p className="text-sm text-default-500  mt-1">
                                    قام
                                    &nbsp;
                                    <span className="text-default-600 font-medium underline"> محمد احمد</span>
                                    &nbsp;
                                    بزيارة ميدانية للموقع
                                </p>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div className="tm-content">
                                    <div className="md:flex gap-4">
                                        <div className="grow">
                                            <h5 className="font-medium text-sm text-default-600 ">
                                              تم تحديث البنود
                                            </h5>
                                        </div>
                                        <div
                                            className="text-default-400 text-xs md:min-w-[90px] md:max-w-[120px] md:text-right">
                                            1 hour ago
                                        </div>
                                    </div>
                                    <p className="text-sm text-default-500  mt-1 mb-4">
                                        تم تحديث البنود الخاصة بالعينة بواسطة
                                        &nbsp;
                                        <span className="text-default-600 font-medium underline"> محمد احمد</span>
                                    </p>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="success"/>
                          <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent>
                          <div className="md:flex gap-4">
                            <div className="grow">
                              <h5 className="font-medium text-sm text-default-600 ">
                                انتهاء التفتيش - زيارة ميدانية
                              </h5>
                            </div>
                            <div
                                className="text-default-400 text-xs md:min-w-[90px] md:max-w-[120px] md:text-right">
                              12 minutes ago
                            </div>
                          </div>
                          <p className="text-sm text-default-500  mt-1">
                            قام
                            &nbsp;
                            <span className="text-default-600 font-medium underline"> محمد احمد</span>
                            &nbsp;
                            بانهاء زيارة الميدانية
                          </p>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="default" />
                          <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent>
                          <div className="md:flex gap-4">
                            <div className="grow">
                              <h5 className="font-medium text-sm text-default-600 ">
                                بداء المراجعة - زيارة ميدانية
                              </h5>
                            </div>
                            <div
                                className="text-default-400 text-xs md:min-w-[90px] md:max-w-[120px] md:text-right">
                              12 minutes ago
                            </div>
                          </div>
                          <p className="text-sm text-default-500  mt-1">
                            بداء
                            &nbsp;
                            <span className="text-default-600 font-medium underline"> محمد احمد</span>
                            &nbsp;
                            بمراجعة الاستمارة
                          </p>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="destructive"/>
                          <TimelineConnector/>
                        </TimelineSeparator>
                          <TimelineContent>
                              <div className="md:flex gap-4">
                                  <div className="grow">
                                      <h5 className="font-medium text-sm text-default-600 ">
                                          رفض الاستمارة
                                      </h5>
                                  </div>
                                  <div
                                      className="text-default-400 text-xs md:min-w-[90px] md:max-w-[120px] md:text-right">
                                      9th October
                                  </div>
                              </div>
                              <p className="text-sm text-default-500  mt-1">
                                  سبب رفض الاستمارة :
                                  &nbsp;
                                  لم يتم توضيح البنود بشكل كافي وواضح للمراجع والمفتش الميداني

                              </p>
                              <hr className="my-3"/>
                              <p className="text-sm text-default-500  mt-1">
                                  انتهاء الاجراءات بواسطة
                                  &nbsp;
                                  <span className="text-default-600 font-medium underline"> محمد احمد</span>
                                  &nbsp;
                                  و تم ارسال الاستمارة للمفتش
                              </p>
                          </TimelineContent>
                      </TimelineItem>


                        {/*
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="info"/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div className="tm-content">
                                    <div className="md:flex gap-4">
                                        <div className="grow">
                                            <h5 className="font-medium text-sm text-default-600 ">
                                                Image Added
                                            </h5>
                                        </div>
                                        <div
                                            className="text-default-400 text-xs md:min-w-[90px] md:max-w-[120px] md:text-right">
                                            9 hours ago
                                        </div>
                                    </div>
                                    <p className="text-sm text-default-500  mt-1 mb-4">
                                        Mores Clarke added new video
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <Image
                                            src={img1}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <Image
                                            src={img2}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <Image
                                            src={img3}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <Image
                                            src={img4}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <Image
                                            src={img5}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <Image
                                            src={img6}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                      <Image
                                          src={img6}
                                          className="w-full h-full object-cover"
                                          alt=""
                                      />
                                      <Image
                                          src={img6}
                                          className="w-full h-full object-cover"
                                          alt=""
                                      />
                                    </div>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
*/}
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                            </TimelineSeparator>
                            <TimelineContent>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            </CardContent>
        </Card>
    );
};

export default Activities;
