"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { getCookie } from '@/utils/cookie';
import { stepProgressMap } from '@/utils/profile';
import React, { useEffect, useState } from 'react';

const ProfileProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const stepCompleted = getCookie("step_completed") || 0;
    setProgress(stepProgressMap[stepCompleted] || 0);
  };

  useEffect(() => {
    // Update the progress when the component mounts
    updateProgress();

    // Set an interval to check for cookie changes periodically
    const interval = setInterval(() => {
      updateProgress();
    }, 1000); // Check every 1 second 

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex flex-col items-end gap-1">
          <Label className="text-sm font-medium text-default-700">{progress}% Complete</Label>
          <Progress value={progress} color="primary" isStripe className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgress;
