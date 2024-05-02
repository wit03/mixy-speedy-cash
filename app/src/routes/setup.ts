import { jwt } from "@elysiajs/jwt";
import { $Enums } from "@prisma/client";
import { Elysia, t } from "elysia";

export const jwtAccessSetup = new Elysia({
    name: "jwtAccess",
  }).use(
    jwt({
      name: "jwtAccess",
      schema: t.Object({
        customerId: t.String(),
        customerType: t.Enum($Enums.CustomerType),
        email: t.String(),
        firstName: t.String(),
        lastName: t.String(),
        phoneNumber: t.String(),
        address: t.String(),
        dateOfBirth: t.Date(),
        createdAt: t.Date()
      }),
      secret: process.env.JWT_SECRET as string,
      exp: "7d",
    })
);