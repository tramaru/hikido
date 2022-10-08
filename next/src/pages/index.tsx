import EventList from 'components/EventList';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from "next";
import type { Event } from 'types/Event';
import type { NextPage } from 'next'

type Props = { events: Event[] }

const Home: NextPage<Props> = (props: Props) => {
  return (
    <EventList events={ props.events } />
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const selectedEvents = await prisma.event.findMany();
  await prisma.$disconnect();
  const events = JSON.parse(JSON.stringify(selectedEvents));
  return {
    props: {
      events,
    }
  }
}

export default Home
