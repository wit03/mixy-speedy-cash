import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    await prisma.employee.create({
        data:{
            address: "admin address",
            dateOfBirth: new Date().toISOString(),
            email: "admin@gmail.com",
            firstName: "admin",
            lastName: "last name",
            password:  await Bun.password.hash("123", {
              algorithm:"bcrypt",
              cost: 4
            }),
            phoneNumber:"0948652696",
            position:"owner",
            salary: 10000,
        }
    })


    // const customer = await prisma.customer.create({
    //   data:{
    //     customerType: "Company",
    //     email: "admin@gmail.com",
    //     firstName: "mix",
    //     lastName: "jateassavapirom",
    //     dateOfBirth: "2024-04-29T18:49:21.000Z",
    //     phoneNumber: "0948652696",
    //     address: "99/73 sirithorn",
    //     career: "admin",
    //     citizenId: "1234567898",
    //     password:  await Bun.password.hash("123", {
    //       algorithm:"bcrypt",
    //       cost: 4
    //     }),
    //     salary: 100000
    //   }
    // })

    // await prisma.account.create({
    //   data:{
    //     customerId: customer.customerId,
    //     accountId: new Date().valueOf().toString(),
    //     accountStatus:"InUse",
    //     accountType:"Saving",
    //     balance: 100000000000000,
    //     pin:await Bun.password.hash("123456", {
    //       algorithm:"bcrypt",
    //       cost: 4
    //     }),

    //   }
    // })



}
await main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })