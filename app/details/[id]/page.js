import EventDetails from '@/components/details/Event/EventDetails'
import EventVenue from '@/components/details/Event/EventVenue'
import HeroSection from '@/components/details/HeroSection'
import { getEventById } from '@/db/queries'

export async function generateMetadata({params: {id}}) {
    const eventInfo = await getEventById(id)

    return {
        title: `Eventry - ${eventInfo?.name}`,
        description: eventInfo?.details,
        openGraph: {
            images: [eventInfo?.imageURL]
        }
    }
}

export default async function DetailsPage({params: {id}}) {
    const eventInfo = await getEventById(id)

    console.log(eventInfo);
    return (
        <>
            <HeroSection eventInfo={eventInfo}/>
            <section class="container">
                <div class="grid grid-cols-5 gap-12 my-12">
                    <EventDetails details={eventInfo?.details} swags={eventInfo?.swags}/>
                    <EventVenue location={eventInfo?.location}/>
                </div>
            </section>
        </>
    )
}
