import AuctionRoom from "./AuctionRoom";

export default function AuctionPage({ params }: { params: { id: string } }) {
  return <AuctionRoom id={params.id} />;
}
