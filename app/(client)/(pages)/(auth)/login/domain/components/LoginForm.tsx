"use client";

import { useRouter } from "next/navigation";
import { FieldError, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorDefault } from "@bckutils/either/errorCustomEither";
import { LabelSimple } from "@component/label";
import { AuthEntity } from "@security/auth/domain/interfaces/AuthEntity";
import { FetchPOSTTokenBlueW } from "@utils/fetch/fetchBlueWeb";
import ConfigSystemSlice from "@rdtkl/slices/configSystemSlice";
import AuthSlice from "@rdtkl/slices/authSlice";
import { InputSimple } from "@component/input";
import { ErrorField } from "@component/form";
import { SelectReactCustom } from "@component/select/SelectReactCustom";
import { useState } from "react";
import { LoginSchema, LoginType } from "../schema";
import { AuthExerciseEntity } from "../ExercisePublicEntity";

export default function AuthForm({
  exercises,
}: {
  exercises: AuthExerciseEntity[];
}) {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const options = exercises.map((elem) => ({
    value: elem.id,
    label: elem.year.toString(),
  }));

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "admin",
      password: "admin123**",
      exercise: options[0],
    },
  });

  const onSubmit = async () => {
    const data = getValues();
    setLoading(true);

    const responseEither = await new FetchPOSTTokenBlueW({
      url: "/backend/api/security/auth/v1/login",
      body: {
        username: data.username,
        password: data.password,
        exercise: Number(data.exercise.value),
      },
    }).exec();

    if (responseEither.isLeft()) {
      setLoading(false);
      return console.log({
        msg: "LOGINFORM POST ERROR",
        value: (responseEither.getLeft() as ErrorDefault).message,
      });
    }

    const profileResponseEither = await new FetchPOSTTokenBlueW({
      url: "/backend/api/security/auth/v1/profile",
      body: data,
    }).exec();

    if (profileResponseEither.isLeft()) {
      setLoading(false);
      return console.log(
        (profileResponseEither.getLeft() as ErrorDefault).message,
      );
    }
    dispatch(ConfigSystemSlice.actions.updateLoadingSide(true));

    const auth: AuthEntity = profileResponseEither.getRight()
      .data as AuthEntity;

    const menus = auth.menus.map((menu) => ({
      ...menu,
      isSelected: false,
      isColored: false,
    }));

    dispatch(
      AuthSlice.actions.updateAll({
        ...auth,
        menus,
      }),
    );

    replace("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-center text-2xl font-semibold text-red-700`}>
          Iniciar Session
        </h1>
        <div className="w-full">
          <InputSimple
            label="Nombre de usuario"
            register={{ ...register("username") }}
            errors={<ErrorField field={errors.username} />}
          />
          <InputSimple
            label="Contraseña"
            register={{
              ...register("password"),
              type: "password",
            }}
            errors={<ErrorField field={errors.password} />}
          />
          <SelectReactCustom
            label={<LabelSimple name="exercise" label="Ejercicio" />}
            name="exercise"
            control={control}
            options={options}
            errors={<ErrorField field={errors.exercise as FieldError} />}
          />
        </div>
        <button
          className="mb-4 mt-4 w-full rounded-lg bg-stone-300 py-5 font-bold text-black"
          disabled={loading}
        >
          {loading ? "Logeando..." : "Logearse"}
        </button>
      </div>
    </form>
  );
}
