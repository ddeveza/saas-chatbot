"use server";

import { client } from "@/lib/prisma";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string,
) => {
  try {
    const registered = await client.user.create({
      select: {
        id: true,
        type: true,
        fullname: true,
      },
      data: {
        type,
        clerkId,
        fullname,
        subscription: {
          create: {},
        },
      },
    });
    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error: any) {
    return { status: 400 };
  }
};
