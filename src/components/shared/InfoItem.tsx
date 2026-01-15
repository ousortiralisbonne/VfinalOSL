import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InfoItemProps {
  icon: LucideIcon;
  text: string;
}

const InfoItem = ({ icon: Icon, text }: InfoItemProps) => {
  return (
    <div className="flex items-center text-gray-600">
      <Icon className="h-4 w-4 mr-2" />
      <span>{text}</span>
    </div>
  );
};

export default InfoItem;