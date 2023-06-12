import prisma from '@/app/libs/prismadb';

interface IPramas {
    listingId?: string;
    userId ?:string;
    authorId ?:string;
}


export default async function getReservation(
    params: IPramas
){
    try{
        const {listingId,userId,authorId} = params

        const query: any = {};

        if(listingId){
            query.listingId = listingId
        }

        if(userId){
            query.userId = userId
        }
        if(authorId){
            query.userId = authorId
        }


        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt:'desc',
            }
        });

        const SafeReservation =  reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing:{
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),

                }
            })
        );

        return SafeReservation
    }catch(error: any){
        throw new Error(error)
    }
}