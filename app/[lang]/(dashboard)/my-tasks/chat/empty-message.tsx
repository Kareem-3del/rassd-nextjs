"use client"
import { Icon } from '@iconify/react';
const EmptyMessage = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="h-full flex justify-center items-center">
        <div className="text-center flex flex-col items-center">
          <Icon icon="typcn:messages" className="text-7xl text-default-300" />
          <div className="mt-4 text-lg font-medium text-default-500">لا توجد رسائل</div>
          <div className="mt-1 text-sm font-medium text-default-400">لا تقلق، فقط خذ نفسًا عميقًا وقل "مرحبًا"</div>
        </div>
      </div>
    </div>
  )
};

export default EmptyMessage;
