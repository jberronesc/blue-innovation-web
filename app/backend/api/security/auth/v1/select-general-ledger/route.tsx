import { responseBad, responseOk } from "@/app/backend/shared/utils/responses";
import { auth, unstable_update } from "@/auth";
import { FetchBackPOSTTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";

export async function POST(request: Request) {
  const data = await request.json();

  console.log({
    msg: "ROUTE SELECT GENERAL LEDGER.",
    data,
  });

  try {
    const response = await new FetchBackPOSTTokenBlueI({
      url: `/security/v1/auth/token/refresh/general-ledger`,
      body: {
        generalLedger: data.generalLedger,
      },
    }).exec();

    if (response.isLeft()) return responseBad({});

    const session = await auth();
    const user = session!.user;

    await unstable_update({
      user: { ...user, token: response.getRight().data.accessToken },
    });

    return responseOk({
      data: response.getRight().data,
    });
  } catch {
    return responseBad({});
  }
}
