-- CreateTable
CREATE TABLE "Friends" (
    "frienderId" INTEGER NOT NULL,
    "friendedId" INTEGER NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("frienderId","friendedId")
);

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_frienderId_fkey" FOREIGN KEY ("frienderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friendedId_fkey" FOREIGN KEY ("friendedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
