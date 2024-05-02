import { jwt } from "@elysiajs/jwt";
import { $Enums } from "@prisma/client";
import { Elysia, t } from "elysia";

export const jwtAccessSetup = new Elysia({
    name: "jwtAccess",
  }).use(
    jwt({
      name: "jwtAccess",
      schema: t.Object({
        CustomerId: t.String(),
        CustomerType: t.Enum($Enums.CustomerType),
        Email: t.String(),
        FirstName: t.String(),
        LastName: t.String(),
        PhoneNumber: t.String(),
        Address: t.String(),
        DateOfBirth: t.Date(),
        CreatedAt: t.Date()
      }),
      secret: process.env.JWT_SECRET as string,
      exp: "7d",
    })
);