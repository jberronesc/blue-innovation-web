"use client";

import { useSelector } from "react-redux";
import { AppStore } from "@rdtkl/store";
import { Badge } from "@/app/(client)/shared/ui/shadcn/ui/badge";

const HeaderExerciseLabel = () => {
  const { exercise } = useSelector((store: AppStore) => store.auth);

  return (
    <Badge className="bg-yellow-500 text-sm text-black">
      Ejercicio - <span className="font-extrabold"> {exercise.year}</span>
    </Badge>
  );
};

export default HeaderExerciseLabel;
