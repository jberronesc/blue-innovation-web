"use client";

import { useSelector } from "react-redux";
import { AppStore } from "@rdtkl/store";
import { Chip } from "@nextui-org/react";

const HeaderExerciseLabel = () => {
  const { exercise } = useSelector((store: AppStore) => store.auth);

  return (
    <Chip color="warning" size="md">
      Ejercicio - <span className="font-extrabold"> {exercise.year}</span>
    </Chip>
  );
};

export default HeaderExerciseLabel;
