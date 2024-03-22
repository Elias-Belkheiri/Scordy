import {Prisma, PrismaClient} from '@prisma/client'
import {Message} from '../dtos'
import {BadRequest} from '../customExceptions'

const prisma = new PrismaClient();

