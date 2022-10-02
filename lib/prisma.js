// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// export default prisma;

// ! BUG FIX - this supposedly deals with the problem in using both prisma and nextjs
// ! look at the details here: https://github.com/prisma/prisma/issues/5007
// ! some information here as well https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
