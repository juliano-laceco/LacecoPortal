import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function test(){
    const countUsers = await prisma.employee.count({})
    return countUsers
}
