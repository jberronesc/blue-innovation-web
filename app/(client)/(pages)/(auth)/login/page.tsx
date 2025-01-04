import { FetchBackGETWithoutTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { AuthExerciseEntity } from "./domain/ExercisePublicEntity";
import LoginForm from "./domain/components/LoginForm";

export default async function LoginPage() {
  const [exercisesResponse] = await Promise.all([
    await new FetchBackGETWithoutTokenBlueI({
      url: "/security/v1/auth/exercises",
    }).exec(),
  ]);

  const exercises = exercisesResponse.isRight()
    ? (exercisesResponse.getRight().data as AuthExerciseEntity[])
    : [];

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36"></div>
        </div>
        <LoginForm exercises={exercises} />
      </div>
    </main>
  );
}
